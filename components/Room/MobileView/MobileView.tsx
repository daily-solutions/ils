import { DailyAudio } from '@daily-co/daily-react';

import { Flex } from '../../../ui/Flex';
import { CreatePoll } from '../../Modal';
import { EmojiReactions } from '../EmojiReactions';
import { BottomTray } from './BottomTray';
import { Header } from './Header';
import { RightTray } from './RightTray';
import { View } from './View';

export const MobileView = () => {
	return (
		<Flex
			css={{
				width: '100dvw',
				height: '100dvh',
				alignItems: 'center',
				justifyContent: 'center',
				background: '$background',
				color: '$baseText',
			}}
		>
			<Header />
			<View />
			<BottomTray />
			<RightTray />
			<EmojiReactions />
			<DailyAudio />
			<CreatePoll />
		</Flex>
	);
};
