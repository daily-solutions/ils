import { DailyEventObjectActiveSpeakerChange } from '@daily-co/daily-js';
import { useDailyEvent, useLocalSessionId } from '@daily-co/daily-react';
import { useCallback, useState } from 'react';

interface Props {
	ignoreLocal?: boolean;
}

export const useActiveSpeakerId = ({ ignoreLocal = false }: Props) => {
	const localSessionId = useLocalSessionId();
	const [speakerId, setSpeakerId] = useState<string | null>(null);

	useDailyEvent(
		'active-speaker-change',
		useCallback(
			(ev: DailyEventObjectActiveSpeakerChange) => {
				const activeSpeakerId = ev.activeSpeaker.peerId;
				if (!activeSpeakerId) return;

				if (ignoreLocal && activeSpeakerId === localSessionId) {
					setSpeakerId(null);
				} else setSpeakerId(activeSpeakerId);
			},
			[ignoreLocal, localSessionId]
		)
	);

	return speakerId;
};
