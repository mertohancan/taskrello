import React, { useRef, useCallback, useEffect, RefObject } from 'react';

const useMouseCapture = (eventHandler: (evt: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    document.addEventListener('mousedown', eventHandler);
    document.addEventListener('touchstart', eventHandler);

    return (): void => {
      document.removeEventListener('mousedown', eventHandler);
      document.removeEventListener('touchstart', eventHandler);
    };
  }, [eventHandler]);
};

export const useClickOutside = (handler: () => void): { refElement: RefObject<HTMLElement> } => {
  const refElement = useRef<HTMLElement>(null);

  const handleClick = useCallback(
    ({ target }: MouseEvent | TouchEvent): void => {
      if (refElement?.current?.contains(target as Node)) return;

      handler();
    },
    [handler]
  );

  useMouseCapture(handleClick);

  return { refElement };
};
