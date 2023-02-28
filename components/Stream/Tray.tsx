import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import Image from 'next/image';
import React from 'react';

import { useIsOnStage } from '../../hooks/useIsOnStage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Logo from '../../public/Logo.png';
import { Divider, Flex } from '../../ui';
import { AudioControl } from './Tray/AudioControl';
import { SettingsControl } from './Tray/SettingsControl';
import { VideoControl } from './Tray/VideoControl';
import { ViewerCount } from './Tray/ViewerCount';

const OnStageTray = () => {
  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: '$4',
      }}
    >
      <Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
        <VideoControl />
        <AudioControl />
      </Flex>
      <Divider direction="vertical" />
      <Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
        <SettingsControl />
      </Flex>
    </Flex>
  );
};

const ViewerTray = () => {
  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: '$2',
      }}
    >
      <SettingsControl />
    </Flex>
  );
};

export const Tray = () => {
  const isOnStage = useIsOnStage();
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');
  const md = useMediaQuery('(min-width: 800px)');

  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'space-between',
        p: '$5',
        height: '80px',
        width: '100%',
      }}
    >
      {md && <Image src={Logo} alt="Daily Logo" />}
      {isOnStage ? <OnStageTray /> : <ViewerTray />}
      <Flex
        css={{ alignItems: 'center', justifyContent: 'center', gap: '$4' }}
      ></Flex>
    </Flex>
  );
};
