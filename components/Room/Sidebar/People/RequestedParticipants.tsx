import React, { useMemo } from 'react';

import { useStage } from '../../../../hooks/useStage';
import { Box } from '../../../../ui/Box';
import { Flex } from '../../../../ui/Flex';
import { Text } from '../../../../ui/Text';
import { Viewer } from './Viewers';

interface Viewer {
  id: string;
  userName: string;
}

export const RequestedParticipants = () => {
  const { requestedParticipants } = useStage();
  const participants = useMemo(
    () => Object.values(requestedParticipants),
    [requestedParticipants]
  );

  return (
    <Box css={{ p: '$4' }}>
      {participants.length > 0 ? (
        <Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
          {participants.map((v) => (
            <Viewer {...v} key={v.id} />
          ))}
        </Flex>
      ) : (
        <Text>No requested participants in the call</Text>
      )}
    </Box>
  );
};
