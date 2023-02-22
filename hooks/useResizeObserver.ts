import React, { useEffect, useState } from 'react';

type ResizeObserverCallback = (width: number, height: number) => void;

export const useResizeObserver = (
  ref: React.RefObject<HTMLElement>,
  callback: ResizeObserverCallback
) => {
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    if (typeof ResizeObserver !== 'undefined' && isPageVisible) {
      let frame: ReturnType<typeof requestAnimationFrame>;
      const resizeObserver = new ResizeObserver(() => {
        if (!ref.current) return;
        const { height, width } = ref.current.getBoundingClientRect();
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          callback(width, height);
        });
      });
      resizeObserver.observe(ref.current);
      return () => {
        resizeObserver.disconnect();
      };
    }

    let lastWidth: number;
    let lastHeight: number;
    const interval = setInterval(() => {
      if (!ref.current) return;
      const { height, width } = ref.current.getBoundingClientRect();
      if (width !== lastWidth || height !== lastHeight) {
        callback(width, height);
        lastWidth = width;
        lastHeight = height;
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [callback, isPageVisible, ref]);
};
