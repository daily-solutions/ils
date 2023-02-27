import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useMemo } from 'react';

import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { useParticipants } from '../../../hooks/useParticipants';
import { useStage } from '../../../hooks/useStage';
import { useInviteToJoin } from '../../../state';
import { Button } from '../../../ui';

export const RequestStageControl = () => {
  const localSessionId = useLocalSessionId();
  const [isOwner, userData] = useParticipantProperty(localSessionId as string, [
    'owner',
    'userData',
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
    () => (isRequesting ? cancelRequestToJoinStage() : requestToJoinStage()),
    [cancelRequestToJoinStage, isRequesting, requestToJoinStage]
  );

  if (isOwner) return null;

  if (isInvited)
    return (
      <Button variant="primary" onClick={() => setInvited(true)}>
        Join
      </Button>
    );

  if (isOnStage)
    return (
      <Button variant="danger" onClick={leaveStage}>
        Leave stage
      </Button>
    );

  return (
    <Button
      variant={isRequesting ? 'warning' : 'primary'}
      onClick={handleToggleRequest}
      disabled={participantIds.length === 0}
    >
      {isRequesting ? 'Cancel join request' : 'Join the stage'}
    </Button>
  );
};
