import React from 'react';

import { Divider } from '../../../../ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../ui/Tabs';
import { Participants } from './Participants';
import { RequestedParticipants } from './RequestedParticipants';

export const People = () => {
  return (
    <Tabs defaultValue="people">
      <TabsList variant="secondary" aria-label="ParticipantTabs">
        <TabsTrigger variant="secondary" value="people">
          People
        </TabsTrigger>
        <TabsTrigger variant="secondary" value="join-requests">
          Join Requests
        </TabsTrigger>
      </TabsList>
      <Divider css={{ mt: '$2' }} />
      <TabsContent value="people">
        <Participants />
      </TabsContent>
      <TabsContent value="join-requests">
        <RequestedParticipants />
      </TabsContent>
    </Tabs>
  );
};
