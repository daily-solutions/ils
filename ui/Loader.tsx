import React from 'react';

import { Flex } from './Flex';
import { Spinner } from './Spinner';

export const Loader = () => {
	return (
		<Flex
			css={{
				alignItems: 'center',
				justifyContent: 'center',
				width: '100dvw',
				height: '100dvh',
				background: '$secondary',
			}}
		>
			<Spinner />
		</Flex>
	);
};
