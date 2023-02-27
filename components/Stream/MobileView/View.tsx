import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useParticipants } from '../../../hooks/useParticipants';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { useVideoGrid } from '../../../hooks/useVideoGrid';
import { Box, Flex, Grid, Text } from '../../../ui';
import { Tile } from '../../Tile';
import { PaginationButton } from '../PaginationButton';

const DEFAULT_MOBILE_ASPECT_RATIO = 4 / 3;

export const View = () => {
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
    currentIds,
    currentPage,
    nextPage,
    prevPage,
    rows,
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

  const tiles = useMemo(() => {
    if (currentIds.length > 0) {
      return (
        <Grid
          css={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            width: '100%',
            height: '100%',
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
              css={{ width: '100%', height: '100%' }}
            />
          ))}
        </Grid>
      );
    }
    return (
      <Flex
        css={{
          flexFlow: 'column wrap',
          gap: '$3',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          css={{ background: 'rgba(18, 26, 36, 0.2)', p: '$3 $4', br: '$sm' }}
        >
          <Text size={5} css={{ fontWeight: '$semibold' }}>
            Waiting for the host to join
          </Text>
        </Box>
        <Box
          css={{ background: 'rgba(18, 26, 36, 0.2)', p: '$3 $4', br: '$sm' }}
        >
          <Text>Stream starting soon</Text>
        </Box>
      </Flex>
    );
  }, [columns, currentIds, rows]);

  return (
    <Flex
      ref={viewRef}
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100dvw',
        height: '100dvh',
        background: currentIds.length > 0 ? 'inherit' : '$muted',
        color: currentIds.length > 0 ? 'inherit' : '$background',
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
