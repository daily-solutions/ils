import React, { useMemo } from 'react';

import { useStage } from '../../../../hooks/useStage';
import { Box, Flex, Text } from '../../../../ui';
import { RequestedViewer } from './RequestedViewer';

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
            <RequestedViewer {...v} key={v.id} />
          ))}
        </Flex>
      ) : (
        <Text>No requested participants in the call</Text>
      )}
    </Box>
  );
};
