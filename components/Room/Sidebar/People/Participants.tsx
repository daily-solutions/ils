import { DailyParticipant } from '@daily-co/daily-js';
import {
	useLocalSessionId,
	useParticipantIds,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { memo, useCallback } from 'react';

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
	const [userName, owner, local] = useParticipantProperty(sessionId, [
		'user_name',
		'owner',
		'local',
	]);

	const { removeFromStage } = useStage();
	const handleRemoveFromStage = useCallback(
		() => removeFromStage(sessionId),
		[removeFromStage, sessionId]
	);

	return (
		<Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
			<Text>
				{userName ?? 'Guest'} {local && '(you)'}
			</Text>
			{owner ? (
				<Badge size={1}>Owner</Badge>
			) : (
				isLocalOwner && (
					<Button variant="danger" size="small" onClick={handleRemoveFromStage}>
						Remove from stage
					</Button>
				)
			)}
		</Flex>
	);
});

Participant.displayName = 'Participant';

export const Participants = () => {
	const participantIds = useParticipantIds({
		filter: useCallback(
			(p: DailyParticipant) =>
				Boolean(
					p?.permissions?.canSend &&
						(p.owner || (p?.userData as any)?.['onStage'])
				),
			[]
		),
		sort: 'user_name',
	});

	return (
		<Box css={{ p: '$4' }}>
			<Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
				{participantIds.length > 0 ? (
					participantIds.map((p) => <Participant sessionId={p} key={p} />)
				) : (
					<Text>No participants in the call</Text>
				)}
			</Flex>
		</Box>
	);
};
