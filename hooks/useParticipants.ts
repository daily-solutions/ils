import { DailyParticipant } from '@daily-co/daily-js';
import { useParticipantIds } from '@daily-co/daily-react';
import { useCallback } from 'react';

export const useParticipants = (
	onStage: boolean = true,
	sort: 'joined_at' | 'user_name' = 'joined_at'
) => {
	return useParticipantIds({
		filter: useCallback(
			(p: DailyParticipant) =>
				Boolean(
					p?.permissions?.canSend &&
						(onStage ? p.owner || (p?.userData as any)?.['onStage'] : true)
				),
			[onStage]
		),
		sort: useCallback(
			(a: DailyParticipant, b: DailyParticipant) => {
				if (a.local || b.local) return 1;

				if (sort === 'joined_at') {
					const aJoinedAt = a.joined_at ?? new Date();
					const bJoinedAt = b.joined_at ?? new Date();
					if (aJoinedAt < bJoinedAt) return -1;
					if (aJoinedAt > bJoinedAt) return 1;
					return 0;
				} else {
					const aUserName = (a.user_name ?? 'Guest').toLowerCase();
					const bUserName = (b.user_name ?? 'Guest').toLowerCase();
					if (aUserName < bUserName) return -1;
					if (aUserName > bUserName) return 1;
					return 0;
				}
			},
			[sort]
		),
	});
};
