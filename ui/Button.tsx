import type { CSS } from '@stitches/react';
import React from 'react';

import { styled } from '../styles/stitches.config';

const StyledButton = styled('button', {
	// Reset
	all: 'unset',
	boxSizing: 'border-box',
	userSelect: 'none',
	'&::before': {
		boxSizing: 'border-box',
	},
	'&::after': {
		boxSizing: 'border-box',
	},
	display: 'flex',
	flexShrink: 0,
	lineHeight: '$normal',
	border: 'none',
	cursor: 'pointer',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
	br: '$default',

	fontFamily: '$sans',
	fontSize: '$2',
	fontWeight: '$semibold',

	'&:disabled': {
		backgroundColor: '$disabled',
		color: '$muted',
		cursor: 'not-allowed',
	},

	variants: {
		variant: {
			primary: {
				backgroundColor: '$primary',
				color: '$primaryText',
			},
			secondary: {
				backgroundColor: '$secondary',
				color: '$secondaryText',
			},
			danger: {
				backgroundColor: '$danger',
				color: '$dangerText',
			},
		},

		size: {
			small: {
				height: '$6',
				px: '$5',
				fontSize: '$1',
				lineHeight: '$none',
				br: '$sm',
			},
			medium: {
				height: '$7',
				px: '$6',
				fontSize: '$2',
				lineHeight: '$none',
				br: '$sm',
			},
			icon: {
				height: '$7',
				width: '$7',
			},
		},
		fullWidth: {
			true: {
				width: '100%',
			},
		},
	},
	defaultVariants: {
		size: 'medium',
		fullWidth: false,
		variant: 'primary',
	},
});

interface Props extends React.ComponentPropsWithRef<'button'> {
	size?: 'small' | 'medium' | 'icon';
	variant?: 'primary' | 'secondary' | 'danger';
	disabled?: boolean;
	fullWidth?: boolean;
	css?: CSS;
}

export const Button = React.forwardRef<
	HTMLButtonElement,
	React.PropsWithChildren<Props>
>(
	(
		{
			children,
			css,
			disabled,
			fullWidth = false,
			size = 'medium',
			variant = 'primary',
			...rest
		},
		ref
	) => {
		return (
			<StyledButton
				variant={variant}
				size={size}
				disabled={disabled}
				fullWidth={fullWidth}
				ref={ref}
				css={css}
				{...rest}
			>
				{children}
			</StyledButton>
		);
	}
);

Button.displayName = 'Button';
