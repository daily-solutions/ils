import React, { useMemo } from 'react';

import { useMeetingState } from '../../state';
import { Loader } from '../../ui';
import { Haircheck } from '../Haircheck';
import { ILSContainer } from '../ILSContainer';
import { LeftMeeting } from '../Left';
import { Stream } from '../Stream';

export const CallUI = () => {
  const [meetingState] = useMeetingState();

  const callUI = useMemo(() => {
    switch (meetingState) {
      case 'lobby':
        return <Haircheck />;
      case 'joining-meeting':
        return <Loader />;
      case 'joined-meeting':
        return <Stream />;
      case 'left-meeting':
        return <LeftMeeting />;
      default:
        return <Loader />;
    }
  }, [meetingState]);

  return <ILSContainer>{callUI}</ILSContainer>;
};
