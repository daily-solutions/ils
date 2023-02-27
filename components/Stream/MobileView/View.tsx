import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useParticipants } from '../../../hooks/useParticipants';
import { useResizeObserver } from '../../../hooks/useResizeObserver';
import { useVideoGrid } from '../../../hooks/useVideoGrid';
import { Flex, Grid } from '../../../ui';
import { Tile } from '../../Tile';
import { PaginationButton } from '../PaginationButton';
import { StartingSoon } from '../StartingSoon';

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
    return <StartingSoon />;
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
