import {
	DailyEventObjectAppMessage,
	DailyParticipant,
	DailyRoomInfo,
} from '@daily-co/daily-js';
import {
	useAppMessage,
	useDaily,
	useDailyEvent,
	useLocalSessionId,
	useParticipantIds,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { memo, useCallback, useEffect } from 'react';

import {
	PresenceParticipant,
	useMeetingState,
	useViewers,
} from '../../contexts/UIState';
import { ChatAppMessage, useChat } from '../../hooks/useChat';
import { useParticipantCounts } from '../../hooks/useParticipantCount';
import { StageAppMessage, useStage } from '../../hooks/useStage';

type AppMessage = StageAppMessage | ChatAppMessage;

export const Wrapper = memo(({ children }: React.PropsWithChildren<{}>) => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');

	const [meetingState, setMeetingState] = useMeetingState();

	const { onAppMessage: onStageAppMessage } = useStage();
	const { onAppMessage: onChatAppMessage } = useChat();

	const handlePreAuth = useCallback(async () => {
		if (!daily) return;

		// @ts-ignore
		const { token, url } = daily.properties;
		await daily.preAuth({ url, token });
		const room = (await daily.room()) as DailyRoomInfo;
		if (room?.id) {
			const { config, domainConfig, tokenConfig } = room;
			const enablePrejoinUI =
				tokenConfig?.enable_prejoin_ui ??
				config?.enable_prejoin_ui ??
				domainConfig?.enable_prejoin_ui;
			if (enablePrejoinUI) setMeetingState('lobby');
			else {
				setMeetingState('joining-meeting');
				await daily.join();
			}
		}
	}, [daily, setMeetingState]);

	useEffect(() => {
		if (!daily || meetingState !== 'new') return;

		handlePreAuth();
		// @ts-ignore
		window['callObject'] = daily;
	}, [daily, handlePreAuth, meetingState]);

	useDailyEvent(
		'joined-meeting',
		useCallback(() => setMeetingState('joined-meeting'), [setMeetingState])
	);

	useDailyEvent(
		'left-meeting',
		useCallback(() => setMeetingState('left-meeting'), [setMeetingState])
	);

	useAppMessage({
		onAppMessage: useCallback(
			(ev: DailyEventObjectAppMessage<AppMessage>) => {
				switch (ev.data.event) {
					case 'chat-message':
						onChatAppMessage(ev as DailyEventObjectAppMessage<ChatAppMessage>);
						break;
					case 'react-msg':
						onChatAppMessage(ev as DailyEventObjectAppMessage<ChatAppMessage>);
						break;
					default:
						onStageAppMessage(
							ev as DailyEventObjectAppMessage<StageAppMessage>
						);
						break;
				}
			},
			[onStageAppMessage, onChatAppMessage]
		),
	});

	const participantIds = useParticipantIds({
		filter: useCallback((p: DailyParticipant) => p.permissions.hasPresence, []),
	});
	const { hidden } = useParticipantCounts();
	const [, setViewers] = useViewers();

	const handleViewers = useCallback(
		(presenceParticipants: PresenceParticipant[]) => {
			const viewers = presenceParticipants.filter(
				(p) => !participantIds.includes(p.id)
			);
			setViewers(viewers);
		},
		[participantIds, setViewers]
	);

	useEffect(() => {
		if (!isOwner) return;

		const fetchPresenceData = async () => {
			const presenceRes = await fetch(`${window.location.origin}/api/presence`);
			const { participants } = await presenceRes.json();
			handleViewers(participants);
		};

		if (hidden > 0) fetchPresenceData();
		else handleViewers([]);
	}, [handleViewers, hidden, isOwner]);

	return <>{children}</>;
});

Wrapper.displayName = 'Wrapper';
