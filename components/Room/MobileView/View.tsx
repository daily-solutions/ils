import { DailyParticipant } from '@daily-co/daily-js';
import { useParticipantIds } from '@daily-co/daily-react';
import { useCallback, useMemo } from 'react';

import { Grid } from '../../../ui/Grid';
import { Tile } from '../../Tile';

export const View = () => {
	const participantIds = useParticipantIds({
		filter: useCallback(
			(p: DailyParticipant) =>
				Boolean(
					p?.permissions?.canSend &&
						(p.owner || (p?.userData as any)?.['onStage'])
				),
			[]
		),
	});

	const { cols, rows } = useMemo(() => {
		const rows = Math.ceil(Math.sqrt(participantIds.length));
		const cols = Math.ceil(participantIds.length / rows);
		return { rows, cols };
	}, [participantIds]);

	return (
		<Grid
			css={{
				width: '100dvw',
				height: '100dvh',
				gridTemplateColumns: `repeat(${cols}, 1fr)`,
				gridTemplateRows: `repeat(${rows}, 1fr)`,
			}}
		>
			{participantIds.length > 0
				? participantIds.map((p) => (
						<Tile sessionId={p} aspectRatio={9 / 16} key={p} isMobile />
				  ))
				: 'Please wait till host joins the call'}
		</Grid>
	);
};
