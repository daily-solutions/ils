import React, { memo, useCallback } from 'react';

import { useViewers } from '../../../../contexts/UIState';
import { useStage } from '../../../../hooks/useStage';
import { Box } from '../../../../ui/Box';
import { Button } from '../../../../ui/Button';
import { Flex } from '../../../../ui/Flex';
import { Text } from '../../../../ui/Text';

interface Viewer {
  id: string;
  userName: string;
}

export const Viewer = memo(({ id, userName }: Viewer) => {
  const { bringToStage } = useStage();
  const handleBringToStage = useCallback(
    () => bringToStage(id),
    [bringToStage, id]
  );

  return (
    <Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Text>{userName ?? 'Guest'}</Text>
      <Button onClick={handleBringToStage} size="small">
        Bring to stage
      </Button>
    </Flex>
  );
});

Viewer.displayName = 'Viewer';

export const Viewers = () => {
  const [viewers] = useViewers();
  return (
    <Box css={{ p: '$4' }}>
      {viewers.length > 0 ? (
        <Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
          {viewers.map((v) => (
            <Viewer {...v} key={v.id} />
          ))}
        </Flex>
      ) : (
        <Text>No viewers in the call</Text>
      )}
    </Box>
  );
};
