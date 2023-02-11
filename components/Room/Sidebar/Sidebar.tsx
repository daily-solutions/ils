import { DailyParticipant } from '@daily-co/daily-js';
import {
	useLocalSessionId,
	useParticipantIds,
	useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback, useEffect, useState } from 'react';

import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useParticipantCounts } from '../../../hooks/useParticipantCount';
import { Box } from '../../../ui/Box';
import { Card } from '../../../ui/Card';
import { Divider } from '../../../ui/Divider';
import { Icon } from '../../../ui/Icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/Tabs';
import { Chat } from './Chat';
import { Participants } from './Participants';
import { Viewers } from './Viewers';

type PresenceParticipant = {
	id: string;
	userId: string | null;
	userName: string;
	joinTime: string;
	duration: number;
	room: string;
};

export const Sidebar = () => {
	const localSessionId = useLocalSessionId();
	const isOwner = useParticipantProperty(localSessionId as string, 'owner');
	const md = useMediaQuery('(min-width: 800px)');

	const [viewers, setViewers] = useState<PresenceParticipant[]>([]);
	const participantIds = useParticipantIds({
		filter: useCallback((p: DailyParticipant) => p.permissions.hasPresence, []),
	});
	const { hidden } = useParticipantCounts();

	const handleViewers = useCallback(
		(presenceParticipants: PresenceParticipant[]) => {
			const viewers = presenceParticipants.filter(
				(p) => !participantIds.includes(p.id)
			);
			setViewers(viewers);
		},
		[participantIds]
	);

	useEffect(() => {
		if (!isOwner || !md || hidden < 1) return;

		const fetchPresenceData = async () => {
			const presenceRes = await fetch(`${window.location.origin}/api/presence`);
			const { participants } = await presenceRes.json();
			handleViewers(participants);
		};

		fetchPresenceData();
	}, [handleViewers, hidden, isOwner, md]);

	if (!md) return null;

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
							<Chat />
						</TabsContent>
						<TabsContent value="questions">
							<Chat />
						</TabsContent>
					</Tabs>
				</TabsContent>
				<TabsContent value="participants">
					{viewers.length > 0 ? (
						<Tabs defaultValue="participants">
							<TabsList variant="secondary" aria-label="ParticipantTabs">
								<TabsTrigger variant="secondary" value="participants">
									Participants
								</TabsTrigger>
								<TabsTrigger variant="secondary" value="viewers">
									Viewers
								</TabsTrigger>
							</TabsList>
							<Divider css={{ mt: '$2' }} />
							<TabsContent value="participants">
								<Participants />
							</TabsContent>
							<TabsContent value="viewers">
								<Viewers viewers={viewers} />
							</TabsContent>
						</Tabs>
					) : (
						<Participants />
					)}
				</TabsContent>
			</Tabs>
		</Card>
	);
};
