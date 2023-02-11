import React from 'react';

import { Flex } from './Flex';

export const Loader = () => {
	return (
		<Flex
			css={{
				alignItems: 'center',
				justifyContent: 'center',
				width: '100dvw',
				height: '100dvh',
			}}
		>
			<p>Loading...</p>
		</Flex>
	);
};
