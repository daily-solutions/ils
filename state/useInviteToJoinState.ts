import { atom, useRecoilState } from 'recoil';

export const inviteToJoinState = atom<boolean>({
  key: 'invite-to-join-state',
  default: false,
});

export const useInviteToJoin = () => useRecoilState(inviteToJoinState);
