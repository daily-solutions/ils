import { useLocalSessionId } from '@daily-co/daily-react';
import { useMemo } from 'react';

import { useCamSubscriptions } from './useCamSubscriptions';

interface Props {
	pageSize: number;
	currentPage: number;
	participantIds: string[];
	currentIds: string[];
}

export const useTrackSubscriptions = ({
	currentIds,
	currentPage,
	pageSize,
	participantIds,
}: Props) => {
	const localSessionId = useLocalSessionId();
	const camSubscriptions = useMemo(() => {
		const maxSubs = 3 * pageSize;

		let renderedOrBufferedIds: string[];
		switch (currentPage) {
			case 1:
				renderedOrBufferedIds = participantIds.slice(
					0,
					Math.min(maxSubs, 2 * pageSize)
				);
				break;
			case Math.ceil(participantIds.length / pageSize):
				renderedOrBufferedIds = participantIds.slice(
					-Math.min(maxSubs, 2 * pageSize)
				);
				break;
			default:
				{
					const buffer = Math.floor((maxSubs - pageSize) / 2);
					const min = Math.max(0, (currentPage - 1) * pageSize - buffer);
					const max = Math.min(
						participantIds.length,
						currentPage * pageSize + buffer
					);
					renderedOrBufferedIds = participantIds.slice(min, max);
				}
				break;
		}

		const subscribedIds: string[] = [];
		const stagedIds: string[] = [];

		for (const id of renderedOrBufferedIds) {
			if (id !== localSessionId) {
				if (currentIds.includes(id)) {
					subscribedIds.push(id);
				} else {
					stagedIds.push(id);
				}
			}
		}

		return {
			subscribedIds,
			stagedIds,
		};
	}, [pageSize, currentPage, participantIds, localSessionId, currentIds]);

	useCamSubscriptions(
		camSubscriptions?.subscribedIds,
		camSubscriptions?.stagedIds
	);
};
