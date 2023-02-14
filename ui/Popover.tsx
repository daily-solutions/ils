import * as PopoverPrimitive from '@radix-ui/react-popover';
import { PopoverContentProps } from '@radix-ui/react-popover';
import { CSS, keyframes } from '@stitches/react';
import React from 'react';

import { styled } from '../styles/stitches.config';

const slideUpAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateX(-2px)' },
	'100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(-2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateX(2px)' },
	'100%': { opacity: 1, transform: 'translateX(0)' },
});

const contentStyles = {
	borderRadius: '$default',
	boxSizing: 'border-box',
	position: 'relative',
	backgroundColor: '$background',
	padding: '$2 0',
	color: '$text',
	boxShadow:
		'0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
	'@media (prefers-reduced-motion: no-preference)': {
		animationDuration: '400ms',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		'&[data-state="open"]': {
			'&[data-side="top"]': { animationName: slideDownAndFade },
			'&[data-side="right"]': { animationName: slideLeftAndFade },
			'&[data-side="bottom"]': { animationName: slideUpAndFade },
			'&[data-side="left"]': { animationName: slideRightAndFade },
		},
	},
};

const StyledContent = styled(PopoverPrimitive.Content, {
	...contentStyles,
});

const StyledArrow = styled(PopoverPrimitive.Arrow, {
	fill: '$background',
});

type ContentProps = PopoverContentProps & { css?: CSS };

const Content = ({
	children,
	css,
	...props
}: React.PropsWithChildren<ContentProps>) => {
	return (
		<PopoverPrimitive.Portal>
			<StyledContent sideOffset={0} css={css} {...props}>
				{children}
				<StyledArrow />
			</StyledContent>
		</PopoverPrimitive.Portal>
	);
};

// Exports
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = Content;
