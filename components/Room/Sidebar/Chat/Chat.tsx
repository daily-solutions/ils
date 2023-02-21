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
	const [, setSidebar] = useSidebar();
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
				height: '100%',
				width: '100%',
				maxHeight: withHeader ? 'calc(100% - 15px)' : 'calc(100dvh - 100px)',
			}}
		>
			{withHeader && (
				<Flex
					css={{
						height: '44px',
						alignItems: 'center',
						justifyContent: 'space-between',
						p: '$1 $4',
					}}
				>
					<Text>Chat</Text>
					<Button
						variant="ghost"
						size="pagination"
						onClick={() => setSidebar(null)}
					>
						<Icon icon="cross" />
					</Button>
				</Flex>
			)}
			{withHeader && <Divider />}
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
	);
};
