import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback } from 'react';

import { usePoll, useSidebar } from '../../../state';
import { Flex, Icon } from '../../../ui';
import { TrayButton } from '../../TrayButton';

export const RightTray = () => {
  const [, setPoll] = usePoll();
  const [, setSidebar] = useSidebar();
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');

  const handleShare = useCallback(async () => {
    const sharedData = {
      title: 'Daily ILS Demo',
      text: 'Interactive Livestreaming Demo',
      url: window.location.origin,
    };
    if ('canShare' in navigator && navigator?.canShare(sharedData))
      await navigator?.share(sharedData);
  }, []);

  return (
    <Flex
      css={{
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 'auto',
        justifyContent: 'flex-end',
        bottom: 80,
        width: '100%',
        px: '$3',
      }}
    >
      <Flex css={{ flexFlow: 'column', gap: '$4', color: '$background' }}>
        <TrayButton
          variant="transparent"
          label="Chat"
          onClick={() => setSidebar((s) => (s ? null : 'chat'))}
        >
          <Icon icon="chat" size={16} color="white" />
        </TrayButton>
        <TrayButton
          variant="transparent"
          label="People"
          onClick={() => setSidebar((s) => (s ? null : 'people'))}
        >
          <Icon icon="user" size={16} color="white" />
        </TrayButton>
        {isOwner && (
          <TrayButton
            variant="transparent"
            label="Poll"
            onClick={() => setPoll((p) => !p)}
          >
            <Icon icon="poll" size={16} color="white" />
          </TrayButton>
        )}
        <TrayButton variant="transparent" label="Share" onClick={handleShare}>
          <Icon icon="share_outline" size={16} color="white" />
        </TrayButton>
      </Flex>
    </Flex>
  );
};
