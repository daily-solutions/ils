import {
	DailyEventObjectAppMessage,
	DailyParticipant,
} from '@daily-co/daily-js';
import {
	useAppMessage,
	useDaily,
	useDailyEvent,
	useLocalSessionId,
	useParticipantIds,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useEffect } from 'react';

import {
	PresenceParticipant,
	useMeetingState,
	useMessages,
	useViewers,
} from '../../contexts/UIState';
import { useParticipantCounts } from '../../hooks/useParticipantCount';

export const Wrapper = ({ children }: React.PropsWithChildren<{}>) => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');

	const [meetingState, setMeetingState] = useMeetingState();
	const [, setChatMessages] = useMessages();

	useEffect(() => {
		if (!daily || meetingState !== 'new') return;

		const doPreAuth = async () => {
			// @ts-ignore
			const { token, url } = daily.properties;
			await daily.preAuth({ url, token });
			setMeetingState('lobby');
		};
		doPreAuth();
	}, [daily, meetingState, setMeetingState]);

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
};
