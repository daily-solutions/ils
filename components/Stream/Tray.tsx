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
import { ChatControl } from './Tray/ChatControl';
import { PollControl } from './Tray/PollControl';
import { ReactionsControl } from './Tray/ReactionsControl';
import { RecordingControl } from './Tray/RecordingControl';
import { RequestStageControl } from './Tray/RequestStageControl';
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
        <ChatControl />
        <PollControl />
        <RecordingControl />
      </Flex>
      <Divider direction="vertical" />
      <Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
        <ReactionsControl />
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
      <ChatControl />
      <ReactionsControl />
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
      <Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$4' }}>
        <RequestStageControl />
        {!isOwner && <Divider direction="vertical" />}
        <ViewerCount />
      </Flex>
    </Flex>
  );
};
