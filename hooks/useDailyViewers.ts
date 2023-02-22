import { DailyParticipant } from '@daily-co/daily-js';
import {
  useLocalSessionId,
  useParticipantIds,
  useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback, useEffect } from 'react';

import { PresenceParticipant, useViewers } from '../contexts/UIState';
import { useParticipantCounts } from './useParticipantCount';

export const useDailyViewers = () => {
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');

  const participantIds = useParticipantIds({
    filter: useCallback(
      (p: DailyParticipant) =>
        Boolean(
          p?.permissions?.canSend &&
            (p.owner || (p?.userData as any)?.['onStage'])
        ),
      []
    ),
  });
  const { hidden } = useParticipantCounts();
  const [, setViewers] = useViewers();

  const handleViewers = useCallback(
    (presenceParticipants: PresenceParticipant[]) => {
      const viewers = presenceParticipants.filter(
        (p) => !participantIds.includes(p.id)
      );
      setViewers(viewers);
    },
    [participantIds, setViewers]
  );

  useEffect(() => {
    if (!isOwner) return;

    let timeout: ReturnType<typeof setTimeout>;
    const fetchPresenceData = async () => {
      const presenceRes = await fetch(`${window.location.origin}/api/presence`);
      const { participants } = await presenceRes.json();
      handleViewers(participants);
    };

    if (hidden > 0) {
      fetchPresenceData();
      timeout = setTimeout(fetchPresenceData, 5000);
    } else handleViewers([]);

    return () => {
      clearTimeout(timeout);
    };
  }, [handleViewers, hidden, isOwner]);
};
