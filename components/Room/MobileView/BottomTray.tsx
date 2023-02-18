import React from 'react';

import { Emoji } from '../../../contexts/UIState';
import { useReactions } from '../../../hooks/useReactions';
import { Button } from '../../../ui/Button';
import { Flex } from '../../../ui/Flex';
import { TrayButton } from '../../TrayButton';

const mobileEmojis: Emoji[] = ['❤️', '👍', '🔥'];

export const BottomTray = () => {
	const { react } = useReactions();
	return (
		<Flex
			css={{
				alignItems: 'center',
				justifyContent: 'space-between',
				position: 'absolute',
				bottom: 10,
				width: '100%',
				px: '$3',
			}}
		>
			<Flex css={{ gap: '$2' }}>
				{mobileEmojis.map((e) => (
					<TrayButton variant="outline" key={e} onClick={() => react(e)}>
						{e}
					</TrayButton>
				))}
			</Flex>
			<Button rounded>Ask a question</Button>
		</Flex>
	);
};
