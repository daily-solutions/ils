import { atom, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';

export type Emoji =
  | '👏'
  | '👍'
  | '👎'
  | '👋'
  | '❤️'
  | '😂'
  | '🤯'
  | '🔥'
  | '🎉'
  | '📊';

export type ChatMessage = {
  id: string;
  message: string;
  fromId: string;
  userName: string;
  isLocal: boolean;
  receivedAt: Date;
  avatar: string;
  reactions: Record<Emoji, string[]>;
  poll?: {
    question: string;
    options: string[];
    votes: Record<string, string[]>;
  };
};

export const chatState = atom<ChatMessage[]>({
  key: 'chat-message',
  default: [],
});

export const useMessages = () => useRecoilState(chatState);

const messageSelector = selectorFamily({
  key: 'MessageSelector',
  get:
    (id) =>
    ({ get }) => {
      return get(chatState).find((msg) => msg.id === id);
    },
});

export const useMessage = (id: string) => useRecoilValue(messageSelector(id));
