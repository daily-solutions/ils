import { useSidebar } from '../../../contexts/UIState';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Box } from '../../../ui/Box';
import { Card } from '../../../ui/Card';
import { Divider } from '../../../ui/Divider';
import { Icon } from '../../../ui/Icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/Tabs';
import { Chat } from './Chat';
import { People } from './People';

export const Sidebar = () => {
	const [sidebar] = useSidebar();
	const md = useMediaQuery('(min-width: 800px)');

	if (!sidebar) return null;

	return (
		<Card
			css={{
				position: md ? 'initial' : 'absolute',
				width: md ? '20rem' : '100%',
				height: md ? 'auto' : 'calc(100% - 80px)',
				boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.05)',
				padding: 0,
			}}
		>
			<Tabs defaultValue="chat">
				<Box css={{ p: '$3' }}>
					<TabsList aria-label="Sidebar">
						<TabsTrigger value="chat">
							<Icon icon="chat" />
						</TabsTrigger>
						<TabsTrigger value="participants">
							<Icon icon="user" />
						</TabsTrigger>
					</TabsList>
				</Box>
				<Divider css={{ mt: '$2' }} />
				<TabsContent value="chat">
					<Chat />
				</TabsContent>
				<TabsContent value="participants">
					<People />
				</TabsContent>
			</Tabs>
		</Card>
	);
};
