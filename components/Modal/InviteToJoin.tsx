import {
  useDaily,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback } from 'react';

import { useInviteToJoin } from '../../contexts/UIState';
import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';
import { Flex } from '../../ui/Flex';
import { Modal } from '../../ui/Modal';
import { Devices } from '../Haircheck/Devices';
import { AudioControl, VideoControl } from '../Room';
import { Tile } from '../Tile';

export const InviteToJoin = () => {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const userData = useParticipantProperty(localSessionId as string, 'userData');
  const [show, setShow] = useInviteToJoin();

  const handleJoin = useCallback(() => {
    if (!daily) return;

    daily.setUserData({ ...(userData as any), invited: false, onStage: true });
    setShow(false);
  }, [daily, setShow, userData]);

  return (
    <Modal open={show} onClose={setShow} title="Invited to join stage">
      <Tile sessionId={localSessionId as string} />
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
        <Devices />
      </Box>
    </Modal>
  );
};
