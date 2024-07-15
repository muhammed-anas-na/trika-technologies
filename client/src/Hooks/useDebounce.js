import { useRef } from 'react';

function useDebounce(fn, delay) {
  const timeoutRef = useRef(null);

  function debouncedFn(...args) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
export default useDebounce;
