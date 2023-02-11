import {
	useAppMessage,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useMessages } from '../../../contexts/UIState';
import { Box } from '../../../ui/Box';
import { Divider } from '../../../ui/Divider';
import { Flex } from '../../../ui/Flex';
import { Input } from '../../../ui/Input';
import { Text } from '../../../ui/Text';

export const Chat = () => {
	const chatRef = useRef<HTMLDivElement>(null);
	const [message, setMessage] = useState<string>('');
	const [messages, setChatMessages] = useMessages();
	const localSessionId = useLocalSessionId();
	const userName = useParticipantProperty(
		localSessionId as string,
		'user_name'
	);
	const sendAppMessage = useAppMessage();

	useEffect(() => {
		const chat = chatRef.current;
		if (!chat) return;

		if (chat.scrollTop !== chat.scrollHeight)
			chat.scrollTop = chat.scrollHeight;
	}, [messages]);

	const handleSendMessage = useCallback(() => {
		sendAppMessage({
			message,
			userName,
		});
		setChatMessages((msgs) => [
			...msgs,
			{
				id: crypto.randomUUID(),
				message,
				userName,
				fromId: localSessionId as string,
				isLocal: true,
				receivedAt: new Date(),
			},
		]);
		setMessage('');
	}, [localSessionId, message, sendAppMessage, setChatMessages, userName]);

	return (
		<Flex
			css={{
				flexDirection: 'column',
				width: '100%',
				maxHeight: 'calc(100dvh - 136px)',
				height: '100%',
			}}
		>
			<Box
				ref={chatRef}
				css={{
					flex: 1,
					px: '$4',
					overflowY: 'auto',
					scrollBehavior: 'smooth',
				}}
			>
				{messages.map((message) => (
					<Box key={message.id}>
						<Text css={{ fontWeight: '$bold' }}>{message.userName}</Text>
						<Text css={{ py: '$3' }}>{message.message}</Text>
					</Box>
				))}
			</Box>
			<Divider />
			<Box css={{ p: '$4', marginTop: 'auto' }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSendMessage();
					}}
				>
					<Input
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Enter your message"
					/>
				</form>
			</Box>
		</Flex>
	);
};
