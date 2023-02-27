import Avatar from 'boring-avatars';
import React, { memo, useCallback, useMemo } from 'react';

import { useParticipantCounts } from '../../../../hooks/useParticipantCount';
import { useStage } from '../../../../hooks/useStage';
import { Button, Flex, Text } from '../../../../ui';

interface Viewer {
  id: string;
  userName: string;
  avatar: string;
}

export const RequestedViewer = memo(({ avatar, id, userName }: Viewer) => {
  const { bringToStage, denyRequestToJoin } = useStage();
  const accept = useCallback(() => bringToStage(id), [bringToStage, id]);
  const deny = useCallback(
    () => denyRequestToJoin(id),
    [id, denyRequestToJoin]
  );

  const { present } = useParticipantCounts();
  const disableBringToStage = useMemo(() => present >= 6, [present]);

  return (
    <Flex css={{ gap: '$4' }}>
      <Avatar
        variant="beam"
        size={36}
        name={avatar}
        colors={['#1BEBB9', '#00C9DF', '#2B3F56', '#D1FBF1']}
      />
      <Flex css={{ flexFlow: 'column wrap', gap: '$2' }}>
        <Text css={{ fontWeight: '$semibold' }}>{userName ?? 'Guest'}</Text>
        <Flex css={{ gap: '$2', alignItems: 'center' }}>
          <Button size="small" disabled={disableBringToStage} onClick={accept}>
            Accept
          </Button>
          <Button
            onClick={deny}
            size="small"
            variant="danger"
            disabled={disableBringToStage}
          >
            Deny
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
});

RequestedViewer.displayName = 'RequestedViewer';
