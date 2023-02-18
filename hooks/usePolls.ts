import { DailyEventObjectAppMessage } from '@daily-co/daily-js';
import {
	useAppMessage,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback, useMemo } from 'react';

import {
	useMessages,
	usePoll,
	usePollOptions,
	usePollQuestion,
	useViewPoll,
} from '../contexts/UIState';
import { getReactions } from './useChat';

interface CreatePollAppMessage {
	event: 'poll';
	id: string;
	question: string;
	options: string[];
	votes: Record<string, string[]>;
	userName: string;
	avatar: string;
}

interface VotePollAppMessage {
	event: 'vote-poll';
	id: string;
	option: string;
}

export type PollAppMessage = CreatePollAppMessage | VotePollAppMessage;

export const usePolls = () => {
	const [, setPoll] = usePoll();
	const [question, setQuestion] = usePollQuestion();
	const [options, setOptions] = usePollOptions();
	const [, setChatMsgs] = useMessages();
	const [, setViewPoll] = useViewPoll();

	const localSessionId = useLocalSessionId();
	const [userName, userData] = useParticipantProperty(
		localSessionId as string,
		['user_name', 'userData']
	);

	const handleQuestionChange = useCallback(
		(value: string) => setQuestion(value),
		[setQuestion]
	);

	const handleOptionChange = useCallback(
		(value: string, index: number) => {
			setOptions((options) => {
				const newOptions = options.slice();
				newOptions[index] = value;

				const emptyOptions = newOptions.filter((option) => option === '');
				const lastEmptyOption = newOptions.lastIndexOf('');

				if (newOptions.length >= 2 && emptyOptions.length === 0) {
					newOptions.push('');
				} else if (newOptions.length > 2 && emptyOptions.length > 1) {
					newOptions.splice(lastEmptyOption, 1);
				}
				return [...newOptions];
			});
		},
		[setOptions]
	);

	const validateOptions = useCallback(
		(option: string, index: number) => {
			if (!option) return false;

			const newOptions = options.slice(0, index);
			return newOptions.includes(option);
		},
		[options]
	);

	const isValidPoll = useMemo(
		() => new Set(options.filter((option) => option)).size >= 2 && question,
		[options, question]
	);

	const resetPoll = useCallback(() => {
		setQuestion('');
		setOptions(['', '']);
		setPoll(false);
	}, [setOptions, setPoll, setQuestion]);

	const sendAppMessage = useAppMessage();

	const onAppMessage = useCallback(
		(ev: DailyEventObjectAppMessage<PollAppMessage>) => {
			switch (ev.data.event) {
				case 'poll':
					const event = ev as DailyEventObjectAppMessage<CreatePollAppMessage>;
					setChatMsgs((msgs) => [
						...msgs,
						{
							id: event.data.id,
							message: '',
							userName: event.data.userName,
							avatar: event.data.avatar,
							reactions: getReactions(),
							poll: {
								question: event.data.question,
								options: event.data.options,
								votes: event.data.votes,
							},
							fromId: event.fromId,
							receivedAt: new Date(),
							isLocal: false,
						},
					]);
					break;
				case 'vote-poll':
					const voteEvent =
						ev as DailyEventObjectAppMessage<VotePollAppMessage>;
					setChatMsgs((msgs) => {
						const prev = [...msgs];
						const chatMsgId = prev.findIndex((m) => m.id === voteEvent.data.id);
						if (chatMsgId === -1) return prev;

						let chatMessage = Object.assign({}, prev[chatMsgId]);
						if (!chatMessage.poll?.votes) return prev;
						const votes = { ...chatMessage.poll.votes };
						const hasVotedBefore = Object.keys(votes).find((key) =>
							votes[key].includes(voteEvent.fromId)
						);
						if (hasVotedBefore) {
							votes[hasVotedBefore] = votes[hasVotedBefore].filter(
								(id) => id !== voteEvent.fromId
							);
						}
						votes[voteEvent.data.option] = [
							...votes[voteEvent.data.option],
							voteEvent.fromId,
						];
						chatMessage = {
							...chatMessage,
							poll: {
								...chatMessage.poll,
								votes,
							},
						};
						prev[chatMsgId] = chatMessage;
						return prev;
					});
					break;
				default:
					break;
			}
		},
		[setChatMsgs]
	);

	const createPoll = useCallback(() => {
		if (!isValidPoll) return;

		const id = crypto.randomUUID();
		const filteredOptions = options.filter((o) => o !== '');
		const votes = filteredOptions.reduce((obj: any, option) => {
			obj[option] = [];
			return obj;
		}, {});
		sendAppMessage({
			event: 'poll',
			id,
			question,
			options: filteredOptions,
			votes,
			userName,
			avatar: (userData as any)?.avatar,
		});
		setChatMsgs((msgs) => [
			...msgs,
			{
				id,
				message: '',
				userName: userName,
				avatar: (userData as any)?.avatar,
				reactions: getReactions(),
				poll: {
					question: question,
					options: filteredOptions,
					votes,
				},
				fromId: localSessionId as string,
				receivedAt: new Date(),
				isLocal: true,
			},
		]);
		resetPoll();
	}, [
		isValidPoll,
		localSessionId,
		options,
		question,
		resetPoll,
		sendAppMessage,
		setChatMsgs,
		userData,
		userName,
	]);

	const viewPoll = useCallback((id: string) => setViewPoll(id), [setViewPoll]);

	const voteToPoll = useCallback(
		(id: string, option: string) => {
			if (!localSessionId) return;

			sendAppMessage({ event: 'vote-poll', id, option });
			setChatMsgs((msgs) => {
				const prev = [...msgs];
				const chatMsgId = prev.findIndex((m) => m.id === id);
				if (chatMsgId === -1) return prev;

				let chatMessage = Object.assign({}, prev[chatMsgId]);
				if (!chatMessage.poll?.votes) return prev;
				const votes = { ...chatMessage.poll.votes };
				const hasVotedBefore = Object.keys(votes).find((key) =>
					votes[key].includes(localSessionId)
				);
				if (hasVotedBefore) {
					votes[hasVotedBefore] = votes[hasVotedBefore].filter(
						(id) => id !== localSessionId
					);
				}
				votes[option] = [...votes[option], localSessionId];
				chatMessage = {
					...chatMessage,
					poll: {
						...chatMessage.poll,
						votes,
					},
				};
				prev[chatMsgId] = chatMessage;
				return prev;
			});
		},
		[localSessionId, sendAppMessage, setChatMsgs]
	);

	return {
		question,
		options,
		handleQuestionChange,
		handleOptionChange,
		validateOptions,
		isValidPoll,
		cancelPoll: resetPoll,
		createPoll,
		onAppMessage,
		viewPoll,
		voteToPoll,
	};
};
