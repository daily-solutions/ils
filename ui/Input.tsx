import { styled } from '../styles/stitches.config';

export const Input = styled('input', {
	appearance: 'none',
	width: '100%',
	br: '$default',
	'-webkit-appearance': 'none',
	boxSizing: 'border-box',
	cursor: 'pointer',
	display: 'inline-block',
	fontFamily: 'inherit',
	height: '$7',
	px: '$4',
	fontSize: '$2',
	lineHeight: '$none',
	transition: '$default',
	border: '1px solid $slate6',
	backgroundColor: '$secondary',
	color: '$text',

	'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
		'-webkit-appearance': 'none',
		margin: 0,
	},
	'&[type=number]': {
		'-moz-appearance': 'textfield',
	},

	'&[disabled], > option[disabled]': {
		backgroundColor: '$disabled',
		color: '$muted',
		cursor: 'not-allowed',
	},
	'&::placeholder': {
		color: '$muted',
		opacity: 1,
	},

	'&:hover': {
		borderColor: '$secondary',
		outline: 'none',
	},

	'&:focus': {
		borderColor: '$secondary',
		outline: 'none',
	},
});
