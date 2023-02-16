import Image from 'next/image';
import React from 'react';

import { useParticipantCounts } from '../../../hooks/useParticipantCount';
import eye from '../../../public/eye.svg';
import { Badge } from '../../../ui/Badge';
import { Flex } from '../../../ui/Flex';
import { Text } from '../../../ui/Text';

export const ViewerCount = () => {
	const { hidden } = useParticipantCounts();
	return (
		<Badge color="dark">
			<Flex
				css={{
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '$1',
				}}
			>
				<Image src={eye} alt="Eye" />
				<Flex
					css={{
						pr: '$3',
						flexFlow: 'column wrap',
						gap: '$1',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text
						size={0}
						css={{
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							fontWeight: '$semibold',
						}}
					>
						Viewers
					</Text>
					<Text size={1}>{hidden.toLocaleString('en-US')}</Text>
				</Flex>
			</Flex>
		</Badge>
	);
};
