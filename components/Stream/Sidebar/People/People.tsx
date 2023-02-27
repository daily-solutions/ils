import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React from 'react';

import { useStage } from '../../../../hooks/useStage';
import { useSidebar } from '../../../../state';
import { Badge, Box, Button, Divider, Flex, Icon, Text } from '../../../../ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../ui/Tabs';
import { Participants } from './Participants';
import { RequestedParticipants } from './RequestedParticipants';

interface Props {
  withHeader?: boolean;
}

export const People = ({ withHeader = false }: Props) => {
  const [, setSidebar] = useSidebar();
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');

  const { requestedParticipants } = useStage();

  return (
    <Box>
      {withHeader && (
        <Flex
          css={{
            height: '44px',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: '$1 $4',
          }}
        >
          <Text>People</Text>
          <Button
            variant="ghost"
            size="pagination"
            onClick={() => setSidebar(null)}
          >
            <Icon icon="cross" />
          </Button>
        </Flex>
      )}
      {withHeader && <Divider />}
      {isOwner ? (
        <Tabs defaultValue="people">
          <TabsList variant="secondary" aria-label="ParticipantTabs">
            <TabsTrigger variant="secondary" value="people">
              People
            </TabsTrigger>
            <TabsTrigger variant="secondary" value="join-requests">
              <Flex
                css={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '$1',
                }}
              >
                Join Requests{' '}
                <Badge size="xs" color="primary">
                  {Object.keys(requestedParticipants).length}
                </Badge>
              </Flex>
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
      ) : (
        <Participants />
      )}
    </Box>
  );
};
