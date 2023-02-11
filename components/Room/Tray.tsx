import Image from 'next/image';
import React from 'react';

import { useParticipantCounts } from '../../hooks/useParticipantCount';
import { Badge } from '../../ui/Badge';
import { Flex } from '../../ui/Flex';
import { AudioControl } from './Tray/AudioControl';
import { RecordingControl } from './Tray/RecordingControl';
import { ScreenShareControl } from './Tray/ScreenShareControl';
import { VideoControl } from './Tray/VideoControl';

export const Tray = () => {
	const { hidden } = useParticipantCounts();
	return (
		<Flex
			css={{
				alignItems: 'center',
				justifyContent: 'space-between',
				p: '$5',
			}}
		>
			<Image src="/logo.png" alt="Daily Logo" width={25} height={35} />
			<Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
				<VideoControl />
				<AudioControl />
				<ScreenShareControl />
				<RecordingControl />
			</Flex>
			<Badge>{hidden.toLocaleString('en-US')} viewers</Badge>
		</Flex>
	);
};
