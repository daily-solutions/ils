import React from 'react';

import { useParticipantCounts } from '../../../hooks/useParticipantCount';
import { Badge } from '../../../ui/Badge';
import { Flex } from '../../../ui/Flex';
import { Icon } from '../../../ui/Icon';
import { Text } from '../../../ui/Text';

export const ViewerCount = () => {
	const { hidden } = useParticipantCounts();
	return (
		<Badge>
			<Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '$1' }}>
				<Icon icon="eye" size={15} color="#6B7785" />
				<Text>{hidden.toLocaleString('en-US')}</Text>
			</Flex>
		</Badge>
	);
};
