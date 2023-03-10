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

export const VideoControl = ({
  disabled = false,
  ignoreOnStage = false,
}: Props) => {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const video = useParticipantProperty(localSessionId as string, 'video');

  const isOnStage = useIsOnStage('video', ignoreOnStage);
  const handleToggleVideo = useCallback(
    (state: boolean) => daily?.setLocalVideo(state),
    [daily]
  );

  if (!isOnStage) return null;
  return (
    <TrayButton
      muted={!video}
      disabled={disabled}
      onClick={() => handleToggleVideo(!video)}
    >
      <Icon
        icon={video ? 'cam' : 'cam_muted'}
        width={16}
        height={!video ? 16 : 12}
        color="#2B3F56"
      />
    </TrayButton>
  );
};
