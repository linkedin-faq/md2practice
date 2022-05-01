import React from 'react';

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize
 *  functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

/* istanbul ignore file */
export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  overwritePrev: boolean = false,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) {
  const [state, setState] = React.useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key && overwritePrev) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState] as const;
}
