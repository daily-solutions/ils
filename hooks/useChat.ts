import { DailyEventObjectAppMessage } from '@daily-co/daily-js';
import {
  useAppMessage,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import { useCallback } from 'react';

import { Emoji, useMessages } from '../contexts/UIState';

export const emojis: Emoji[] = [
  '👏',
  '👍',
  '👎',
  '👋',
  '❤️',
  '😂',
  '🤯',
  '🔥',
  '🎉',
];

type ReactionMsg = {
  event: 'react-msg';
  messageId: string;
  emoji: Emoji;
};

type ChatMsg = {
  id: string;
  event: 'chat-message';
  message: string;
  userName: string;
  avatar: string;
  reactions: Record<Emoji, string[]>;
  poll?: {
    question: string;
    options: string[];
    votes: Record<string, string[]>;
  };
};

export type ChatAppMessage = ChatMsg | ReactionMsg;

export const getReactions = () => {
  return {
    '👏': [],
    '👍': [],
    '👎': [],
    '👋': [],
    '❤️': [],
    '😂': [],
    '🤯': [],
    '🔥': [],
    '🎉': [],
    '📊': [],
  };
};

export const useChat = () => {
  const localSessionId = useLocalSessionId();
  const [userName, userData] = useParticipantProperty(
    localSessionId as string,
    ['user_name', 'userData']
  );
  const [, setChatMsgs] = useMessages();
  const sendAppMessage = useAppMessage();

  const onAppMessage = useCallback(
    (ev: DailyEventObjectAppMessage<ChatAppMessage>) => {
      switch (ev.data.event) {
        case 'chat-message':
          const event = ev as DailyEventObjectAppMessage<ChatMsg>;
          setChatMsgs((msgs) => [
            ...msgs,
            {
              ...event.data,
              reactions: getReactions(),
              fromId: event.fromId,
              receivedAt: new Date(),
              isLocal: false,
            },
          ]);
          break;
        case 'react-msg':
          const reactMsgEvent = ev as DailyEventObjectAppMessage<ReactionMsg>;
          setChatMsgs((msgs) => {
            const prevMsgs = [...msgs];
            const msgIndex = msgs.findIndex(
              (msg) => msg.id === reactMsgEvent.data.messageId
            );
            const alreadyReacted = prevMsgs[msgIndex].reactions[
              reactMsgEvent.data.emoji
            ].includes(ev.fromId);
            prevMsgs[msgIndex] = {
              ...prevMsgs[msgIndex],
              reactions: {
                ...prevMsgs[msgIndex].reactions,
                [reactMsgEvent.data.emoji]: alreadyReacted
                  ? [
                      ...prevMsgs[msgIndex].reactions[reactMsgEvent.data.emoji],
                    ].filter((id) => id !== ev.fromId)
                  : [
                      ...prevMsgs[msgIndex].reactions[reactMsgEvent.data.emoji],
                      ev.fromId,
                    ],
              },
            };
            return prevMsgs;
          });
          break;
        default:
          break;
      }
    },
    [setChatMsgs]
  );

  const sendMessage = useCallback(
    (message: string) => {
      const avatar = (userData as any)?.avatar;
      const messageId = crypto.randomUUID();
      sendAppMessage({
        event: 'chat-message',
        id: messageId,
        message,
        userName,
        avatar,
      });
      setChatMsgs((msgs) => [
        ...msgs,
        {
          id: messageId,
          message,
          userName,
          avatar: avatar,
          reactions: getReactions(),
          fromId: localSessionId as string,
          isLocal: true,
          receivedAt: new Date(),
        },
      ]);
    },
    [localSessionId, sendAppMessage, setChatMsgs, userData, userName]
  );

  const reactToMsg = useCallback(
    (messageId: string, emoji: Emoji) => {
      sendAppMessage({
        event: 'react-msg',
        messageId,
        emoji,
      });
      setChatMsgs((msgs) => {
        const prevMsgs = [...msgs];
        const msgIndex = msgs.findIndex((msg) => msg.id === messageId);
        const alreadyReacted = prevMsgs[msgIndex].reactions[emoji].includes(
          localSessionId as string
        );
        prevMsgs[msgIndex] = {
          ...prevMsgs[msgIndex],
          reactions: {
            ...prevMsgs[msgIndex].reactions,
            [emoji]: alreadyReacted
              ? [...prevMsgs[msgIndex].reactions[emoji]].filter(
                  (id) => id !== localSessionId
                )
              : [...prevMsgs[msgIndex].reactions[emoji], localSessionId],
          },
        };
        return prevMsgs;
      });
    },
    [localSessionId, sendAppMessage, setChatMsgs]
  );

  return {
    sendMessage,
    reactToMsg,
    onAppMessage,
  };
};
