import React from 'react';

import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';

interface Props {
	isPrev?: boolean;
	onClick: () => void;
}

export const PaginationButton = ({ isPrev = true, onClick }: Props) => {
	return (
		<Box
			css={{
				...(isPrev
					? { left: 0, justifyContent: 'flex-start' }
					: { right: 0, justifyContent: 'flex-end' }),
				display: 'flex',
				position: 'absolute',
				top: '50%',
				transform: 'translateY(-50%)',
				zIndex: 10,
			}}
		>
			<Button
				variant="outline"
				size="pagination"
				onClick={onClick}
				css={{
					...(isPrev
						? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
						: { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
				}}
			>
				<Icon icon={isPrev ? 'arrow_left' : 'arrow_right'} />
			</Button>
		</Box>
	);
};
