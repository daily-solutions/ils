import {
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { memo, useCallback } from 'react';

import { useParticipants } from '../../../../hooks/useParticipants';
import { useStage } from '../../../../hooks/useStage';
import { Badge } from '../../../../ui/Badge';
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
						Remove
					</Button>
				)
			)}
		</Flex>
	);
});

Participant.displayName = 'Participant';

export const Participants = () => {
	const participantIds = useParticipants(true, 'user_name');
	const invitedIds = useParticipants(false, 'user_name');

	return (
		<Flex css={{ flexFlow: 'column wrap', p: '$4', rowGap: '$5' }}>
			<Flex css={{ flexFlow: 'column wrap' }}>
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
			</Flex>
			{invitedIds.length > 0 && (
				<Flex css={{ flexFlow: 'column wrap' }}>
					<Text size={0} css={{ color: '$muted' }}>
						Invited Participants
					</Text>
					<Flex css={{ flexFlow: 'column wrap', rowGap: '$3', mt: '$2' }}>
						{invitedIds.map((p) => (
							<Participant sessionId={p} key={p} />
						))}
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};
