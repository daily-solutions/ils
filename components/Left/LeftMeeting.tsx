import React from 'react';

import Card from '../../ui/Card';
import { Flex } from '../../ui/Flex';

export const LeftMeeting = () => {
  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100dvw',
        height: '100dvh',
      }}
    >
      <Card>You left the meeting</Card>
    </Flex>
  );
};
