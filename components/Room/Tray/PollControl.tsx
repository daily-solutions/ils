import React from 'react';

import { usePoll } from '../../../contexts/UIState';
import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const PollControl = () => {
	const [show, setShow] = usePoll();

	return (
		<TrayButton
			muted={show}
			mutedVariant="inverse"
			onClick={() => setShow(true)}
		>
			<Icon icon="poll" />
		</TrayButton>
	);
};
