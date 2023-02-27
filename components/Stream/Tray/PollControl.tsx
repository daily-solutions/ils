import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React from 'react';

import { usePoll } from '../../../state';
import { Icon } from '../../../ui';
import { TrayButton } from '../../TrayButton';

export const PollControl = () => {
  const [show, setShow] = usePoll();
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');

  if (!isOwner) return null;

  return (
    <TrayButton
      muted={show}
      mutedVariant="inverse"
      onClick={() => setShow(true)}
    >
      <Icon icon="poll" size={16} color="#2B3F56" />
    </TrayButton>
  );
};
