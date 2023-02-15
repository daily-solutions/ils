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

	if (!md || !sidebar) return null;

	return (
		<Card
			css={{
				width: '20rem',
				boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.03)',
				padding: 0,
				maxWidth: '100dvh',
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
