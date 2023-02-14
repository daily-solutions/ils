import {
	useDaily,
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useState } from 'react';

import { useMeetingState } from '../../contexts/UIState';
import Card from '../../ui/Card';
import { Flex } from '../../ui/Flex';
import { NameSetup } from './NameSetup';
import { Setup } from './Setup';

export const Haircheck = () => {
	const daily = useDaily();
	const localSessionId = useLocalSessionId();
	const hasPermission = useParticipantProperty(
		localSessionId as string,
		'permissions.hasPresence'
	);
	const [state, setState] = useState<'name' | 'setup'>('name');
	const [, setMeetingState] = useMeetingState();

	const onContinue = useCallback(() => {
		if (!daily) return;

		if (hasPermission) setState('setup');
		else {
			setMeetingState('joining-meeting');
			daily.join();
		}
	}, [daily, hasPermission, setMeetingState]);

	return (
		<Flex
			css={{
				alignItems: 'center',
				justifyContent: 'center',
				width: '100dvw',
				height: '100dvh',
			}}
		>
			<Card
				css={{
					maxWidth: state === 'name' ? 330 : 460,
					width: '100%',
					padding: 0,
				}}
			>
				{state === 'name' && (
					<NameSetup hasPermission={hasPermission} onContinue={onContinue} />
				)}
				{state === 'setup' && <Setup />}
			</Card>
		</Flex>
	);
};
