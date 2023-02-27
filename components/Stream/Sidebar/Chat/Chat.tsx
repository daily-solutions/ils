import React, { useEffect, useRef } from 'react';

import { useMessages, useSidebar } from '../../../../contexts/UIState';
import { Box, Button, Divider, Flex, Icon, Text } from '../../../../ui';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';

interface Props {
  withHeader?: boolean;
}

export const Chat = ({ withHeader = false }: Props) => {
  const [, setSidebar] = useSidebar();
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages] = useMessages();

  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;

    if (chat.scrollTop !== chat.scrollHeight)
      chat.scrollTop = chat.scrollHeight;
  }, [messages]);

  return (
    <Flex
      css={{
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        maxHeight: withHeader ? 'calc(100% - 15px)' : 'calc(100dvh - 100px)',
      }}
    >
      {withHeader && (
        <Flex
          css={{
            height: '44px',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: '$1 $4',
          }}
        >
          <Text>Chat</Text>
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
      <Box
        ref={chatRef}
        css={{
          flex: 1,
          p: '$2 0',
          overflowY: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <ChatMessage key={message.id} id={message.id} />
          ))
        ) : (
          <Flex
            css={{
              flexFlow: 'column wrap',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              p: '$4',
              rowGap: '$4',
              color: '$muted',
            }}
          >
            <Flex
              css={{
                alignItems: 'center',
                justifyContent: 'center',
                background: '$secondary',
                br: '50%',
                width: 64,
                height: 64,
              }}
            >
              <Icon icon="sad_emoji" size={32} />
            </Flex>
            <Flex
              css={{
                flexFlow: 'column wrap',
                gap: '$2',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>It’s awful quiet in here</Text>
              <Text>(why not send a message?)</Text>
            </Flex>
          </Flex>
        )}
      </Box>
      <Divider />
      <ChatInput />
    </Flex>
  );
};
