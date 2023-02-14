import React, { useCallback, useState } from 'react';

import { Emoji } from '../../../../contexts/UIState';
import { emojis, useChat } from '../../../../hooks/useChat';
import { Box } from '../../../../ui/Box';
import { Button } from '../../../../ui/Button';
import { Grid } from '../../../../ui/Grid';
import { Icon } from '../../../../ui/Icon';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '../../../../ui/Popover';

interface Props {
	id: string;
}

export const ChatReact = ({ id }: Props) => {
	const { reactToMsg } = useChat();
	const [open, setOpen] = useState<boolean>(false);

	const handleOnReact = useCallback(
		(emoji: Emoji) => reactToMsg(id, emoji),
		[id, reactToMsg]
	);

	return (
		<Box
			css={{
				position: 'absolute',
				top: '50%',
				right: 0,
				transform: 'translateY(-50%)',
			}}
		>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						className="msg-react"
						variant="cyan"
						size="xs"
						css={{
							visibility: open ? 'visible' : 'hidden',
							opacity: open ? 1 : 0,
							transition: 'visibility 0.3s linear,opacity 0.3s linear',
						}}
					>
						<Icon icon="plus" size={15} />
					</Button>
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
								onClick={() => handleOnReact(emoji)}
								css={{ cursor: 'pointer' }}
							>
								{emoji}
							</Box>
						))}
					</Grid>
				</PopoverContent>
			</Popover>
		</Box>
	);
};
