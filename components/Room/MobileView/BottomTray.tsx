import {
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useMemo } from 'react';

import { Emoji, useInviteToJoin } from '../../../contexts/UIState';
import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { useReactions } from '../../../hooks/useReactions';
import { useStage } from '../../../hooks/useStage';
import { Button } from '../../../ui/Button';
import { Flex } from '../../../ui/Flex';
import { TrayButton } from '../../TrayButton';

const mobileEmojis: Emoji[] = ['❤️', '👍', '🔥'];

export const BottomTray = () => {
	const { react } = useReactions();

	const localSessionId = useLocalSessionId();
	const userData = useParticipantProperty(localSessionId as string, 'userData');
	const isOnStage = useIsOnStage();
	const [, setInvited] = useInviteToJoin();

	const isInvited = useMemo(() => (userData as any)?.invited, [userData]);

	const {
		cancelRequestToJoinStage,
		isRequesting,
		leaveStage,
		requestToJoinStage,
	} = useStage();

	const handleToggleRequest = useCallback(
		() =>
			isOnStage
				? leaveStage()
				: isInvited
				? setInvited(true)
				: isRequesting
				? cancelRequestToJoinStage()
				: requestToJoinStage(),
		[
			cancelRequestToJoinStage,
			isInvited,
			isOnStage,
			isRequesting,
			leaveStage,
			requestToJoinStage,
			setInvited,
		]
	);

	return (
		<Flex
			css={{
				alignItems: 'center',
				justifyContent: 'space-between',
				position: 'absolute',
				bottom: 0,
				width: '100%',
				p: '$3',
			}}
		>
			<Flex css={{ gap: '$2' }}>
				{mobileEmojis.map((e) => (
					<TrayButton variant="outline" key={e} onClick={() => react(e)}>
						{e}
					</TrayButton>
				))}
			</Flex>
			<Button
				rounded
				variant={isOnStage || isRequesting ? 'danger' : 'primary'}
				onClick={handleToggleRequest}
			>
				{isOnStage
					? 'Leave stage'
					: isInvited
					? 'Join'
					: isRequesting
					? 'Cancel'
					: 'Ask a question'}
			</Button>
		</Flex>
	);
};
