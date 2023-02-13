import React from 'react';

import { Divider } from '../../../../ui/Divider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../ui/Tabs';
import { ChatView } from './ChatView';

export const Chat = () => {
	return (
		<Tabs defaultValue="messages">
			<TabsList variant="secondary" aria-label="ChatTabs">
				<TabsTrigger variant="secondary" value="messages">
					Chat
				</TabsTrigger>
				<TabsTrigger variant="secondary" value="questions">
					Questions
				</TabsTrigger>
			</TabsList>
			<Divider css={{ mt: '$2' }} />
			<TabsContent value="messages">
				<ChatView />
			</TabsContent>
			<TabsContent value="questions">
				<ChatView />
			</TabsContent>
		</Tabs>
	);
};
