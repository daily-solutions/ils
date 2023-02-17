import React, { useEffect, useRef } from 'react';

import { useMessages, useSidebar } from '../../../../contexts/UIState';
import { Box } from '../../../../ui/Box';
import { Button } from '../../../../ui/Button';
import { Divider } from '../../../../ui/Divider';
import { Flex } from '../../../../ui/Flex';
import { Icon } from '../../../../ui/Icon';
import { Text } from '../../../../ui/Text';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';

interface Props {
	withHeader?: boolean;
}

export const Chat = ({ withHeader = false }: Props) => {
	const chatRef = useRef<HTMLDivElement>(null);
	const [messages] = useMessages();
	const [, setSidebar] = useSidebar();

	useEffect(() => {
		const chat = chatRef.current;
		if (!chat) return;

		if (chat.scrollTop !== chat.scrollHeight)
			chat.scrollTop = chat.scrollHeight;
	}, [messages]);

	return (
		<Box css={{ width: '100%', height: '100%' }}>
			{withHeader && (
				<Flex
					css={{
						p: '$2 $4',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Text size={4}>Chat</Text>
					<Button
						size="reaction"
						variant="outline"
						onClick={() => setSidebar(null)}
					>
						<Icon icon="cross" size={15} />
					</Button>
				</Flex>
			)}
			{withHeader && <Divider />}
			<Flex
				css={{
					flexDirection: 'column',
					height: '100%',
					maxHeight: withHeader
						? 'calc(100dvh - 80px)'
						: 'calc(100dvh - 100px)',
				}}
			>
				<Box
					ref={chatRef}
					css={{
						flex: 1,
						p: '$2 0',
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
		</Box>
	);
};
