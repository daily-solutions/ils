import {
  useDaily,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { memo, useCallback } from 'react';

import { useParticipants } from '../../../../hooks/useParticipants';
import { useStage } from '../../../../hooks/useStage';
import { useViewers } from '../../../../state';
import { Badge, Button, Flex, Icon, Menu, Text } from '../../../../ui';
import { Viewer } from './Viewer';

interface ParticipantProps {
  sessionId: string;
}

const Participant = memo(({ sessionId }: ParticipantProps) => {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const isLocalOwner = useParticipantProperty(
    localSessionId as string,
    'owner'
  );
  const [userName, owner, local] = useParticipantProperty(sessionId, [
    'user_name',
    'owner',
    'local',
  ]);

  const { removeFromStage } = useStage();
  const handleRemoveFromStage = useCallback(
    () => removeFromStage(sessionId),
    [removeFromStage, sessionId]
  );

  const handleRemove = useCallback(() => {
    if (!daily || !isLocalOwner) return;

    daily.updateParticipant(sessionId, { eject: true });
  }, [daily, isLocalOwner, sessionId]);

  const menuItems = [
    {
      label: 'Remove from stage',
      onSelect: handleRemoveFromStage,
    },
    {
      label: 'Kick',
      onSelect: handleRemove,
    },
  ];

  return (
    <Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Text>
        {userName ?? 'Guest'} {local && '(you)'}
      </Text>
      {owner ? (
        <Badge size={1}>Owner</Badge>
      ) : (
        isLocalOwner && (
          <Menu items={menuItems}>
            <Button size="pagination" variant="ghost">
              <Icon icon="more" />
            </Button>
          </Menu>
        )
      )}
    </Flex>
  );
});

Participant.displayName = 'Participant';

export const Participants = () => {
  const participantIds = useParticipants(true, 'user_name');
  const invitedIds = useParticipants(false, 'user_name');
  const [viewers] = useViewers();

  return (
    <Flex css={{ flexFlow: 'column wrap' }}>
      <Flex css={{ flexFlow: 'column wrap', p: '$4', rowGap: '$5' }}>
        <Flex css={{ flexFlow: 'column wrap' }}>
          <Text size={0} css={{ color: '$muted', textTransform: 'uppercase' }}>
            Presenters
          </Text>
          <Flex css={{ flexFlow: 'column wrap', rowGap: '$3', mt: '$3' }}>
            {participantIds.length > 0 ? (
              participantIds.map((p) => <Participant sessionId={p} key={p} />)
            ) : (
              <Text>No participants in the call</Text>
            )}
          </Flex>
        </Flex>
        {invitedIds.length > 0 && (
          <Flex css={{ flexFlow: 'column wrap' }}>
            <Text size={0} css={{ color: '$muted' }}>
              Invited Participants
            </Text>
            <Flex css={{ flexFlow: 'column wrap', rowGap: '$3', mt: '$2' }}>
              {invitedIds.map((p) => (
                <Participant sessionId={p} key={p} />
              ))}
            </Flex>
          </Flex>
        )}
        {viewers.length > 0 && (
          <Flex css={{ flexFlow: 'column wrap' }}>
            <Text
              size={0}
              css={{ color: '$muted', textTransform: 'uppercase' }}
            >
              Viewers
            </Text>
            <Flex css={{ flexFlow: 'column wrap', rowGap: '$3', mt: '$3' }}>
              {viewers.map((p) => (
                <Viewer key={p.id} {...p} />
              ))}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
