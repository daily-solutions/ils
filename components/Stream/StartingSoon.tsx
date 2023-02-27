import Image from 'next/image';
import React from 'react';

import Logo from '../../public/daily.svg';
import { Box, Flex, Text } from '../../ui';

export const StartingSoon = () => {
  return (
    <Flex
      css={{
        position: 'relative',
        flexFlow: 'column wrap',
        gap: '$3',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box css={{ position: 'absolute' }}>
        <Image src={Logo} alt="Daily Logo" />
      </Box>
      <Box
        css={{
          background: 'rgba(18, 26, 36, 0.2)',
          p: '$3 $4',
          br: '$sm',
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
