import { useLocalSessionId } from '@daily-co/daily-react';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { useCamSubscriptions } from '../../../hooks/useCamSubscriptions';
import { useParticipants } from '../../../hooks/useParticipants';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { useVideoGrid } from '../../../hooks/useVideoGrid';
import { Box } from '../../../ui/Box';
import { Flex } from '../../../ui/Flex';
import { Tile } from '../../Tile';
import { PaginationButton } from '../PaginationButton';

const DEFAULT_MOBILE_ASPECT_RATIO = 4 / 3;

export const View = () => {
	const localSessionId = useLocalSessionId();
	const viewRef = useRef<HTMLDivElement>(null);
	const participantIds = useParticipants();

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
		tileAspectRatio: DEFAULT_MOBILE_ASPECT_RATIO,
		minTileWidth: 200,
		gap: 0,
		sessionIds: participantIds,
		minCountPerPage: 1,
		maxCountPerPage: 2,
	});

	useEffect(() => {
		if (!viewRef.current) return;
		viewRef.current.style.setProperty('--grid-gap', '0px');
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
							fit="cover"
							aspectRatio={DEFAULT_MOBILE_ASPECT_RATIO}
							sessionId={participantId}
							key={participantId}
							showBorder={currentIds.length > 1}
							isMobile
						/>
					))}
				</Flex>
			);
		} else
			return (
				<Box>
					<h4>Please wait till a host joins your call</h4>
				</Box>
			);
	}, [currentIds]);

	return (
		<Flex
			ref={viewRef}
			css={{
				alignItems: 'center',
				justifyContent: 'center',
				width: '100dvw',
				height: '100dvh',
			}}
		>
			{totalPages > 1 && currentPage > 1 && (
				<PaginationButton onClick={prevPage} />
			)}
			{tiles}
			{totalPages > 1 && currentPage < totalPages && (
				<PaginationButton isPrev={false} onClick={nextPage} />
			)}
		</Flex>
	);
};
