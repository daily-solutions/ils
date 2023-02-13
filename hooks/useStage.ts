import { DailyEventObjectAppMessage } from '@daily-co/daily-js';
import {
	useAppMessage,
	useDaily,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

import { useToasts } from '../contexts/ToastProvider';

interface BringToStageAppMessage {
	event: 'bring-to-stage';
	sessionId: string;
}

interface RemoveFromStageAppMessage {
	event: 'remove-from-stage';
	sessionId: string;
}

interface LeaveStageAppMessage {
	event: 'leave-stage';
}

interface RequestStageAppMessage {
	event: 'request-stage';
	userName: string;
}

interface CancelRequestStageAppMessage {
	event: 'cancel-request-stage';
}

export type StageAppMessage =
	| RequestStageAppMessage
	| BringToStageAppMessage
	| RemoveFromStageAppMessage
	| CancelRequestStageAppMessage
	| LeaveStageAppMessage;

const isRequestingState = atom<boolean>({
	key: 'is-requesting-to-join-stage',
	default: false,
});

interface RequestedParticipant {
	id: string;
	userName: string;
}

const requestedParticipantsState = atom<Record<string, RequestedParticipant>>({
	key: 'requested-participants',
	default: {},
});

export const useStage = () => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const [isOwner, userName] = useParticipantProperty(localSessionId as string, [
		'owner',
		'user_name',
	]);
	const [isRequesting, setIsRequesting] = useRecoilState(isRequestingState);
	const [requestedParticipants, setRequestedParticipants] = useRecoilState(
		requestedParticipantsState
	);
	const { toaster } = useToasts();

	const sendAppMessage = useAppMessage();

	const onAppMessage = useCallback(
		(ev: DailyEventObjectAppMessage<StageAppMessage>) => {
			switch (ev?.data?.event) {
				case 'bring-to-stage':
					const sessionId = ev.data?.sessionId;
					if (isOwner) {
						setRequestedParticipants((prev) => {
							const prevP = { ...prev };
							delete prevP[sessionId];
							return prevP;
						});
					} else if (localSessionId === sessionId) {
						toaster.notify('light', {
							title: 'You are on stage',
							description: 'You can unmute your mic to talk',
						});
						setIsRequesting(false);
					}
					break;
				case 'remove-from-stage':
					if (localSessionId === ev.data?.sessionId) {
						const participant = daily?.participants()?.[ev.fromId];
						toaster.notify('light', {
							title: 'You were removed from the stage',
							description: `${
								participant?.user_name ?? 'Guest'
							} removed you from the stage`,
						});
					}
					break;
				case 'leave-stage':
					if (isOwner) {
						const participant = daily?.participants()?.[ev.fromId];
						toaster.notify('light', {
							title: 'Participant left',
							description: `${
								participant?.user_name ?? 'Guest'
							} left the stage`,
						});
					}
					break;
				case 'request-stage':
					if (isOwner) {
						const userName = ev.data?.userName;
						setRequestedParticipants((prev) => ({
							...prev,
							[ev.fromId]: { id: ev.fromId, userName },
						}));
						toaster.notify('light', {
							title: `${userName ?? 'Guest'} requested to join the stage`,
							actions: {
								type: 'bringToStage',
								sessionId: ev.fromId,
							},
						});
					}
					break;
				case 'cancel-request-stage':
					if (isOwner) {
						setRequestedParticipants((prev) => {
							const prevP = { ...prev };
							delete prevP[ev.fromId];
							return prevP;
						});
					}
					break;
				default:
					break;
			}
		},
		[
			daily,
			isOwner,
			localSessionId,
			setIsRequesting,
			setRequestedParticipants,
			toaster,
		]
	);

	const requestToJoinStage = useCallback(() => {
		if (isOwner) return;

		setIsRequesting(true);
		sendAppMessage({ event: 'request-stage', userName });
		toaster.notify('light', {
			title: 'Requested to join the stage',
			description: 'Please wait till the host accepts the request',
		});
	}, [isOwner, sendAppMessage, setIsRequesting, toaster, userName]);

	const cancelRequestToJoinStage = useCallback(() => {
		if (isOwner) return;

		setIsRequesting(false);
		sendAppMessage({ event: 'cancel-request-stage' });
		toaster.notify('light', {
			title: 'Cancelled your request to join the stage',
			description: 'You can always request to join the stage',
		});
	}, [isOwner, sendAppMessage, setIsRequesting, toaster]);

	const bringToStage = useCallback(
		(sessionId: string) => {
			if (!isOwner || !daily) return;

			daily.updateParticipant(sessionId, {
				updatePermissions: {
					canSend: true,
					hasPresence: true,
				},
			});
			setRequestedParticipants((prev) => {
				const prevP = { ...prev };
				delete prevP[sessionId];
				return prevP;
			});
			sendAppMessage({ event: 'bring-to-stage', sessionId });
		},
		[daily, isOwner, sendAppMessage, setRequestedParticipants]
	);

	const removeFromStage = useCallback(
		(sessionId: string) => {
			if (!isOwner || !daily) return;

			daily.updateParticipant(sessionId, {
				updatePermissions: {
					canSend: false,
					hasPresence: false,
				},
			});
			sendAppMessage({ event: 'remove-from-stage', sessionId });
		},
		[daily, isOwner, sendAppMessage]
	);

	const leaveStage = useCallback(() => {
		sendAppMessage({ event: 'leave-stage' });
		toaster.notify('light', {
			title: 'Left the stage',
			description: 'You can always request to join the stage',
		});
	}, [sendAppMessage, toaster]);

	return {
		isRequesting,
		requestedParticipants,
		onAppMessage,
		requestToJoinStage,
		cancelRequestToJoinStage,
		bringToStage,
		removeFromStage,
		leaveStage,
	};
};
