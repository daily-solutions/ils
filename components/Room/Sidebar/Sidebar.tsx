import {
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';

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
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');
	const [sidebar, setSidebar] = useSidebar();
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
			{isOwner ? (
				<Tabs
					value={sidebar}
					onValueChange={(value: string) =>
						setSidebar(value as 'chat' | 'people')
					}
				>
					<Box css={{ p: '$3' }}>
						<TabsList aria-label="Sidebar">
							<TabsTrigger value="chat">
								<Icon icon="chat" />
							</TabsTrigger>
							<TabsTrigger value="people">
								<Icon icon="user" />
							</TabsTrigger>
						</TabsList>
					</Box>
					<Divider css={{ mt: '$2' }} />
					<TabsContent value="chat">
						<Chat />
					</TabsContent>
					<TabsContent value="people">
						<People />
					</TabsContent>
				</Tabs>
			) : (
				<Chat withHeader />
			)}
		</Card>
	);
};
