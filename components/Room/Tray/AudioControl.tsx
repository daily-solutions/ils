import {
  useDaily,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback } from 'react';

import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

interface Props {
  ignoreOnStage?: boolean;
}

export const AudioControl = ({ ignoreOnStage = false }: Props) => {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const audio = useParticipantProperty(localSessionId as string, 'audio');

  const isOnStage = useIsOnStage('audio', ignoreOnStage);

  const handleToggleAudio = useCallback(
    (state: boolean) => daily?.setLocalAudio(state),
    [daily]
  );

  if (!isOnStage) return null;

  return (
    <TrayButton muted={!audio} onClick={() => handleToggleAudio(!audio)}>
      <Icon icon={audio ? 'mic' : 'mic_muted'} />
    </TrayButton>
  );
};
