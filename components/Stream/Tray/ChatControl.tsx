import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useMemo } from 'react';

import { useSidebar } from '../../../state';
import { Icon } from '../../../ui';
import { TrayButton } from '../../TrayButton';

export const ChatControl = () => {
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');
  const [sidebar, setSidebar] = useSidebar();
  const isEnabled = useMemo(() => sidebar === 'chat', [sidebar]);

  if (isOwner) return null;

  return (
    <TrayButton
      muted={isEnabled}
      mutedVariant="inverse"
      onClick={() => setSidebar(isEnabled ? null : 'chat')}
    >
      <Icon icon="chat" size={16} color="#2B3F56" />
    </TrayButton>
  );
};
