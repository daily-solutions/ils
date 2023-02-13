import { DailyEventObjectAppMessage } from '@daily-co/daily-js';
import {
	useAppMessage,
	useDaily,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

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
						// @TODO: send toast saying that you are on stage
						setIsRequesting(false);
					}
					break;
				case 'remove-from-stage':
					if (localSessionId === ev.data?.sessionId) {
						// @TODO: send toast saying that you were removed from the stage
					}
					break;
				case 'leave-stage':
					// @TODO: send toast to everyone saying that you left the stage (everyone? or just owners)
					break;
				case 'request-stage':
					if (isOwner) {
						const userName = ev.data?.userName;
						setRequestedParticipants((prev) => ({
							...prev,
							[ev.fromId]: { id: ev.fromId, userName },
						}));
						// @TODO: send toast saying someone requested to join the stage
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
		[isOwner, localSessionId, setIsRequesting, setRequestedParticipants]
	);

	const requestToJoinStage = useCallback(() => {
		if (isOwner) return;

		setIsRequesting(true);
		sendAppMessage({ event: 'request-stage', userName });
		// @TODO: toast to say that you requested to join the stage.
	}, [isOwner, sendAppMessage, setIsRequesting, userName]);

	const cancelRequestToJoinStage = useCallback(() => {
		if (isOwner) return;

		setIsRequesting(false);
		sendAppMessage({ event: 'cancel-request-stage' });
		// @TODO: toast to say that you cancelled your request to join the stage.
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
		sendAppMessage({ event: 'leave-stage' });
	}, [sendAppMessage]);

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
