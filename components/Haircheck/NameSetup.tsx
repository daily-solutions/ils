import { useDaily } from '@daily-co/daily-react';
import React, { memo, useCallback, useState } from 'react';

import { Button } from '../../ui/Button';
import { Flex } from '../../ui/Flex';
import { Input } from '../../ui/Input';

interface Props {
	hasPermission: boolean;
	onContinue: () => void;
}

export const NameSetup = memo(({ hasPermission, onContinue }: Props) => {
	const daily = useDaily();
	const [name, setName] = useState<string>('');

	const handleContinue = useCallback(() => {
		if (!daily) return;

		daily.setUserName(name);
		onContinue();
	}, [daily, name, onContinue]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleContinue();
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
});

NameSetup.displayName = 'NameSetup';
