import { atom, useRecoilState } from 'recoil';

export const pollState = atom<boolean>({
  key: 'poll-state',
  default: false,
});

export const usePoll = () => useRecoilState(pollState);

export const pollQuestionState = atom<string>({
  key: 'poll-question-state',
  default: '',
});

export const usePollQuestion = () => useRecoilState(pollQuestionState);

export const pollOptionsState = atom<string[]>({
  key: 'poll-options-state',
  default: ['', ''],
});

export const usePollOptions = () => useRecoilState(pollOptionsState);

export const viewPollState = atom<string | null>({
  key: 'view-poll-state',
  default: null,
});

export const useViewPoll = () => useRecoilState(viewPollState);
