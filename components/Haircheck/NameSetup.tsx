import React, { useState } from 'react';

import { Button } from '../../ui/Button';
import { Flex } from '../../ui/Flex';
import { Input } from '../../ui/Input';

interface Props {
	hasPermission: boolean;
	onContinue: (name: string) => void;
}

export const NameSetup = ({ hasPermission, onContinue }: Props) => {
	const [name, setName] = useState<string>('');

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onContinue(name);
			}}
		>
			<Flex css={{ flexFlow: 'column wrap', rowGap: '$5', padding: '$5' }}>
				<Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
					<label>Enter your name</label>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter your name"
					/>
				</Flex>
				<Button type="submit">
					{hasPermission ? 'Continue' : 'Join broadcast'}
				</Button>
			</Flex>
		</form>
	);
};
