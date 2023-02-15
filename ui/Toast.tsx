import * as ToastPrimitive from '@radix-ui/react-toast';
import React from 'react';

import { keyframes, styled } from '../styles/stitches.config';

const VIEWPORT_PADDING = 25;

const hide = keyframes({
	'0%': { opacity: 1 },
	'100%': { opacity: 0 },
});

const slideIn = keyframes({
	from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
	to: { transform: 'translateX(0)' },
});

const swipeOut = keyframes({
	from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
	to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const StyledToastRoot = styled(ToastPrimitive.Root, {
	boxShadow: '$card',
	padding: 15,
	display: 'flex',
	flexDirection: 'column',

	variants: {
		variant: {
			light: {
				backgroundColor: '$background',
			},
		},
	},

	'&[data-state="open"]': {
		animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
	},
	'&[data-state="closed"]': {
		animation: `${hide} 100ms ease-in`,
	},
	'&[data-swipe="move"]': {
		transform: 'translateX(var(--radix-toast-swipe-move-x))',
	},
	'&[data-swipe="cancel"]': {
		transform: 'translateX(0)',
		transition: 'transform 200ms ease-out',
	},
	'&[data-swipe="end"]': {
		animation: `${swipeOut} 100ms ease-out`,
	},
});
const StyledToastTile = styled(ToastPrimitive.Title, {
	marginBottom: 5,
	fontWeight: 500,
	color: '$dark',
	fontSize: 15,
});
const StyledToastDescription = styled(ToastPrimitive.Description, {
	margin: 0,
	color: '$text',
	fontSize: 13,
	lineHeight: 1.3,
});

export const ToastViewport = styled(ToastPrimitive.Viewport, {
	position: 'absolute',
	bottom: 0,
	right: 0,
	display: 'flex',
	flexDirection: 'column',
	padding: VIEWPORT_PADDING,
	gap: 10,
	width: 390,
	maxWidth: '100vw',
	margin: 0,
	listStyle: 'none',
	zIndex: 2147483647,
	outline: 'none',
});

const StyledToastAction = styled(ToastPrimitive.Action, {
	marginTop: '$3',
});

export type ToastVariant = 'light';

interface Props {
	id: string;
	title?: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
	open: boolean;
	setOpen: (open: boolean) => void;
}

export const Toast = ({
	children,
	description = '',
	duration = 5000,
	id,
	open,
	setOpen,
	title = '',
	variant = 'light',
}: React.PropsWithChildren<Props>) => {
	return (
		<StyledToastRoot
			open={open}
			onOpenChange={setOpen}
			id={id}
			duration={duration}
			variant={variant}
		>
			{title && <StyledToastTile>{title}</StyledToastTile>}
			{description && (
				<StyledToastDescription>{description}</StyledToastDescription>
			)}
			<StyledToastAction asChild altText={title}>
				{children}
			</StyledToastAction>
		</StyledToastRoot>
	);
};

export const ToastProvider = ToastPrimitive.Provider;
