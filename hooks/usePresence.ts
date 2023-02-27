import {
  DailyEventObjectParticipantCounts,
  DailyParticipant,
} from '@daily-co/daily-js';
import {
  useDailyEvent,
  useLocalSessionId,
  useParticipantIds,
  useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback } from 'react';

import { PresenceParticipant, useViewers } from '../contexts/UIState';

export const usePresence = () => {
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
  const [, setViewers] = useViewers();

  const handleViewers = useCallback(
    (presenceParticipants: PresenceParticipant[]) => {
      // presence contains list of every participant including active & viewers
      // filtering to get the viewers list.
      const viewers = presenceParticipants.filter(
        (p) => !participantIds.includes(p.id)
      );
      setViewers(viewers);
    },
    [participantIds, setViewers]
  );

  const fetchPresence = useCallback(async () => {
    const presenceRes = await fetch(`${window.location.origin}/api/presence`);
    const { participants } = await presenceRes.json();
    handleViewers(participants);
  }, [handleViewers]);

  useDailyEvent(
    'participant-counts-updated',
    useCallback(
      (ev: DailyEventObjectParticipantCounts) => {
        if (!isOwner) return;

        // fetch presence only when hidden participants are available.
        if (ev.participantCounts.hidden > 0) fetchPresence();
        // when there are no hidden participants then we wouldn't be needing to
        // fetch the presence.
        else handleViewers([]);
      },
      [fetchPresence, handleViewers, isOwner]
    )
  );
};
