import {
	DailyEventObject,
	DailyEventObjectAppMessage,
	DailyRoomInfo,
} from '@daily-co/daily-js';
import {
	useAppMessage,
	useDaily,
	useThrottledDailyEvent,
} from '@daily-co/daily-react';
import React, { memo, useCallback, useEffect } from 'react';

import { useMeetingState } from '../../contexts/UIState';
import { ChatAppMessage, useChat } from '../../hooks/useChat';
import { useDailyViewers } from '../../hooks/useDailyViewers';
import {
	EmojiReactionsAppMessage,
	useReactions,
} from '../../hooks/useReactions';
import { StageAppMessage, useStage } from '../../hooks/useStage';

type AppMessage = StageAppMessage | ChatAppMessage | EmojiReactionsAppMessage;

export const Wrapper = memo(({ children }: React.PropsWithChildren<{}>) => {
	useDailyViewers();
	const daily = useDaily();
	const [meetingState, setMeetingState] = useMeetingState();

	const { onAppMessage: onStageAppMessage } = useStage();
	const { onAppMessage: onChatAppMessage } = useChat();
	const { onAppMessage: onEmojiReactionsMessage } = useReactions();

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
			else await daily.join();
		}
	}, [daily, setMeetingState]);

	useEffect(() => {
		if (!daily || meetingState !== 'new') return;

		handlePreAuth();
		// @ts-ignore
		window['callObject'] = daily;
	}, [daily, handlePreAuth, meetingState]);

	useThrottledDailyEvent(
		['joining-meeting', 'joined-meeting', 'left-meeting'],
		useCallback(
			(
				events: DailyEventObject<
					'joining-meeting' | 'joined-meeting' | 'left-meeting'
				>[]
			) => {
				if (!events.length) return;
				events.forEach((ev) => {
					switch (ev.action) {
						case 'joining-meeting':
							setMeetingState('joining-meeting');
							break;
						case 'joined-meeting':
							setMeetingState('joined-meeting');
							break;
						case 'left-meeting':
							setMeetingState('left-meeting');
							break;
					}
				});
			},
			[setMeetingState]
		)
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
					case 'emoji-reactions':
						onEmojiReactionsMessage(
							ev as DailyEventObjectAppMessage<EmojiReactionsAppMessage>
						);
						break;
					default:
						onStageAppMessage(
							ev as DailyEventObjectAppMessage<StageAppMessage>
						);
						break;
				}
			},
			[onChatAppMessage, onEmojiReactionsMessage, onStageAppMessage]
		),
	});

	return <>{children}</>;
});

Wrapper.displayName = 'Wrapper';
