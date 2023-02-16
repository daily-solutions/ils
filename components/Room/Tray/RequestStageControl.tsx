import {
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback } from 'react';

import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { useStage } from '../../../hooks/useStage';
import { Button } from '../../../ui/Button';

export const RequestStageControl = () => {
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');
	const isOnStage = useIsOnStage();

	const {
		cancelRequestToJoinStage,
		isRequesting,
		leaveStage,
		requestToJoinStage,
	} = useStage();

	const handleToggleRequest = useCallback(
		() => (isRequesting ? cancelRequestToJoinStage() : requestToJoinStage()),
		[cancelRequestToJoinStage, isRequesting, requestToJoinStage]
	);

	if (isOwner) return null;

	if (isOnStage)
		return (
			<Button variant="danger" onClick={leaveStage}>
				Leave stage
			</Button>
		);

	return (
		<Button
			variant={isRequesting ? 'danger' : 'primary'}
			onClick={handleToggleRequest}
		>
			{isRequesting ? 'Cancel request' : 'Join the stage'}
		</Button>
	);
};
