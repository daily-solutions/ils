import Image from 'next/image';
import React from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import Logo from '../../public/Logo.png';
import { Divider } from '../../ui/Divider';
import { Flex } from '../../ui/Flex';
import { AudioControl } from './Tray/AudioControl';
import { ChatControl } from './Tray/ChatControl';
import { ReactionsControl } from './Tray/ReactionsControl';
import { RecordingControl } from './Tray/RecordingControl';
import { RequestStageControl } from './Tray/RequestStageControl';
import { VideoControl } from './Tray/VideoControl';
import { ViewerCount } from './Tray/ViewerCount';

export const Tray = () => {
	const md = useMediaQuery('(min-width: 800px)');
	return (
		<Flex
			css={{
				alignItems: 'center',
				justifyContent: 'space-between',
				p: '$5',
				height: '80px',
				width: '100%',
			}}
		>
			{md && <Image src={Logo} alt="Daily Logo" />}
			<Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
				<VideoControl />
				<AudioControl />
				<ChatControl />
				<RecordingControl />
				<ReactionsControl />
			</Flex>
			<Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
				<RequestStageControl />
				<Divider />
				<ViewerCount />
			</Flex>
		</Flex>
	);
};
