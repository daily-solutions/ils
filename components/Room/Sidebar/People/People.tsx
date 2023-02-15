import {
	useLocalSessionId,
	useParticipantProperty,
} from '@daily-co/daily-react';
import React from 'react';

import { Divider } from '../../../../ui/Divider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../ui/Tabs';
import { Participants } from './Participants';
import { RequestedParticipants } from './RequestedParticipants';
import { Viewers } from './Viewers';

export const People = () => {
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');

	return (
		<>
			{isOwner ? (
				<Tabs defaultValue="participants">
					<TabsList variant="secondary" aria-label="ParticipantTabs">
						<TabsTrigger variant="secondary" value="participants">
							People
						</TabsTrigger>
						<TabsTrigger variant="secondary" value="viewers">
							Viewers
						</TabsTrigger>
						<TabsTrigger variant="secondary" value="requested">
							Requested
						</TabsTrigger>
					</TabsList>
					<Divider css={{ mt: '$2' }} />
					<TabsContent value="participants">
						<Participants />
					</TabsContent>
					<TabsContent value="viewers">
						<Viewers />
					</TabsContent>
					<TabsContent value="requested">
						<RequestedParticipants />
					</TabsContent>
				</Tabs>
			) : (
				<Participants />
			)}
		</>
	);
};