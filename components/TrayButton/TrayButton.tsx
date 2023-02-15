import React from 'react';

import { Button, ButtonVariant } from '../../ui/Button';

interface Props extends React.ComponentProps<typeof Button> {
	muted?: boolean;
	mutedVariant?: ButtonVariant;
}

export const TrayButton = ({
	children,
	muted = false,
	mutedVariant = 'danger',
	...rest
}: React.PropsWithChildren<Props>) => {
	return (
		<Button
			{...rest}
			size="icon"
			variant={muted ? mutedVariant : 'secondary'}
			css={{ borderRadius: '50%', color: muted ? 'none' : '$baseText' }}
		>
			{children}
		</Button>
	);
};
