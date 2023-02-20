import { DailyParticipant, DailyReceiveSettings } from '@daily-co/daily-js';
import {
	useLocalSessionId,
	useNetwork,
	useParticipantIds,
	useReceiveSettings,
} from '@daily-co/daily-react';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { useCamSubscriptions } from '../../hooks/useCamSubscriptions';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useVideoGrid } from '../../hooks/useVideoGrid';
import { Box } from '../../ui/Box';
import { Flex } from '../../ui/Flex';
import { ToastViewport } from '../../ui/Toast';
import { Tile } from '../Tile';
import { PaginationButton } from './PaginationButton';

export const View = () => {
	const localSessionId = useLocalSessionId();
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

	const { threshold, topology } = useNetwork();

	useResizeObserver(
		viewRef,
		useCallback(() => {
			if (!viewRef.current) return;
			const { height, width } = viewRef.current.getBoundingClientRect();
			setDimensions({ height, width });
		}, [])
	);

	const {
		columns,
		containerHeight,
		containerWidth,
		currentIds,
		currentPage,
		nextPage,
		pageSize,
		prevPage,
		totalPages,
	} = useVideoGrid({
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

	const camSubscriptions = useMemo(() => {
		const maxSubs = 3 * pageSize;

		let renderedOrBufferedIds: string[];
		switch (currentPage) {
			case 1:
				renderedOrBufferedIds = participantIds.slice(
					0,
					Math.min(maxSubs, 2 * pageSize)
				);
				break;
			case Math.ceil(participantIds.length / pageSize):
				renderedOrBufferedIds = participantIds.slice(
					-Math.min(maxSubs, 2 * pageSize)
				);
				break;
			default:
				{
					const buffer = Math.floor((maxSubs - pageSize) / 2);
					const min = Math.max(0, (currentPage - 1) * pageSize - buffer);
					const max = Math.min(
						participantIds.length,
						currentPage * pageSize + buffer
					);
					renderedOrBufferedIds = participantIds.slice(min, max);
				}
				break;
		}

		const subscribedIds: string[] = [];
		const stagedIds: string[] = [];

		for (const id of renderedOrBufferedIds) {
			if (id !== localSessionId) {
				if (currentIds.includes(id)) {
					subscribedIds.push(id);
				} else {
					stagedIds.push(id);
				}
			}
		}

		return {
			subscribedIds,
			stagedIds,
		};
	}, [pageSize, currentPage, participantIds, localSessionId, currentIds]);

	useCamSubscriptions(
		camSubscriptions?.subscribedIds,
		camSubscriptions?.stagedIds
	);

	const { updateReceiveSettings } = useReceiveSettings();

	useEffect(() => {
		if (topology !== 'sfu') return;
		const timeout = setTimeout(() => {
			const count = currentIds.length;
			const layer = count < 5 ? 2 : count < 10 ? 1 : 0;

			const hasPoorNetwork = ['low', 'very-low'].includes(threshold);

			const receiveSettings = currentIds.reduce<DailyReceiveSettings>(
				(settings, id) => {
					if (id === localSessionId) return settings;
					if (hasPoorNetwork) {
						settings[id] = { video: { layer: 0 } };
					} else {
						settings[id] = { video: { layer } };
					}
					return settings;
				},
				{}
			);

			if (Object.keys(receiveSettings).length === 0) return;
			updateReceiveSettings(receiveSettings);
		}, 250);
		return () => {
			clearTimeout(timeout);
		};
	}, [currentIds, threshold, localSessionId, topology, updateReceiveSettings]);

	const tiles = useMemo(() => {
		if (currentIds.length > 0) {
			return (
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
					{currentIds.map((participantId) => (
						<Tile
							sessionId={participantId}
							key={participantId}
							showBorder={currentIds.length > 1}
						/>
					))}
				</Flex>
			);
		} else
			return (
				<Box>
					<h3>Please wait till a host joins your call</h3>
				</Box>
			);
	}, [currentIds]);

	return (
		<Box
			css={{
				position: 'relative',
				height: '100%',
				width: '100%',
				flex: 1,
			}}
		>
			<Flex
				ref={viewRef}
				css={{
					position: 'relative',
					width: '100%',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{totalPages > 1 && currentPage > 1 && (
					<PaginationButton onClick={prevPage} />
				)}
				{tiles}
				{totalPages > 1 && currentPage < totalPages && (
					<PaginationButton isPrev={false} onClick={nextPage} />
				)}
				<ToastViewport />
			</Flex>
		</Box>
	);
};
