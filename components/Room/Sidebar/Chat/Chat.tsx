import React, { useEffect, useRef } from 'react';

import { useMessages } from '../../../../contexts/UIState';
import { Box } from '../../../../ui/Box';
import { Divider } from '../../../../ui/Divider';
import { Flex } from '../../../../ui/Flex';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';

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
				maxHeight: 'calc(100dvh - 100px)',
				height: '100%',
			}}
		>
			<Box
				ref={chatRef}
				css={{
					flex: 1,
					p: '$2 $4',
					overflowY: 'auto',
					scrollBehavior: 'smooth',
				}}
			>
				{messages.map((message) => (
					<ChatMessage key={message.id} id={message.id} />
				))}
			</Box>
			<Divider />
			<ChatInput />
		</Flex>
	);
};
