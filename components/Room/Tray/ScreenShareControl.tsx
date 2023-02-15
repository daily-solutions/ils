import { useScreenShare } from '@daily-co/daily-react';
import React, { useCallback } from 'react';

import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const ScreenShareControl = () => {
	const { isSharingScreen, startScreenShare, stopScreenShare } =
		useScreenShare();

	const isOnStage = useIsOnStage('screenVideo');

	const handleToggleScreen = useCallback(
		() => (isSharingScreen ? stopScreenShare() : startScreenShare()),
		[isSharingScreen, startScreenShare, stopScreenShare]
	);

	if (!isOnStage) return null;
	return (
		<TrayButton muted={isSharingScreen} onClick={handleToggleScreen}>
			<Icon icon={isSharingScreen ? 'screen_muted' : 'screen'} />
		</TrayButton>
	);
};
