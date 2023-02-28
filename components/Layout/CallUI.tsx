import React, { useMemo } from 'react';

import { useMeetingState } from '../../state';
import { Loader } from '../../ui';

export const CallUI = () => {
  const [meetingState] = useMeetingState();

  const callUI = useMemo(() => {
    switch (meetingState) {
      case 'lobby':
        return 'lobby';
      case 'joining-meeting':
        return <Loader />;
      case 'joined-meeting':
        return 'joined!';
      case 'left-meeting':
        return 'left meeting';
      default:
        return <Loader />;
    }
  }, [meetingState]);

  return <div>{callUI}</div>;
};
