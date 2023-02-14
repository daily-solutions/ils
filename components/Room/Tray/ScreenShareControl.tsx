import {
	useLocalSessionId,
	useParticipantProperty,
	useScreenShare,
} from '@daily-co/daily-react';
import React, { useCallback, useMemo } from 'react';

import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const ScreenShareControl = () => {
	const localSessionId = useLocalSessionId();
	const { isSharingScreen, startScreenShare, stopScreenShare } =
		useScreenShare();
	const canSend = useParticipantProperty(
		localSessionId as string,
		'permissions.canSend'
	);

	const disabled = useMemo(
		() =>
			typeof canSend === 'boolean'
				? !canSend
				: !canSend.has('screenVideo') || !canSend.has('screenAudio'),
		[canSend]
	);

	const handleToggleScreen = useCallback(
		() => (isSharingScreen ? stopScreenShare() : startScreenShare()),
		[isSharingScreen, startScreenShare, stopScreenShare]
	);

	if (disabled) return null;
	return (
		<TrayButton
			muted={isSharingScreen}
			onClick={handleToggleScreen}
			disabled={disabled}
		>
			<Icon icon={isSharingScreen ? 'screen_muted' : 'screen'} />
		</TrayButton>
	);
};
