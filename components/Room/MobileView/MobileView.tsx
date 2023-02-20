import { Flex } from '../../../ui/Flex';
import { Sidebar } from '../Sidebar';
import { BottomTray } from './BottomTray';
import { Header } from './Header';
import { RightTray } from './RightTray';
import { View } from './View';

export const MobileView = () => {
	return (
		<Flex
			css={{
				width: '100dvw',
				height: '100dvh',
				alignItems: 'center',
				justifyContent: 'center',
				background: '$background',
				color: '$baseText',
			}}
		>
			<Header />
			<View />
			<BottomTray />
			<RightTray />
			<Sidebar />
		</Flex>
	);
};
