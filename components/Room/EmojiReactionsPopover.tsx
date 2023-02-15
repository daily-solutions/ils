import React from 'react';

import { Emoji } from '../../contexts/UIState';
import { emojis } from '../../hooks/useChat';
import { Box } from '../../ui/Box';
import { Grid } from '../../ui/Grid';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/Popover';

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
	onEmojiClick: (emoji: Emoji) => void;
}

export const EmojiReactionsPopover = ({
	children,
	onEmojiClick,
	open,
	setOpen,
}: React.PropsWithChildren<Props>) => {
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent css={{ p: '$4' }}>
				<Grid
					css={{
						gridGap: '$4',
						gridTemplateColumns: 'repeat(3, 1fr)',
					}}
				>
					{emojis.map((emoji) => (
						<Box
							key={emoji}
							onClick={() => onEmojiClick(emoji)}
							css={{ cursor: 'pointer', userSelect: 'none' }}
						>
							{emoji}
						</Box>
					))}
				</Grid>
			</PopoverContent>
		</Popover>
	);
};
