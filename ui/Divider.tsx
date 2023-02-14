import { styled } from '../styles/stitches.config';

export const Divider = styled('hr', {
	variants: {
		direction: {
			vertical: {
				height: '1px',
				border: '0.5px solid $secondary',
				width: '1px',
			},
			horizontal: {
				border: '0.5px solid $secondary',
				width: '100%',
			},
		},
	},
	defaultVariants: {
		direction: 'horizontal',
	},
});
