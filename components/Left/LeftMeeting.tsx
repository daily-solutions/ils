import React from 'react';

import { Card, Flex } from '../../ui';

export const LeftMeeting = () => {
  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100dvw',
        height: '100dvh',
        background: '$secondary',
      }}
    >
      <Card>You left the meeting</Card>
    </Flex>
  );
};
