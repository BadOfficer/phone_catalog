export function setItem<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);

    return data ? (JSON.parse(data) as T) : defaultValue;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return defaultValue;
  }
}

export function removeItem(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export const storage = {
  save: <T>(key: string, value: T) => setItem<T>(key, value),
  get: <T>(key: string, defaultValue: T) => getItem<T>(key, defaultValue),
  remove: (key: string) => removeItem(key),
};
