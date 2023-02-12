import { useDaily, useLocalSessionId } from '@daily-co/daily-react';
import React, { memo, useCallback, useEffect } from 'react';

import { useMeetingState } from '../../contexts/UIState';
import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';
import { Divider } from '../../ui/Divider';
import { Flex } from '../../ui/Flex';
import { AudioControl, VideoControl } from '../Room';
import { Tile } from '../Tile';
import { Devices } from './Devices';

export const Setup = memo(() => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const [, setMeetingState] = useMeetingState();

	useEffect(() => {
		if (!daily) return;

		daily.startCamera();
	}, [daily]);

	const handleJoin = useCallback(() => {
		if (!daily) return;

		setMeetingState('joining-meeting');
		daily?.join();
	}, [daily, setMeetingState]);

	return (
		<Box css={{ width: '100%', height: '100%' }}>
			<Tile sessionId={localSessionId as string} />
			<Flex
				css={{
					alignItems: 'center',
					justifyContent: 'space-between',
					mt: '$5',
					px: '$3',
				}}
			>
				<Flex css={{ gap: '$2' }}>
					<VideoControl />
					<AudioControl />
				</Flex>
				<Button onClick={handleJoin}>Join</Button>
			</Flex>
			<Divider css={{ mt: '$4' }} />
			<Devices />
		</Box>
	);
});

Setup.displayName = 'Setup';
