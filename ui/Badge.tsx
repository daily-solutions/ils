import { styled } from '../styles/stitches.config';

export const Badge = styled('span', {
	// Reset
	alignItems: 'center',
	appearance: 'none',
	borderWidth: '0',
	boxSizing: 'border-box',
	display: 'inline-flex',
	fontFamily: 'inherit',
	padding: 0,
	textDecoration: 'none',
	userSelect: 'none',
	'&:disabled': {
		backgroundColor: '$disabled',
		pointerEvents: 'none',
		color: '$muted',
	},

	// Custom

	borderRadius: '$pill',
	fontWeight: '$semibold',
	whiteSpace: 'nowrap',
	fontVariantNumeric: 'tabular-nums',

	variants: {
		color: {
			default: {
				backgroundColor: '$secondary',
				color: '$text',
			},
			primary: {
				backgroundColor: '$primary',
				color: '$background',
			},
			dark: {
				backgroundColor: '$baseText',
				color: '$background',
			},
		},
		size: {
			xs: {
				height: '16px',
				p: '$2',
				fontSize: '8px',
				textTransform: 'uppercase',
				letterSpacing: '0.05em',
				lineHeight: '100%',
			},
			'1': {
				height: '$5',
				p: '$2',
				fontSize: '$2',
			},
			'2': {
				p: '$2',
				height: '$7',
			},
		},
	},
	defaultVariants: {
		color: 'default',
		size: 2,
	},
});
