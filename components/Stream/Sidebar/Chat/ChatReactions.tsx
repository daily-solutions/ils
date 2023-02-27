import { useLocalSessionId } from '@daily-co/daily-react';
import React from 'react';

import { emojis, useChat } from '../../../../hooks/useChat';
import { useMessage } from '../../../../state';
import { Button, Flex } from '../../../../ui';

interface Props {
  id: string;
}

export const ChatReactions = ({ id }: Props) => {
  const localSessionId = useLocalSessionId();
  const msg = useMessage(id);
  const { reactToMsg } = useChat();

  const emptyReactions = emojis.filter(
    (r) =>
      !(r in (msg?.reactions ?? {})) || (msg?.reactions?.[r]?.length ?? 0) === 0
  );

  if (!msg) return null;

  return (
    <Flex css={{ gap: '$1', flexFlow: 'row wrap' }}>
      {emojis
        .filter((r) => msg.reactions?.[r]?.length > 0)
        .sort((a, b) => {
          if (emptyReactions.includes(a) && !emptyReactions.includes(b))
            return 1;
          if (!emptyReactions.includes(a) && emptyReactions.includes(b))
            return -1;
          return 0;
        })
        .map((reaction) => {
          const hasReacted = msg.reactions?.[reaction].includes(
            localSessionId as string
          );
          const count = msg.reactions?.[reaction]?.length;
          return (
            <Button
              onClick={() => reactToMsg(id, reaction)}
              key={reaction}
              size="reaction"
              variant={hasReacted ? 'cyan' : 'secondary'}
            >
              {reaction} {count}
            </Button>
          );
        })}
    </Flex>
  );
};
