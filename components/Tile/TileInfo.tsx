import { useParticipantProperty } from '@daily-co/daily-react';
import { memo } from 'react';

import { Flex, Text } from '../../ui';

interface Props {
  sessionId: string;
  isSpeaking: boolean;
  isMobile?: boolean;
}

export const TileInfo = memo(
  ({ isMobile = false, isSpeaking, sessionId }: Props) => {
    const [userName, isLocal] = useParticipantProperty(sessionId, [
      'user_name',
      'local',
    ]);

    return (
      <Flex
        css={{
          ...(isMobile ? { top: 12 } : { bottom: 12 }),
          position: 'absolute',
          left: 12,
          background: isSpeaking ? '$yellow' : '$tileInfo',
          color: isSpeaking ? '$yellowText' : '$background',
          br: '$m',
          p: '$3',
          fontSize: '$1',
        }}
      >
        <Text size={2} css={{ fontWeight: '$semibold' }}>
          {userName ?? 'Guest'} {isLocal && '(You)'}
        </Text>
      </Flex>
    );
  }
);

TileInfo.displayName = 'TileInfo';
