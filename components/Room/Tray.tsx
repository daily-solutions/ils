import Image from 'next/image';
import React from 'react';

import Logo from '../../public/Logo.png';
import { Divider } from '../../ui/Divider';
import { Flex } from '../../ui/Flex';
import { AudioControl } from './Tray/AudioControl';
import { ChatControl } from './Tray/ChatControl';
import { RecordingControl } from './Tray/RecordingControl';
import { RequestStageControl } from './Tray/RequestStageControl';
import { ScreenShareControl } from './Tray/ScreenShareControl';
import { VideoControl } from './Tray/VideoControl';
import { ViewerCount } from './Tray/ViewerCount';

export const Tray = () => {
	return (
		<Flex
			css={{
				alignItems: 'center',
				justifyContent: 'space-between',
				p: '$5',
			}}
		>
			<Image src={Logo} alt="Daily Logo" />
			<Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
				<VideoControl />
				<AudioControl />
				<ChatControl />
				<ScreenShareControl />
				<RecordingControl />
			</Flex>
			<Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
				<RequestStageControl />
				<Divider />
				<ViewerCount />
			</Flex>
		</Flex>
	);
};
