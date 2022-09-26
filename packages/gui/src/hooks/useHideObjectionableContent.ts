import { useLocalStorage } from '@hydrangea/core';

export default function useHideObjectionableContent() {
  return useLocalStorage<boolean>('hideObjectionableContent', true);
}
