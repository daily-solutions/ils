import { DailyEventObjectAppMessage } from '@daily-co/daily-js';
import { useAppMessage, useDaily, useDailyEvent } from '@daily-co/daily-react';
import React, { useCallback, useEffect, useMemo } from 'react';

import { useMeetingState, useMessages } from '../../contexts/UIState';
import { Loader } from '../../ui/Loader';
import { Haircheck } from '../Haircheck';
import { LeftMeeting } from '../Left';
import { Room } from '../Room';

export const Layout = () => {
	const daily = useDaily();
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

	return useMemo(() => {
		switch (meetingState) {
			case 'lobby':
				return <Haircheck />;
			case 'joining-meeting':
				return <Loader />;
			case 'joined-meeting':
				return <Room />;
			case 'left-meeting':
				return <LeftMeeting />;
			default:
				return <Loader />;
		}
	}, [meetingState]);
};
