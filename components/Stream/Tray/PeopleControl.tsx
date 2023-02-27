import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useMemo } from 'react';

import { useSidebar } from '../../../contexts/UIState';
import { Icon } from '../../../ui';
import { TrayButton } from '../../TrayButton';

export const PeopleControl = () => {
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');
  const [sidebar, setSidebar] = useSidebar();
  const isEnabled = useMemo(() => sidebar === 'people', [sidebar]);

  if (isOwner) return null;

  return (
    <TrayButton
      muted={isEnabled}
      mutedVariant="inverse"
      onClick={() => setSidebar(isEnabled ? null : 'people')}
    >
      <Icon icon="user" />
    </TrayButton>
  );
};
