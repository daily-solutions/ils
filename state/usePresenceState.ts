import { atom, useRecoilState } from 'recoil';

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
