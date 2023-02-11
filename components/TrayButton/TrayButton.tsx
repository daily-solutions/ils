import React from 'react';

import { Button } from '../../ui/Button';

interface Props extends React.ComponentProps<typeof Button> {
	muted: boolean;
}

export const TrayButton = ({
	children,
	muted,
	...rest
}: React.PropsWithChildren<Props>) => {
	return (
		<Button
			{...rest}
			size="icon"
			variant={muted ? 'danger' : 'secondary'}
			css={{ borderRadius: '50%', color: muted ? '$dangerText' : '$text' }}
		>
			{children}
		</Button>
	);
};
