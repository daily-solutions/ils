import {
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import { useEffect } from 'react';

import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useSidebar } from '../../../state';
import { Box, Card, Divider, Icon } from '../../../ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/Tabs';
import { Chat } from './Chat';
import { People } from './People';

export const Sidebar = () => {
  const localSessionId = useLocalSessionId();
  const isOwner = useParticipantProperty(localSessionId as string, 'owner');
  const [sidebar, setSidebar] = useSidebar();
  const md = useMediaQuery('(min-width: 800px)');

  useEffect(() => {
    if (!isOwner) return;

    setSidebar(md ? 'chat' : null);
  }, [isOwner, md, setSidebar]);

  if (!sidebar) return null;

  return (
    <Card
      css={{
        position: md ? 'initial' : 'absolute',
        width: md ? (sidebar ? '20rem' : 0) : '100%',
        height: md ? 'auto' : '90%',
        boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.05)',
        padding: 0,
        zIndex: 100,
        br: '$none',
        bottom: 0,
      }}
    >
      {isOwner && md ? (
        <Tabs
          value={md ? sidebar ?? 'chat' : (sidebar as 'chat' | 'people')}
          onValueChange={(value: string) =>
            setSidebar(value as 'chat' | 'people')
          }
        >
          <Box css={{ p: '$3' }}>
            <TabsList aria-label="Sidebar">
              <TabsTrigger value="chat">
                <Icon icon="chat" size={16} />
              </TabsTrigger>
              <TabsTrigger value="people">
                <Icon icon="user" size={16} />
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
        <>
          {sidebar === 'chat' ? (
            <Chat withHeader />
          ) : (
            sidebar === 'people' && <People withHeader />
          )}
        </>
      )}
    </Card>
  );
};
