import Image from 'next/image';
import React from 'react';

import { useParticipants } from '../../hooks/useParticipants';
import Logo from '../../public/daily.svg';
import { Box, Flex, Text } from '../../ui';

export const StartingSoon = () => {
  const participantIds = useParticipants();

  return (
    <Flex
      css={{
        width: '100%',
        height: '100%',
        position: 'relative',
        flexFlow: 'column wrap',
        gap: '$3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9px',
        background: participantIds.length > 0 ? 'inherit' : '$muted',
        color: participantIds.length > 0 ? 'inherit' : '$background',
      }}
    >
      <Box css={{ position: 'absolute' }}>
        <Image src={Logo} alt="Daily Logo" />
      </Box>
      <Box
        css={{
          background: 'rgba(18, 26, 36, 0.2)',
          p: '$3 $4',
          zIndex: 1,
        }}
      >
        <Text size={5} css={{ fontWeight: '$semibold' }}>
          Waiting for the host to join
        </Text>
      </Box>
      <Box
        css={{
          background: 'rgba(18, 26, 36, 0.2)',
          p: '$3 $4',
          br: '$sm',
          zIndex: 1,
        }}
      >
        <Text>Stream starting soon</Text>
      </Box>
    </Flex>
  );
};
