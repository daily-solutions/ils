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

import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useVideoGrid } from '../../hooks/useVideoGrid';
import { Box, Flex, ToastViewport } from '../../ui';
import { Tile } from '../Tile';
import { StartingSoon } from './StartingSoon';

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

  const { columns, containerHeight, containerWidth, currentIds } = useVideoGrid(
    {
      width: dimensions.width,
      height: dimensions.height,
      minTileWidth: 280,
      gap: 1,
      sessionIds: participantIds,
      maxCountPerPage: 6,
    }
  );

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.style.setProperty('--grid-gap', '1px');
    viewRef.current.style.setProperty('--grid-columns', columns.toString());
    viewRef.current.style.setProperty('--grid-width', `${containerWidth}px`);
    viewRef.current.style.setProperty('--grid-height', `${containerHeight}px`);
  }, [columns, containerHeight, containerWidth]);

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
              css={{ borderRadius: '9px' }}
            />
          ))}
        </Flex>
      );
    }
    return <StartingSoon />;
  }, [currentIds]);

  return (
    <Box
      css={{
        position: 'relative',
        height: '100%',
        width: '100%',
        flex: 1,
        p: '$4',
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
        {tiles}
        <ToastViewport />
      </Flex>
    </Box>
  );
};
