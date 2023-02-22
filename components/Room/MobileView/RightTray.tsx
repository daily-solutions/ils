import React, { useCallback } from 'react';

import { usePoll, useSidebar } from '../../../contexts/UIState';
import { Flex } from '../../../ui/Flex';
import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const RightTray = () => {
  const [, setPoll] = usePoll();
  const [, setSidebar] = useSidebar();
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
      <Flex css={{ flexFlow: 'column', gap: '$4', color: '$dark' }}>
        <TrayButton
          variant="transparent"
          label="Chat"
          onClick={() => setSidebar((s) => (s ? null : 'chat'))}
        >
          <Icon icon="chat" />
        </TrayButton>
        <TrayButton
          variant="transparent"
          label="Poll"
          onClick={() => setPoll((p) => !p)}
        >
          <Icon icon="poll" />
        </TrayButton>
        <TrayButton variant="transparent" label="Share" onClick={handleShare}>
          <Icon icon="share" />
        </TrayButton>
      </Flex>
    </Flex>
  );
};
