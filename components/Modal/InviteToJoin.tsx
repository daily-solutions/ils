import {
  useDaily,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useInviteToJoin } from '../../state';
import { Box, Button, Dialog, DialogContent, Flex } from '../../ui';
import { Devices } from '../Haircheck/Devices';
import { AudioControl, VideoControl } from '../Stream';
import { Tile } from '../Tile';

export const InviteToJoin = () => {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const userData = useParticipantProperty(localSessionId as string, 'userData');
  const [show, setShow] = useInviteToJoin();
  const isMobile = useMediaQuery('(max-width: 480px)');

  const handleJoin = useCallback(() => {
    if (!daily) return;

    daily.setUserData({ ...(userData as any), invited: false, onStage: true });
    setShow(false);
  }, [daily, setShow, userData]);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent title="Invited to join stage">
        <Box css={{ p: '$5' }}>
          <Tile
            fit="cover"
            aspectRatio={isMobile ? 4 / 3 : 16 / 9}
            sessionId={localSessionId as string}
          />
          <Flex
            css={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: '$4',
            }}
          >
            <Flex css={{ gap: '$2' }}>
              <VideoControl ignoreOnStage />
              <AudioControl ignoreOnStage />
            </Flex>
            <Button onClick={handleJoin}>Join</Button>
          </Flex>
          <Box css={{ p: '$4 $2' }}>
            <Devices speaker={false} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
