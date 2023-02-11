import { styled } from '../styles/stitches.config';

export const Badge = styled('span', {
	// Reset
	alignItems: 'center',
	appearance: 'none',
	borderWidth: '0',
	boxSizing: 'border-box',
	display: 'inline-flex',
	fontFamily: 'inherit',
	justifyContent: 'center',
	padding: 0,
	textDecoration: 'none',
	userSelect: 'none',
	'&:disabled': {
		backgroundColor: '$disabled',
		pointerEvents: 'none',
		color: '$muted',
	},

	// Custom
	backgroundColor: '$secondary',
	borderRadius: '$pill',
	color: '$text',
	fontWeight: 600,
	whiteSpace: 'nowrap',
	fontVariantNumeric: 'tabular-nums',

	variants: {
		size: {
			'1': {
				height: '$5',
				p: '$2',
				fontSize: '$2',
			},
			'2': {
				height: '$7',
				p: '0 $5',
				fontSize: '$3',
			},
		},
	},
	defaultVariants: {
		size: 2,
	},
});
