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
