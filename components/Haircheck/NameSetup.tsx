import { useDaily } from '@daily-co/daily-react';
import { styled } from '@stitches/react';
import Avatar from 'boring-avatars';
import React, { memo, useCallback, useState } from 'react';

import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';
import { Divider } from '../../ui/Divider';
import { Flex } from '../../ui/Flex';
import { Icon } from '../../ui/Icon';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Text } from '../../ui/Text';

const StyledAvatar = styled('div', {
	cursor: 'pointer',
	variants: {
		isSelected: {
			true: {
				height: 46,
				width: 46,
				border: '5px solid $orange',
				borderRadius: '50%',
			},
		},
	},
});

type Avatar =
	| 'Margaret Brent'
	| 'Lucy Stone'
	| 'Mary Edwards'
	| 'Margaret Chase'
	| 'Mahalia Jackson'
	| 'Maya Angelou'
	| 'Margaret Bourke'
	| 'Eunice Kennedy'
	| 'Amelia Earhart'
	| 'Mary Baker';

const avatarNames: Avatar[] = [
	'Margaret Brent',
	'Lucy Stone',
	'Mary Edwards',
	'Margaret Chase',
	'Mahalia Jackson',
	'Maya Angelou',
	'Margaret Bourke',
	'Eunice Kennedy',
	'Amelia Earhart',
	'Mary Baker',
];

interface Props {
	hasPermission: boolean;
	onContinue: () => void;
}

export const NameSetup = memo(({ hasPermission, onContinue }: Props) => {
	const daily = useDaily();
	const [name, setName] = useState<string>('');
	const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatarNames[0]);

	const handleContinue = useCallback(() => {
		if (!daily) return;

		daily.setUserName(name);
		daily.setUserData({ avatar: selectedAvatar });
		onContinue();
	}, [daily, name, onContinue, selectedAvatar]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleContinue();
			}}
		>
			<Box>
				<Flex css={{ flexFlow: 'column wrap', rowGap: '$5', p: '$5' }}>
					<Text size={5}>Joining as {hasPermission ? 'owner' : 'viewer'}</Text>
					<Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
						<Label>Enter your display name</Label>
						<Input
							autoFocus
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Eg. Andrew"
						/>
					</Flex>
					<Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
						<Label>Select avatar</Label>
						<Flex
							css={{ gap: '$3', flexFlow: 'row wrap', position: 'relative' }}
						>
							{avatarNames.map((name) => (
								<StyledAvatar
									key={name}
									isSelected={selectedAvatar === name}
									onClick={() => setSelectedAvatar(name)}
								>
									<Avatar
										size={46}
										name={name}
										variant="beam"
										colors={['#1BEBB9', '#00C9DF', '#2B3F56', '#D1FBF1']}
									/>
								</StyledAvatar>
							))}
						</Flex>
					</Flex>
				</Flex>
				<Divider />
				<Box css={{ p: '$5' }}>
					<Button type="submit" fullWidth disabled={name === ''}>
						<Flex
							css={{
								alignItems: 'center',
								justifyContent: 'center',
								gap: '$1',
							}}
						>
							<Text>{hasPermission ? 'Continue' : 'Join stream'}</Text>
							<Icon size={12} icon="arrow_right" />
						</Flex>
					</Button>
				</Box>
			</Box>
		</form>
	);
});

NameSetup.displayName = 'NameSetup';
