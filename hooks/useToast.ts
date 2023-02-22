import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

import { ToastVariant } from '../ui/Toast';

type BringToStage = {
  type: 'bringToStage';
  bringToStage: () => void;
};

type ToastAction = BringToStage;

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
  isShown: boolean;
  actions?: ToastAction;
  avatar?: string;
}

type InputToast = {
  id?: string;
  title: string;
  description?: string;
  duration?: number;
  actions?: ToastAction;
  avatar?: string;
};

const toastsState = atom<Record<string, Toast>>({
  key: 'toasts-state',
  default: {},
});

export const useToasts = () => {
  const [toasts, setToasts] = useRecoilState(toastsState);

  const notify = useCallback(
    (
      variant: ToastVariant,
      {
        actions = undefined,
        avatar = undefined,
        description = '',
        duration = 5000,
        id = crypto.randomUUID(),
        title,
      }: InputToast
    ) => {
      setToasts((toasts) => {
        const newToast = {
          id,
          title,
          description,
          variant,
          duration,
          actions,
          avatar,
          isShown: true,
        };
        return { ...toasts, [newToast.id]: newToast };
      });
    },
    [setToasts]
  );

  const close = useCallback(
    (id: string) =>
      setToasts((toasts) => {
        const newToasts = { ...toasts };
        delete newToasts[id];
        return newToasts;
      }),
    [setToasts]
  );

  const closeAll = useCallback(() => setToasts({}), [setToasts]);

  return {
    toasts,
    toaster: { notify, close, closeAll },
  };
};
