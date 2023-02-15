import { DailyParticipant } from '@daily-co/daily-js';
import { useParticipantIds } from '@daily-co/daily-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useVideoGrid } from '../../hooks/useVideoGrid';
import { Box } from '../../ui/Box';
import { Flex } from '../../ui/Flex';
import { Tile } from '../Tile';

export const View = () => {
	const viewRef = useRef<HTMLDivElement>(null);
	const participantIds = useParticipantIds({
		filter: useCallback(
			(p: DailyParticipant) =>
				Boolean(
					p?.permissions?.canSend &&
						(p.owner || (p?.userData as any)?.['onStage'])
				),
			[]
		),
	});

	const [dimensions, setDimensions] = useState({
		width: 1,
		height: 1,
	});

	useResizeObserver(
		viewRef,
		useCallback(() => {
			if (!viewRef.current) return;
			const { height, width } = viewRef.current.getBoundingClientRect();
			setDimensions({ height, width });
		}, [])
	);

	const { columns, containerHeight, containerWidth } = useVideoGrid({
		width: dimensions.width,
		height: dimensions.height,
		minTileWidth: 280,
		gap: 1,
		sessionIds: participantIds,
	});

	useEffect(() => {
		if (!viewRef.current) return;
		viewRef.current.style.setProperty('--grid-gap', '1px');
		viewRef.current.style.setProperty('--grid-columns', columns.toString());
		viewRef.current.style.setProperty('--grid-width', `${containerWidth}px`);
		viewRef.current.style.setProperty('--grid-height', `${containerHeight}px`);
	}, [columns, containerHeight, containerWidth]);

	return (
		<Flex
			ref={viewRef}
			css={{
				width: '100%',
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{participantIds.length > 0 ? (
				<Flex
					css={{
						flexFlow: 'row wrap',
						alignItems: 'center',
						justifyContent: 'center',
						margin: 'auto',
						width: '100%',
						gap: 'var(--grid-gap, 1px)',
						maxHeight: 'var(--grid-height, 100%)',
						maxWidth: 'var(--grid-width, 100%)',
						overflow: 'hidden',
						transition: 'height 100ms ease, width 100ms ease',
					}}
				>
					{participantIds.map((participantId) => (
						<Tile sessionId={participantId} key={participantId} />
					))}
				</Flex>
			) : (
				<Box>
					<h3>Please wait till a host joins your call</h3>
				</Box>
			)}
		</Flex>
	);
};
