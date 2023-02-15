import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { CSS } from '@stitches/react';
import React from 'react';

import { keyframes, styled } from '../styles/stitches.config';
import { Box } from './Box';
import { Button } from './Button';
import { Icon } from './Icon';

const contentShow = keyframes({
	'0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
	'100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const overlayShow = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const Dialog = DialogPrimitive.Root;

const StyledOverlay = styled(DialogPrimitive.Overlay, {
	zIndex: 2,
	backgroundColor: 'rgba(0, 0, 0, .15)',
	position: 'fixed',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const StyledContent = styled(DialogPrimitive.Content, {
	zIndex: 10,
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	maxWidth: 500,
	maxHeight: '85vh',
	padding: '$4 $6',
	marginTop: '-5vh',
	background: '$background',

	// Among other things, prevents text alignment inconsistencies when dialog can't be centered in the viewport evenly.
	// Affects animated and non-animated dialogs alike.
	willChange: 'transform',
	animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
	boxShadow:
		'0px 173px 69px rgba(0, 0, 0, 0.02), 0px 97px 58px rgba(0, 0, 0, 0.08), 0px 43px 43px rgba(0, 0, 0, 0.13), 0px 11px 24px rgba(0, 0, 0, 0.15), 0px 0px 0px rgba(0, 0, 0, 0.15)',
	br: '$m',

	'&:focus': {
		outline: 'none',
	},
});

const StyledHeader = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
});

const StyledCloseButton = styled(DialogPrimitive.Close, {});

type DialogContentPrimitiveProps = React.ComponentProps<
	typeof DialogPrimitive.Content
>;
type DialogContentProps = DialogContentPrimitiveProps & {
	title: string;
	showCloseButton?: boolean;
	css?: CSS;
};

const DialogTitle = styled(DialogPrimitive.Title, {
	fontSize: '20px',
	fontWeight: '$normal',
	lineHeight: '100%',
});

const DialogContent = React.forwardRef<
	React.ElementRef<typeof StyledContent>,
	DialogContentProps
>(({ children, showCloseButton = true, title, ...props }, forwardedRef) => (
	<DialogPrimitive.Portal>
		<StyledOverlay>
			<StyledContent {...props} ref={forwardedRef}>
				<StyledHeader>
					<DialogTitle>{title}</DialogTitle>
					{showCloseButton && (
						<StyledCloseButton asChild>
							<Button size="reaction" variant="outline">
								<Icon icon="cross" size={15} />
							</Button>
						</StyledCloseButton>
					)}
				</StyledHeader>
				{children}
			</StyledContent>
		</StyledOverlay>
	</DialogPrimitive.Portal>
));

DialogContent.displayName = 'DialogContent';

interface Props {
	open: boolean;
	onClose: (value: boolean) => void;
	title: string;
	showCloseButton?: boolean;
	css?: CSS;
}

export const Modal = ({
	children,
	css,
	onClose,
	open,
	showCloseButton = true,
	title,
}: React.PropsWithChildren<Props>) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent title={title} css={css} showCloseButton={showCloseButton}>
				<Box css={{ py: '$2' }}>{children}</Box>
			</DialogContent>
		</Dialog>
	);
};