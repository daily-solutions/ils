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
	useMessages,
	useViewers,
} from '../../contexts/UIState';
import { useParticipantCounts } from '../../hooks/useParticipantCount';

export const Wrapper = memo(({ children }: React.PropsWithChildren<{}>) => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');

	const [meetingState, setMeetingState] = useMeetingState();
	const [, setChatMessages] = useMessages();

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
			(ev: DailyEventObjectAppMessage) => {
				setChatMessages((msgs) => [
					...msgs,
					{
						...ev.data,
						id: crypto.randomUUID(),
						fromId: ev.fromId,
						receivedAt: new Date(),
						isLocal: false,
					},
				]);
			},
			[setChatMessages]
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
		if (!isOwner || hidden < 1) return;

		const fetchPresenceData = async () => {
			const presenceRes = await fetch(`${window.location.origin}/api/presence`);
			const { participants } = await presenceRes.json();
			handleViewers(participants);
		};

		fetchPresenceData();
	}, [handleViewers, hidden, isOwner]);

	return <>{children}</>;
});

Wrapper.displayName = 'Wrapper';
