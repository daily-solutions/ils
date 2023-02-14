import {
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback } from 'react';

import { useStage } from '../../../hooks/useStage';
import { Button } from '../../../ui/Button';

export const RequestStageControl = () => {
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');

	const { cancelRequestToJoinStage, isRequesting, requestToJoinStage } =
		useStage();

	const hasPresence = useParticipantProperty(
		localSessionId as string,
		'permissions.hasPresence'
	);

	const handleToggleRequest = useCallback(
		() => (isRequesting ? cancelRequestToJoinStage() : requestToJoinStage()),
		[cancelRequestToJoinStage, isRequesting, requestToJoinStage]
	);

	if (isOwner || hasPresence) return null;

	return (
		<Button onClick={handleToggleRequest}>
			{isRequesting ? 'Cancel request' : 'Join the stage'}
		</Button>
	);
};
