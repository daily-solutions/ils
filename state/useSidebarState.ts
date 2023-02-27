import { atom, useRecoilState } from 'recoil';

export const sidebarState = atom<'chat' | 'people' | null>({
  key: 'sidebar-state',
  default: null,
});

export const useSidebar = () => useRecoilState(sidebarState);
