import { DailyEventObjectAppMessage } from '@daily-co/daily-js';
import { useAppMessage } from '@daily-co/daily-react';
import { useCallback, useEffect } from 'react';

import { Emoji } from '../contexts/UIState';

export interface EmojiReactionsAppMessage {
	event: 'emoji-reactions';
	emoji: Emoji;
}

export const useReactions = () => {
	const sendAppMessage = useAppMessage();

	const handleRemoveFlyingEmoji = useCallback((node: any) => {
		const element = document.getElementById('reactions');
		if (!element) return;

		element.removeChild(node);
	}, []);

	const handleDisplayFlyingEmoji = useCallback(
		(emoji: Emoji) => {
			const element = document.getElementById('reactions');
			if (!element) return;

			const node = document.createElement('div');
			node.appendChild(document.createTextNode(emoji));
			node.className =
				Math.random() * 1 > 0.5 ? 'emoji wiggle-1' : 'emoji wiggle-2';
			node.style.transform = `rotate(${-30 + Math.random() * 60}deg)`;
			node.style.left = `${Math.random() * 100}%`;
			element.appendChild(node);

			node.addEventListener('animationend', (e) =>
				handleRemoveFlyingEmoji(e.target)
			);
		},
		[handleRemoveFlyingEmoji]
	);

	useEffect(() => {
		const element = document.getElementById('reactions');
		if (!element) return;

		element.childNodes.forEach((n) =>
			n.removeEventListener('animationend', handleRemoveFlyingEmoji)
		);
	}, [handleRemoveFlyingEmoji]);

	const onAppMessage = useCallback(
		(ev: DailyEventObjectAppMessage<EmojiReactionsAppMessage>) => {
			if (ev.data.event === 'emoji-reactions') {
				handleDisplayFlyingEmoji(ev.data.emoji);
			}
		},
		[handleDisplayFlyingEmoji]
	);

	const react = useCallback(
		(emoji: Emoji) => {
			sendAppMessage({ event: 'emoji-reactions', emoji });
			handleDisplayFlyingEmoji(emoji);
		},
		[handleDisplayFlyingEmoji, sendAppMessage]
	);

	return {
		react,
		onAppMessage,
	};
};
