import { useEffect, useRef } from 'react';

export default function useInterval(callback, duration) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (duration !== null) {
      const id = setInterval(() => savedCallback.current(), duration);

      return () => clearInterval(id);
    }
  }, [duration]);
}
