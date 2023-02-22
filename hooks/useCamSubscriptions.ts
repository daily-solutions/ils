import {
  DailyParticipantUpdateOptions,
  DailyTrackSubscriptionState,
} from '@daily-co/daily-js';
import {
  useDaily,
  useLocalSessionId,
  useNetwork,
  useParticipantIds,
} from '@daily-co/daily-react';
import { deepEqual } from 'fast-equals';
import { useCallback, useRef } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';

const SUBSCRIBE_OR_STAGE_ALL_VIDEO_THRESHOLD = 9;

export const useCamSubscriptions = (
  subscribedIds: string[],
  stagedIds: string[] = [],
  throttle: number = 50
) => {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const { topology } = useNetwork();

  const lastSubscriptions = useRef<
    Record<string, DailyParticipantUpdateOptions>
  >({});

  const updateCamSubscriptions = useCallback(
    (subscribedIds: string[], stagedIds: string[] = []) => {
      if (!daily) return;

      // If total number of remote participants is less than a threshold, simply
      // stage all remote cams that aren't already marked for subscription.
      // Otherwise, honor the provided stagedIds, with recent speakers appended
      // who aren't already marked for subscription.
      if (
        remoteParticipantIds.length <= SUBSCRIBE_OR_STAGE_ALL_VIDEO_THRESHOLD
      ) {
        stagedIds = remoteParticipantIds.filter(
          (id) => !subscribedIds.includes(id)
        );
      }

      const updates = remoteParticipantIds.reduce<
        Record<string, DailyParticipantUpdateOptions>
      >((u, id) => {
        let desiredSubscription: DailyTrackSubscriptionState;
        const currentSubscription =
          daily.participants()?.[id]?.tracks?.video?.subscribed;

        if (!id || id === localSessionId) return u;

        if (subscribedIds.includes(id) || topology !== 'sfu') {
          desiredSubscription = true;
        } else if (stagedIds.includes(id)) {
          desiredSubscription = 'staged';
        } else {
          desiredSubscription = false;
        }

        if (desiredSubscription === currentSubscription) return u;

        u[id] = {
          setSubscribedTracks: {
            video: desiredSubscription,
          },
        };
        return u;
      }, {});

      if (Object.keys(updates).length === 0) return;
      if (deepEqual(updates, lastSubscriptions.current)) return;
      lastSubscriptions.current = { ...updates };
      daily.updateParticipants(updates);
    },
    [daily, localSessionId, remoteParticipantIds, topology]
  );

  useDeepCompareEffect(() => {
    if (!subscribedIds || !stagedIds) return;
    const timeout = setTimeout(() => {
      updateCamSubscriptions(subscribedIds, stagedIds);
    }, throttle);
    return () => {
      clearTimeout(timeout);
    };
  }, [subscribedIds, stagedIds, throttle, updateCamSubscriptions]);
};
