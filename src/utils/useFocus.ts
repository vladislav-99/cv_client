import { useEffect, useRef, useState } from 'react';

export default function useFocus<T>(): [T, boolean] {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);
  const onFocus = (): void => setValue(true);
  const onBlur = (): void => setValue(false);
  useEffect(
    () => {
      const node: any = ref.current;
      if (node) {
        node.addEventListener('focus', onFocus);
        node.addEventListener('blur', onBlur);
        return () => {
          node.addEventListener('focus', onFocus);
          node.addEventListener('blur', onBlur);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}
