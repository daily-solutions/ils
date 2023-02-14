import {
	useDaily,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useMemo } from 'react';

import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const AudioControl = () => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const [audio, canSend] = useParticipantProperty(localSessionId as string, [
		'audio',
		'permissions.canSend',
	]);

	const disabled = useMemo(
		() => (typeof canSend === 'boolean' ? !canSend : !canSend.has('audio')),
		[canSend]
	);

	const handleToggleAudio = useCallback(
		(state: boolean) => daily?.setLocalAudio(state),
		[daily]
	);

	if (disabled) return null;
	return (
		<TrayButton
			muted={!audio}
			onClick={() => handleToggleAudio(!audio)}
			disabled={disabled}
		>
			<Icon icon={audio ? 'mic' : 'mic_muted'} />
		</TrayButton>
	);
};
