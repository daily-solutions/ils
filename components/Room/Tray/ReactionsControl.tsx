import React, { useState } from 'react';

import { emojis } from '../../../hooks/useChat';
import { useReactions } from '../../../hooks/useReactions';
import { Box } from '../../../ui/Box';
import { Grid } from '../../../ui/Grid';
import { Icon } from '../../../ui/Icon';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/Popover';
import { TrayButton } from '../../TrayButton';

export const ReactionsControl = () => {
	const [open, setOpen] = useState<boolean>(false);

	const { react } = useReactions();

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Box>
					<TrayButton muted={open} mutedVariant="inverse">
						<Icon icon="heart" size={16} />
					</TrayButton>
				</Box>
			</PopoverTrigger>
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
							onClick={() => react(emoji)}
							css={{ cursor: 'pointer' }}
						>
							{emoji}
						</Box>
					))}
				</Grid>
			</PopoverContent>
		</Popover>
	);
};
