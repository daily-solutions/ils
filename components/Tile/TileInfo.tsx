import {
	useActiveSpeakerId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import { memo, useMemo } from 'react';

import { Flex } from '../../ui/Flex';
import { Text } from '../../ui/Text';

interface Props {
	sessionId: string;
}

export const TileInfo = memo(({ sessionId }: Props) => {
	const activeSpeakerId = useActiveSpeakerId({ ignoreLocal: true });
	const [userName, isLocal] = useParticipantProperty(sessionId, [
		'user_name',
		'local',
	]);

	const isActiveSpeaker = useMemo(
		() => activeSpeakerId === sessionId,
		[activeSpeakerId, sessionId]
	);

	return (
		<Flex
			css={{
				position: 'absolute',
				bottom: 12,
				left: 12,
				background: isActiveSpeaker ? '$yellow' : '$tileInfo',
				color: isActiveSpeaker ? '$yellowText' : '$background',
				br: '$m',
				p: '$3',
				fontSize: '$1',
			}}
		>
			<Text size={2} css={{ fontWeight: '$semibold' }}>
				{userName ?? 'Guest'} {isLocal && '(You)'}
			</Text>
		</Flex>
	);
});

TileInfo.displayName = 'TileInfo';
