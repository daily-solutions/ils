import { DailyEventObject } from '@daily-co/daily-js';
import { useDaily, useThrottledDailyEvent } from '@daily-co/daily-react';
import React, { memo, useCallback, useEffect } from 'react';

import { usePresence } from '../../hooks/usePresence';
import { useMeetingState } from '../../state';
import { ToastContainer } from './ToastContainer';

export const ILSContainer = memo(
  ({ children }: React.PropsWithChildren<{}>) => {
    usePresence();
    const daily = useDaily();
    const [meetingState, setMeetingState] = useMeetingState();

    useThrottledDailyEvent(
      ['joining-meeting', 'joined-meeting', 'left-meeting'],
      useCallback(
        (
          events: DailyEventObject<
            'joining-meeting' | 'joined-meeting' | 'left-meeting'
          >[]
        ) => {
          if (!events.length) return;
          events.forEach((ev) => {
            switch (ev.action) {
              case 'joining-meeting':
                setMeetingState('joining-meeting');
                break;
              case 'joined-meeting':
                setMeetingState('joined-meeting');
                break;
              case 'left-meeting':
                setMeetingState('left-meeting');
                break;
            }
          });
        },
        [setMeetingState]
      )
    );

    const handlePreAuth = useCallback(async () => {
      if (!daily) return;

      // @ts-ignore
      const { token, url } = daily.properties;
      await daily.preAuth({ url, token });
      setMeetingState('lobby');
    }, [daily, setMeetingState]);

    useEffect(() => {
      if (!daily || meetingState !== 'new') return;

      handlePreAuth();
    }, [daily, handlePreAuth, meetingState]);

    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  }
);

ILSContainer.displayName = 'ILSContainer';
