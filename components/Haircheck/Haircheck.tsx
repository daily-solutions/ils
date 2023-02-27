import {
  useDaily,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import DailyLogo from '../../public/Logo.png';
import { useMeetingState } from '../../state';
import { Card, Flex, Text } from '../../ui';
import { NameSetup } from './NameSetup';
import { Setup } from './Setup';

export const Haircheck = () => {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const hasPermission = useParticipantProperty(
    localSessionId as string,
    'permissions.hasPresence'
  );
  const [state, setState] = useState<'name' | 'setup'>('name');
  const [, setMeetingState] = useMeetingState();
  const md = useMediaQuery('(min-width: 800px)');

  const onContinue = useCallback(() => {
    if (!daily) return;

    if (hasPermission) setState('setup');
    else {
      setMeetingState('joining-meeting');
      daily.join();
    }
  }, [daily, hasPermission, setMeetingState]);

  return (
    <Flex
      css={{
        width: '100dvw',
        height: '100dvh',
        background: '$secondary',
      }}
    >
      <Flex
        css={{
          position: 'absolute',
          top: 30,
          p: '$3',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '$3',
        }}
      >
        <Image src={DailyLogo} alt="Daily Logo" />
        <Text css={{ color: '$muted', fontSize: '$6', fontWeight: '$normal' }}>
          ILS Workshop Stream
        </Text>
      </Flex>
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Card
          css={{
            maxWidth: state === 'name' ? 330 : md ? 460 : '95%',
            width: '100%',
            padding: 0,
          }}
        >
          {state === 'name' && (
            <NameSetup hasPermission={hasPermission} onContinue={onContinue} />
          )}
          {state === 'setup' && <Setup />}
        </Card>
      </Flex>
    </Flex>
  );
};
