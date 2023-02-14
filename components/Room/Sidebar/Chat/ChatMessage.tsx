import Avatar from 'boring-avatars';
import React from 'react';

import { useMessage } from '../../../../contexts/UIState';
import { Badge } from '../../../../ui/Badge';
import { Flex } from '../../../../ui/Flex';
import { Text } from '../../../../ui/Text';
import { ChatReact } from './ChatReact';
import { ChatReactions } from './ChatReactions';

interface Props {
	id: string;
}

export const ChatMessage = ({ id }: Props) => {
	const message = useMessage(id);

	if (!message) return null;

	return (
		<Flex
			css={{
				justifyContent: 'space-between',
				gap: '$3',
				p: '$3 $1',
				'&:hover': { '.msg-react': { visibility: 'visible', opacity: 1 } },
			}}
		>
			<Avatar
				size={44}
				name={message.avatar}
				variant="beam"
				colors={['#1BEBB9', '#00C9DF', '#2B3F56', '#D1FBF1']}
			/>
			<Flex
				css={{
					position: 'relative',
					flexFlow: 'column wrap',
					flex: 1,
					gap: '$2',
				}}
			>
				<Flex
					css={{ flexFlow: 'column wrap', position: 'relative', gap: '$2' }}
				>
					<Flex css={{ alignItems: 'center', gap: '$1' }}>
						<Text
							css={{
								fontWeight: '$semibold',
								color: message.isLocal ? '$primary' : '$baseText',
							}}
						>
							{message.userName}
						</Text>
						{message.isLocal && (
							<Badge color="primary" size="xs">
								You
							</Badge>
						)}
					</Flex>
					<Text size={2} css={{ color: '$muted', lineHeight: '130%' }}>
						{message.message}
					</Text>
					<ChatReact id={id} />
				</Flex>
				<ChatReactions id={id} />
			</Flex>
		</Flex>
	);
};
