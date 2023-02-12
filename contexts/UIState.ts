import { atom, useRecoilState } from 'recoil';

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

export interface ChatMessage {
	id: string;
	message: string;
	fromId: string;
	userName: string;
	isLocal: boolean;
	receivedAt: Date;
}

export const chatState = atom<ChatMessage[]>({
	key: 'chat-message',
	default: [],
});

export const useMessages = () => useRecoilState(chatState);

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
