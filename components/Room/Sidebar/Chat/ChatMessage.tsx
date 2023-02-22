import Avatar from 'boring-avatars';
import Image from 'next/image';
import React, { useCallback, useMemo } from 'react';

import { useMessage, useSidebar } from '../../../../contexts/UIState';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import { usePolls } from '../../../../hooks/usePolls';
import Poll from '../../../../public/poll.svg';
import { Badge } from '../../../../ui/Badge';
import { Box } from '../../../../ui/Box';
import { Button } from '../../../../ui/Button';
import { Flex } from '../../../../ui/Flex';
import { Text } from '../../../../ui/Text';
import { ChatReact } from './ChatReact';
import { ChatReactions } from './ChatReactions';

const TextMessage = ({ message }: { message: string }) => {
  return (
    <Text size={2} css={{ color: '$muted', lineHeight: '130%' }}>
      {message}
    </Text>
  );
};

const PollMessage = ({ id, question }: { id: string; question: string }) => {
  const [, setSidebar] = useSidebar();
  const md = useMediaQuery('(min-width: 800px)');
  const { viewPoll } = usePolls();

  const handleViewPoll = useCallback(() => {
    if (!md) setSidebar(null);
    viewPoll(id);
  }, [id, md, setSidebar, viewPoll]);

  return (
    <Flex css={{ flexFlow: 'column wrap', gap: '$4' }}>
      <Text size={2} css={{ color: '$baseText', lineHeight: '130%' }}>
        {question}
      </Text>
      <Button fullWidth variant="orange" onClick={handleViewPoll}>
        View poll
      </Button>
    </Flex>
  );
};

interface Props {
  id: string;
}

export const ChatMessage = ({ id }: Props) => {
  const message = useMessage(id);

  const isPoll = useMemo(
    () => message?.poll?.question,
    [message?.poll?.question]
  );

  if (!message) return null;

  return (
    <Box
      css={{
        background: isPoll ? 'rgba(255, 238, 213, 0.35)' : 'inherit',
        p: '$3',
        '&:hover': {
          background: '$message',
          '.msg-react': { visibility: 'visible', opacity: 1 },
        },
      }}
    >
      {isPoll && (
        <Flex css={{ alignItems: 'center', gap: '$2', mb: '$3' }}>
          <Image src={Poll} alt="poll" />
          <Text
            css={{
              fontWeight: '$semibold',
              textTransform: 'uppercase',
              fontSize: '10px',
              color: '$orange',
            }}
          >
            Poll
          </Text>
        </Flex>
      )}
      <Flex
        css={{
          justifyContent: 'space-between',
          gap: '$3',
        }}
      >
        <Avatar
          size={44}
          name={message.avatar}
          variant="beam"
          colors={['#1BEBB9', '#00C9DF', '#2B3F56', '#D1FBF1']}
        />
        <Flex
          css={{
            position: 'relative',
            flexFlow: 'column wrap',
            flex: 1,
            gap: '$2',
          }}
        >
          <Flex
            css={{ flexFlow: 'column wrap', position: 'relative', gap: '$2' }}
          >
            <Flex css={{ alignItems: 'center', gap: '$1' }}>
              <Text
                css={{
                  fontWeight: '$semibold',
                  color: message.isLocal ? '$primary' : '$baseText',
                }}
              >
                {message.userName}
              </Text>
              {message.isLocal && (
                <Badge color="primary" size="xs">
                  You
                </Badge>
              )}
            </Flex>
            {isPoll ? (
              <PollMessage
                id={id}
                question={message.poll?.question as string}
              />
            ) : (
              <TextMessage message={message.message} />
            )}
            <ChatReact id={id} />
          </Flex>
          <ChatReactions id={id} />
        </Flex>
      </Flex>
    </Box>
  );
};
