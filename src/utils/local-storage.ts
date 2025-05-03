import type {
  LocalStorageKeyEnum,
  TLocalStorageTypeMapping,
} from "@/static/constants/local-storage";

export function getLocalStorage<T extends LocalStorageKeyEnum>(
  key: T,
  defaultValue: TLocalStorageTypeMapping[T],
): TLocalStorageTypeMapping[T];

export function getLocalStorage<T extends LocalStorageKeyEnum>(
  key: T,
  defaultValue?: undefined,
): TLocalStorageTypeMapping[T] | null;

export function getLocalStorage<T extends LocalStorageKeyEnum>(
  key: T,
  defaultValue?: TLocalStorageTypeMapping[T],
): TLocalStorageTypeMapping[T] | null {
  const data = localStorage.getItem(key);

  if (data === null && defaultValue !== undefined) {
    setLocalStorage(key, defaultValue);
  }
  try {
    if (data !== null) {
      return JSON.parse(data) as TLocalStorageTypeMapping[T];
    }
    return defaultValue ?? null;
  } catch (err) {
    console.error(`Error Parsing LocalStorage for key ${key}`, err);
    return defaultValue ?? null;
  }
}

export const setLocalStorage = <T extends LocalStorageKeyEnum>(
  key: T,
  value: TLocalStorageTypeMapping[T],
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: LocalStorageKeyEnum) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
