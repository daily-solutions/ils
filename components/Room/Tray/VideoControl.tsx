import {
	useDaily,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useMemo } from 'react';

import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const VideoControl = () => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const [video, canSend] = useParticipantProperty(localSessionId as string, [
		'video',
		'permissions.canSend',
	]);

	const disabled = useMemo(
		() => (typeof canSend === 'boolean' ? !canSend : !canSend.has('video')),
		[canSend]
	);

	const handleToggleVideo = useCallback(
		(state: boolean) => daily?.setLocalVideo(state),
		[daily]
	);

	return (
		<TrayButton
			muted={!video}
			onClick={() => handleToggleVideo(!video)}
			disabled={disabled}
		>
			<Icon icon={video ? 'cam' : 'cam_muted'} />
		</TrayButton>
	);
};
