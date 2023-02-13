import { useParticipantProperty } from '@daily-co/daily-react';
import { memo } from 'react';

import { Flex } from '../../ui/Flex';

interface Props {
	sessionId: string;
}

export const TileInfo = memo(({ sessionId }: Props) => {
	const [userName, isLocal] = useParticipantProperty(sessionId, [
		'user_name',
		'local',
	]);

	return (
		<Flex
			css={{
				position: 'absolute',
				bottom: 12,
				left: 12,
				background: '$tileInfo',
				color: '$background',
				br: '$m',
				p: '$3',
				fontSize: '$1',
			}}
		>
			{userName ?? 'Guest'} {isLocal && '(You)'}
		</Flex>
	);
});

TileInfo.displayName = 'TileInfo';
