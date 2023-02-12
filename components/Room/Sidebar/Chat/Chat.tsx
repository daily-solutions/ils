import React, { useEffect, useRef } from 'react';

import { useMessages } from '../../../../contexts/UIState';
import { Box } from '../../../../ui/Box';
import { Divider } from '../../../../ui/Divider';
import { Flex } from '../../../../ui/Flex';
import { Text } from '../../../../ui/Text';
import { ChatInput } from './ChatInput';

export const Chat = () => {
	const chatRef = useRef<HTMLDivElement>(null);
	const [messages] = useMessages();

	useEffect(() => {
		const chat = chatRef.current;
		if (!chat) return;

		if (chat.scrollTop !== chat.scrollHeight)
			chat.scrollTop = chat.scrollHeight;
	}, [messages]);

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
				<ChatInput />
			</Box>
		</Flex>
	);
};
