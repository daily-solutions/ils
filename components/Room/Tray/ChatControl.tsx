import React, { useMemo } from 'react';

import { useSidebar } from '../../../contexts/UIState';
import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const ChatControl = () => {
	const [sidebar, setSidebar] = useSidebar();

	const isEnabled = useMemo(() => sidebar === 'chat', [sidebar]);

	return (
		<TrayButton
			muted={isEnabled}
			mutedVariant="inverse"
			onClick={() => setSidebar(isEnabled ? null : 'chat')}
		>
			<Icon icon="chat" />
		</TrayButton>
	);
};
