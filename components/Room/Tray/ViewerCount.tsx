import React from 'react';

import { useParticipantCounts } from '../../../hooks/useParticipantCount';
import { Badge } from '../../../ui/Badge';

export const ViewerCount = () => {
	const { hidden } = useParticipantCounts();
	return <Badge>{hidden.toLocaleString('en-US')} viewers</Badge>;
};
