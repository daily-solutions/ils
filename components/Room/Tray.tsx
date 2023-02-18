import Image from 'next/image';
import React from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import Logo from '../../public/Logo.png';
import { Divider } from '../../ui/Divider';
import { Flex } from '../../ui/Flex';
import { AudioControl } from './Tray/AudioControl';
import { ChatControl } from './Tray/ChatControl';
import { PeopleControl } from './Tray/PeopleControl';
import { PollControl } from './Tray/PollControl';
import { ReactionsControl } from './Tray/ReactionsControl';
import { RecordingControl } from './Tray/RecordingControl';
import { RequestStageControl } from './Tray/RequestStageControl';
import { SettingsControl } from './Tray/SettingsControl';
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
				<PeopleControl />
				<PollControl />
				<RecordingControl />
				<ReactionsControl />
				<SettingsControl />
			</Flex>
			<Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
				<RequestStageControl />
				<Divider />
				<ViewerCount />
			</Flex>
		</Flex>
	);
};
