import React, { useMemo } from 'react';

import { useSidebar } from '../../../contexts/UIState';
import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const PeopleControl = () => {
	const [sidebar, setSidebar] = useSidebar();

	const isEnabled = useMemo(() => sidebar === 'people', [sidebar]);

	return (
		<TrayButton
			muted={isEnabled}
			mutedVariant="inverse"
			onClick={() => setSidebar(isEnabled ? null : 'people')}
		>
			<Icon icon="user" size={20} />
		</TrayButton>
	);
};
