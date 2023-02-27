import { DailyAudio } from '@daily-co/daily-react';
import React from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Flex } from '../../ui';
import { Modals } from '../Modal';
import { EmojiReactions } from './EmojiReactions';
import { MobileView } from './MobileView';
import { Sidebar } from './Sidebar';
import { Tray } from './Tray';
import { View } from './View';

export const Stream = () => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  return (
    <>
      {isMobile ? (
        <MobileView />
      ) : (
        <Flex css={{ width: '100dvw', height: '100dvh' }}>
          <Flex
            css={{
              flexDirection: 'column',
              flex: 1,
              width: '100%',
              height: '100%',
            }}
          >
            <View />
            <Tray />
          </Flex>
          <Sidebar />
        </Flex>
      )}
      <DailyAudio />
      <EmojiReactions />
      <Modals />
    </>
  );
};
