import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useMemo } from 'react';

import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { useParticipants } from '../../../hooks/useParticipants';
import { useReactions } from '../../../hooks/useReactions';
import { useStage } from '../../../hooks/useStage';
import { Emoji, useInviteToJoin } from '../../../state';
import { Button, Flex } from '../../../ui';
import { TrayButton } from '../../TrayButton';
import { AudioControl } from '../Tray/AudioControl';
import { PeopleControl } from '../Tray/PeopleControl';
import { ReactionsControl } from '../Tray/ReactionsControl';
import { SettingsControl } from '../Tray/SettingsControl';
import { VideoControl } from '../Tray/VideoControl';

const mobileEmojis: Emoji[] = ['❤️', '👍', '🔥'];

export const BottomTray = () => {
  const { react } = useReactions();

  const localSessionId = useLocalSessionId();
  const [userData, isOwner] = useParticipantProperty(localSessionId as string, [
    'userData',
    'owner',
  ]);
  const isOnStage = useIsOnStage();
  const [, setInvited] = useInviteToJoin();
  const participantIds = useParticipants();

  const isInvited = useMemo(() => (userData as any)?.invited, [userData]);

  const {
    cancelRequestToJoinStage,
    isRequesting,
    leaveStage,
    requestToJoinStage,
  } = useStage();

  const handleToggleRequest = useCallback(
    () =>
      isOnStage
        ? leaveStage()
        : isInvited
        ? setInvited(true)
        : isRequesting
        ? cancelRequestToJoinStage()
        : requestToJoinStage(),
    [
      cancelRequestToJoinStage,
      isInvited,
      isOnStage,
      isRequesting,
      leaveStage,
      requestToJoinStage,
      setInvited,
    ]
  );

  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: isOwner ? 'center' : 'space-between',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        p: '$3',
      }}
    >
      <Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$2' }}>
        {isOnStage ? (
          <Flex css={{ alignItems: 'center', gap: '$2' }}>
            <VideoControl />
            <AudioControl />
            <PeopleControl />
            <ReactionsControl />
            <SettingsControl />
          </Flex>
        ) : (
          mobileEmojis.map((e) => (
            <TrayButton variant="outline" key={e} onClick={() => react(e)}>
              {e}
            </TrayButton>
          ))
        )}
      </Flex>
      {!isOwner && (
        <Button
          rounded
          size={isOnStage ? 'small' : 'medium'}
          variant={isOnStage || isRequesting ? 'danger' : 'primary'}
          onClick={handleToggleRequest}
          disabled={participantIds.length === 0}
        >
          {isOnStage
            ? 'Leave stage'
            : isInvited
            ? 'Join'
            : isRequesting
            ? 'Cancel join request'
            : 'Join the stage'}
        </Button>
      )}
    </Flex>
  );
};
