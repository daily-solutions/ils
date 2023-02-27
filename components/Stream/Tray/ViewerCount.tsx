import Image from 'next/image';
import React from 'react';

import { useParticipantCounts } from '../../../hooks/useParticipantCount';
import eye from '../../../public/eye.svg';
import { Badge, Flex, Text } from '../../../ui';

interface Props {
  isMobile?: boolean;
}

export const ViewerCount = ({ isMobile = false }: Props) => {
  const { hidden } = useParticipantCounts();
  return (
    <Badge color="dark">
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '$1',
        }}
      >
        <Image src={eye} alt="Eye" />
        <Flex
          css={{
            px: '$3',
            flexFlow: 'column wrap',
            gap: '$1',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!isMobile && (
            <Text
              size={0}
              css={{
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '$semibold',
              }}
            >
              Viewers
            </Text>
          )}
          <Text size={1}>{hidden.toLocaleString('en-US')}</Text>
        </Flex>
      </Flex>
    </Badge>
  );
};
