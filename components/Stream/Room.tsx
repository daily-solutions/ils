import { DailyAudio } from '@daily-co/daily-react';
import dynamic from 'next/dynamic';
import React from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Flex } from '../../ui/Flex';
import { Loader } from '../../ui/Loader';
import { Modals } from '../Modal';
import { EmojiReactions } from './EmojiReactions';
import { Sidebar } from './Sidebar';
import { Tray } from './Tray';
import { View } from './View';

const MobileView = dynamic(() => import('.//MobileView'), {
  loading: () => <Loader />,
});

export const Room = () => {
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
