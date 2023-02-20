import { DailyEventObjectAppMessage } from '@daily-co/daily-js';
import {
	useAppMessage,
	useDaily,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

import { useInviteToJoin } from '../contexts/UIState';
import { useToasts } from './useToast';

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
	avatar: string;
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
	const [isOwner, userName, userData] = useParticipantProperty(
		localSessionId as string,
		['owner', 'user_name', 'userData']
	);
	const [isRequesting, setIsRequesting] = useRecoilState(isRequestingState);
	const [requestedParticipants, setRequestedParticipants] = useRecoilState(
		requestedParticipantsState
	);
	const [, setInvited] = useInviteToJoin();
	const { toaster } = useToasts();

	const sendAppMessage = useAppMessage();

	const requestToJoinStage = useCallback(() => {
		if (isOwner) return;

		setIsRequesting(true);
		sendAppMessage({
			event: 'request-stage',
			userName,
			avatar: (userData as any)?.['avatar'],
		});
	}, [isOwner, sendAppMessage, setIsRequesting, userData, userName]);

	const cancelRequestToJoinStage = useCallback(() => {
		if (isOwner) return;

		setIsRequesting(false);
		sendAppMessage({ event: 'cancel-request-stage' });
	}, [isOwner, sendAppMessage, setIsRequesting]);

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
		if (!daily) return;

		daily.setUserData({ ...(userData as any), onStage: false });
		sendAppMessage({ event: 'leave-stage' });
	}, [daily, sendAppMessage, userData]);

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
						daily?.setUserData({ ...(userData as any), invited: true });
						setInvited(true);
						setIsRequesting(false);
					}
					break;
				case 'remove-from-stage':
					if (localSessionId === ev.data?.sessionId) {
						daily?.setUserData({
							...(userData as any),
							onStage: false,
							invited: false,
						});
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
						daily?.updateParticipant(ev.fromId, {
							updatePermissions: {
								canSend: false,
								hasPresence: false,
							},
						});
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
						const avatar = ev.data?.avatar;
						setRequestedParticipants((prev) => ({
							...prev,
							[ev.fromId]: { id: ev.fromId, userName, avatar },
						}));
						toaster.notify('light', {
							title: `${userName ?? 'Guest'} requested to join the stage`,
							avatar: avatar,
							actions: {
								type: 'bringToStage',
								bringToStage: () => bringToStage(ev.fromId),
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
			bringToStage,
			daily,
			isOwner,
			localSessionId,
			setInvited,
			setIsRequesting,
			setRequestedParticipants,
			toaster,
			userData,
		]
	);

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
