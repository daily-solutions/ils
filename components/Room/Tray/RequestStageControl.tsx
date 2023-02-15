import React, { useCallback } from 'react';

import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { useStage } from '../../../hooks/useStage';
import { Button } from '../../../ui/Button';

export const RequestStageControl = () => {
	const isOnStage = useIsOnStage();

	const { cancelRequestToJoinStage, isRequesting, requestToJoinStage } =
		useStage();

	const handleToggleRequest = useCallback(
		() => (isRequesting ? cancelRequestToJoinStage() : requestToJoinStage()),
		[cancelRequestToJoinStage, isRequesting, requestToJoinStage]
	);

	if (isOnStage) return null;

	return (
		<Button
			variant={isRequesting ? 'danger' : 'primary'}
			onClick={handleToggleRequest}
		>
			{isRequesting ? 'Cancel request' : 'Join the stage'}
		</Button>
	);
};
