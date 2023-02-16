import { DailyAudio } from '@daily-co/daily-react';
import React from 'react';

import { Box } from '../../ui/Box';
import { Flex } from '../../ui/Flex';
import { InviteToJoin } from '../Modal';
import { EmojiReactions } from './EmojiReactions';
import { Sidebar } from './Sidebar';
import { Tray } from './Tray';
import { View } from './View';

export const Room = () => {
	return (
		<>
			<Flex css={{ width: '100dvw', height: '100dvh' }}>
				<Flex
					css={{
						flexDirection: 'column',
						flex: 1,
						width: '100%',
						height: '100%',
					}}
				>
					<Box css={{ flex: 1, p: '$5' }}>
						<View />
					</Box>
					<Tray />
				</Flex>
				<Sidebar />
			</Flex>
			<DailyAudio />
			<EmojiReactions />
			<InviteToJoin />
		</>
	);
};
