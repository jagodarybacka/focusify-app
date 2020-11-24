import { useEffect, useRef } from 'react';

export default function useTimeout(callback, duration) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (duration !== null) {
      const id = setTimeout(() => savedCallback.current(), duration);

      return () => clearTimeout(id);
    }
  }, [duration]);
}
