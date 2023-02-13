import { DailyAudio, useDaily } from '@daily-co/daily-react';
import React, { useEffect } from 'react';

import { Box } from '../../ui/Box';
import { Flex } from '../../ui/Flex';
import { Sidebar } from './Sidebar';
import { Tray } from './Tray';
import { View } from './View';

export const Room = () => {
	const daily = useDaily();

	useEffect(() => {
		return () => {
			daily?.destroy();
		};
	}, [daily]);

	return (
		<Flex css={{ width: '100dvw', height: '100dvh' }}>
			<Flex css={{ flexDirection: 'column', flex: 1 }}>
				<Box css={{ flex: 1, p: '$5' }}>
					<View />
				</Box>
				<Tray />
			</Flex>
			<Sidebar />
			<DailyAudio />
		</Flex>
	);
};
