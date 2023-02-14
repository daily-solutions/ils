import { atom, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';

export type MeetingState =
	| 'new'
	| 'lobby'
	| 'joining-meeting'
	| 'joined-meeting'
	| 'left-meeting';

export const meetingState = atom<MeetingState>({
	key: 'meeting-state',
	default: 'new',
});

export const useMeetingState = () => useRecoilState(meetingState);

export type Emoji =
	| '👏'
	| '👍'
	| '👎'
	| '👋'
	| '❤️'
	| '😂'
	| '🤯'
	| '🔥'
	| '🎉';

export interface ChatMessage {
	id: string;
	message: string;
	fromId: string;
	userName: string;
	isLocal: boolean;
	receivedAt: Date;
	avatar: string;
	reactions: Record<Emoji, string[]>;
}

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

export type PresenceParticipant = {
	id: string;
	userId: string | null;
	userName: string;
	joinTime: string;
	duration: number;
	room: string;
};

export const viewersState = atom<PresenceParticipant[]>({
	key: 'viewers-state',
	default: [],
});

export const useViewers = () => useRecoilState(viewersState);

export const sidebarState = atom<'chat' | 'people' | null>({
	key: 'sidebar-state',
	default: null,
});

export const useSidebar = () => useRecoilState(sidebarState);
