import {
  useLocalSessionId,
  useParticipantProperty,
  useRecording,
} from '@daily-co/daily-react';
import { dequal } from 'dequal';
import React, { useCallback, useRef } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';

import { useParticipants } from '../../../hooks/useParticipants';
import { Icon } from '../../../ui';
import { TrayButton } from '../../TrayButton';

export const RecordingControl = () => {
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');
  const { isRecording, startRecording, stopRecording, updateRecording } =
    useRecording();
  const participantIdsRef = useRef<string[]>([]);

  const participantIds = useParticipants(true);

  useDeepCompareEffect(() => {
    if (dequal(participantIds, participantIdsRef.current)) return;

    if (isRecording) {
      participantIdsRef.current = participantIds;
      updateRecording({
        layout: {
          // @ts-ignore
          participants: {
            video: participantIds,
            audio: participantIds,
          },
        },
      });
    }
  }, [participantIds, isRecording]);

  const handleToggleRecording = useCallback(() => {
    if (isRecording) stopRecording();
    else {
      participantIdsRef.current = participantIds;
      startRecording({
        layout: {
          preset: 'custom',
          composition_id: 'daily:baseline',
          // @ts-ignore
          participants: {
            video: participantIds,
            audio: participantIds,
          },
        },
      });
    }
  }, [isRecording, participantIds, startRecording, stopRecording]);

  if (!isOwner) return null;

  return (
    <TrayButton muted={isRecording} onClick={handleToggleRecording}>
      <Icon icon="recording" color="#2B3F56" />
    </TrayButton>
  );
};
