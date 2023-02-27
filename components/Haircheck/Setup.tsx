import { useDaily, useDevices, useLocalSessionId } from '@daily-co/daily-react';
import React, { memo, useCallback, useEffect, useMemo } from 'react';

import { useMeetingState } from '../../contexts/UIState';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';
import { Divider } from '../../ui/Divider';
import { Flex } from '../../ui/Flex';
import { AudioControl, VideoControl } from '../Stream';
import { Tile } from '../Tile';
import { Devices } from './Devices';
import { Permissions } from './Permissions';

export const Setup = memo(() => {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const [, setMeetingState] = useMeetingState();
  const isMobile = useMediaQuery('(max-width: 480px)');

  const { camState, micState } = useDevices();

  const granted = useMemo(
    () => camState === 'granted' || micState === 'granted',
    [camState, micState]
  );

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
      {granted ? (
        <Tile
          fit="cover"
          aspectRatio={isMobile ? 4 / 3 : 16 / 9}
          sessionId={localSessionId as string}
        />
      ) : (
        <Permissions />
      )}
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '$3',
          borderTop: '1px solid $disabled',
        }}
      >
        <Flex css={{ gap: '$2' }}>
          <VideoControl disabled={!granted} />
          <AudioControl disabled={!granted} />
        </Flex>
        <Button disabled={!granted} onClick={handleJoin}>
          Join
        </Button>
      </Flex>
      {granted && (
        <>
          <Divider />
          <Box css={{ p: '$5' }}>
            <Devices />
          </Box>
        </>
      )}
    </Box>
  );
});

Setup.displayName = 'Setup';
