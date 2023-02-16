import { useParticipantProperty } from '@daily-co/daily-react';
import { memo } from 'react';

import { Flex } from '../../ui/Flex';
import { Text } from '../../ui/Text';

interface Props {
	sessionId: string;
	isSpeaking: boolean;
}

export const TileInfo = memo(({ isSpeaking, sessionId }: Props) => {
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
				background: isSpeaking ? '$yellow' : '$tileInfo',
				color: isSpeaking ? '$yellowText' : '$background',
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
