import {
	useAppMessage,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { memo, useCallback, useState } from 'react';

import { useMessages } from '../../../../contexts/UIState';
import { Box } from '../../../../ui/Box';
import { Input } from '../../../../ui/Input';

export const ChatInput = memo(() => {
	const localSessionId = useLocalSessionId();
	const userName = useParticipantProperty(
		localSessionId as string,
		'user_name'
	);
	const [, setChatMsgs] = useMessages();
	const [message, setMessage] = useState<string>('');

	const sendAppMessage = useAppMessage();

	const handleSendMessage = useCallback(() => {
		sendAppMessage({
			message,
			userName,
		});
		setChatMsgs((msgs) => [
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
	}, [localSessionId, message, sendAppMessage, setChatMsgs, userName]);

	return (
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
	);
});

ChatInput.displayName = 'ChatInput';
