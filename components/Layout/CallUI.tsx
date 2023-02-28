import React, { useMemo } from 'react';

import { useMeetingState } from '../../state';
import { Loader } from '../../ui';
import { ILSContainer } from '../ILSContainer';

export const CallUI = () => {
  const [meetingState] = useMeetingState();

  const callUI = useMemo(() => {
    switch (meetingState) {
      case 'lobby':
        return <div>Lobby</div>;
      case 'joining-meeting':
        console.log('joining...');
        return <Loader />;
      case 'joined-meeting':
        console.log('joined!');
        return <div>Joined!</div>;
      case 'left-meeting':
        return <div>Left</div>;
      default:
        return <Loader />;
    }
  }, [meetingState]);

  return <ILSContainer>{callUI}</ILSContainer>;
};
