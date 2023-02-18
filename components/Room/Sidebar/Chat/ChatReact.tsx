import React, { useCallback, useState } from 'react';

import { Emoji } from '../../../../contexts/UIState';
import { useChat } from '../../../../hooks/useChat';
import { Box } from '../../../../ui/Box';
import { Button } from '../../../../ui/Button';
import { Icon } from '../../../../ui/Icon';
import { EmojiReactionsPopover } from '../../EmojiReactionsPopover';

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
			<EmojiReactionsPopover
				open={open}
				setOpen={setOpen}
				onEmojiClick={handleOnReact}
			>
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
					<Icon icon="plus" />
				</Button>
			</EmojiReactionsPopover>
		</Box>
	);
};
