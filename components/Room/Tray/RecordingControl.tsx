import {
	useLocalSessionId,
	useParticipantProperty,
	useRecording,
} from '@daily-co/daily-react';
import React, { useCallback } from 'react';

import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const RecordingControl = () => {
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');
	const { isRecording, startRecording, stopRecording } = useRecording();

	const handleToggleRecording = useCallback(
		() => (isRecording ? stopRecording() : startRecording()),
		[isRecording, startRecording, stopRecording]
	);

	if (!isOwner) return null;

	return (
		<TrayButton muted={isRecording} onClick={handleToggleRecording}>
			<Icon icon="recording" />
		</TrayButton>
	);
};
