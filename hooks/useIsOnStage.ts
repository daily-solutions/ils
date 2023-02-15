import {
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import { useMemo } from 'react';

export const useIsOnStage = (
	type:
		| 'video'
		| 'audio'
		| 'screenAudio'
		| 'screenVideo'
		| undefined = undefined,
	ignoreUserData: boolean = false
) => {
	const localSessionId = useLocalSessionId();
	const [hasPresence, canSend, userData, owner] = useParticipantProperty(
		localSessionId as string,
		['permissions.hasPresence', 'permissions.canSend', 'userData', 'owner']
	);

	return useMemo(() => {
		const hasPandUserData = ignoreUserData
			? hasPresence
			: hasPresence && (userData as any)?.['onStage'];

		if (owner) return true;
		if (type !== undefined) {
			const canSendType =
				typeof canSend === 'boolean' ? canSend : canSend.has(type);
			return hasPandUserData && canSendType;
		}
		return hasPandUserData;
	}, [canSend, hasPresence, ignoreUserData, owner, type, userData]);
};
