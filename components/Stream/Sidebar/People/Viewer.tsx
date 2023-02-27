import React, { memo, useCallback, useMemo } from 'react';

import { useParticipantCounts } from '../../../../hooks/useParticipantCount';
import { useStage } from '../../../../hooks/useStage';
import { Button, Flex, Icon, Menu, Text } from '../../../../ui';

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

  const { present } = useParticipantCounts();
  const disableBringToStage = useMemo(() => present >= 6, [present]);

  const menuItems = [
    {
      label: 'Invite to stage',
      onSelect: handleBringToStage,
      disabled: disableBringToStage,
    },
  ];

  return (
    <Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Text>{userName ?? 'Guest'}</Text>
      <Menu items={menuItems}>
        <Button size="pagination" variant="ghost">
          <Icon icon="more" />
        </Button>
      </Menu>
    </Flex>
  );
});

Viewer.displayName = 'Viewer';
