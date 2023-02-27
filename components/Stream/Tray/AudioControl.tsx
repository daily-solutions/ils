import {
  useDaily,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback } from 'react';

import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { Icon } from '../../../ui';
import { TrayButton } from '../../TrayButton';

interface Props {
  ignoreOnStage?: boolean;
  disabled?: boolean;
}

export const AudioControl = ({
  disabled = false,
  ignoreOnStage = false,
}: Props) => {
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
    <TrayButton
      muted={!audio}
      disabled={disabled}
      onClick={() => handleToggleAudio(!audio)}
    >
      <Icon icon={audio ? 'mic' : 'mic_muted'} size={16} color="#2B3F56" />
    </TrayButton>
  );
};
