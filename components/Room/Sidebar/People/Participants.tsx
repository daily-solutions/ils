import {
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { memo, useCallback, useMemo } from 'react';

import { useParticipants } from '../../../../hooks/useParticipants';
import { useStage } from '../../../../hooks/useStage';
import { Badge } from '../../../../ui/Badge';
import { Box } from '../../../../ui/Box';
import { Button } from '../../../../ui/Button';
import { Flex } from '../../../../ui/Flex';
import { Text } from '../../../../ui/Text';

interface ParticipantProps {
	sessionId: string;
}

const Participant = memo(({ sessionId }: ParticipantProps) => {
	const localSessionId = useLocalSessionId();
	const isLocalOwner = useParticipantProperty(
		localSessionId as string,
		'owner'
	);
	const [userName, owner, local, userData, hasPresence] =
		useParticipantProperty(sessionId, [
			'user_name',
			'owner',
			'local',
			'userData',
			'permissions.hasPresence',
		]);

	const isInvited = useMemo(
		() => hasPresence && !(userData as any)?.['onStage'],
		[hasPresence, userData]
	);

	const { removeFromStage } = useStage();
	const handleRemoveFromStage = useCallback(
		() => removeFromStage(sessionId),
		[removeFromStage, sessionId]
	);

	return (
		<Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
			<Flex
				css={{
					flexFlow: 'column wrap',
					justifyContent: 'center',
					gap: '$1',
				}}
			>
				<Text>
					{userName ?? 'Guest'} {local && '(you)'}
				</Text>
				{isLocalOwner && isInvited && !owner && (
					<Text size={1}>Invited but not on stage</Text>
				)}
			</Flex>
			{owner ? (
				<Badge size={1}>Owner</Badge>
			) : (
				isLocalOwner && (
					<Button variant="danger" size="small" onClick={handleRemoveFromStage}>
						Remove
					</Button>
				)
			)}
		</Flex>
	);
});

Participant.displayName = 'Participant';

export const Participants = () => {
	const participantIds = useParticipants(false, 'user_name');

	return (
		<Box css={{ p: '$4' }}>
			<Text size={0} css={{ color: '$muted' }}>
				Presenters
			</Text>
			<Flex css={{ flexFlow: 'column wrap', rowGap: '$3', mt: '$2' }}>
				{participantIds.length > 0 ? (
					participantIds.map((p) => <Participant sessionId={p} key={p} />)
				) : (
					<Text>No participants in the call</Text>
				)}
			</Flex>
		</Box>
	);
};
