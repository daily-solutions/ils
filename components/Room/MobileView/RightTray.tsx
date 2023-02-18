import React from 'react';

import { Flex } from '../../../ui/Flex';
import { Icon } from '../../../ui/Icon';
import { TrayButton } from '../../TrayButton';

export const RightTray = () => {
	return (
		<Flex
			css={{
				alignItems: 'center',
				position: 'absolute',
				marginLeft: 'auto',
				justifyContent: 'flex-end',
				bottom: 80,
				width: '100%',
				px: '$3',
			}}
		>
			<Flex css={{ flexFlow: 'column', gap: '$4', color: '$background' }}>
				<TrayButton variant="transparent" label="Chat">
					<Icon icon="chat" />
				</TrayButton>
				<TrayButton variant="transparent" label="Poll">
					<Icon icon="poll" />
				</TrayButton>
				<TrayButton variant="transparent" label="Share">
					<Icon icon="share" />
				</TrayButton>
			</Flex>
		</Flex>
	);
};
