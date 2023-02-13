import React from 'react';

import { Box } from '../../../../ui/Box';
import { Text } from '../../../../ui/Text';

interface Props {
	userName: string;
	message: string;
}

export const ChatMessage = ({ message, userName }: Props) => {
	return (
		<Box>
			<Text css={{ fontWeight: '$bold' }}>{userName}</Text>
			<Text css={{ py: '$3' }}>{message}</Text>
		</Box>
	);
};
