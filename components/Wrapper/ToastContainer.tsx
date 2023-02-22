import React from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useToasts } from '../../hooks/useToast';
import { Button } from '../../ui/Button';
import { Flex } from '../../ui/Flex';
import { Toast } from '../../ui/Toast';

export const ToastContainer = () => {
  const { toaster, toasts } = useToasts();
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <>
      {Object.keys(toasts).map((id) => (
        <Toast
          {...toasts[id]}
          avatar={toasts[id]?.avatar}
          key={id}
          open={toasts[id].isShown}
          setOpen={() => toaster.close(id)}
        >
          {toasts[id]?.actions?.type === 'bringToStage' && (
            <Flex
              css={{
                gap: '$2',
                flexDirection: isMobile ? 'column' : 'row',
              }}
            >
              <Button onClick={() => toasts[id]?.actions?.bringToStage()}>
                Bring to stage
              </Button>
              <Button variant="secondary" onClick={() => toaster.close(id)}>
                Decide later
              </Button>
            </Flex>
          )}
        </Toast>
      ))}
    </>
  );
};
