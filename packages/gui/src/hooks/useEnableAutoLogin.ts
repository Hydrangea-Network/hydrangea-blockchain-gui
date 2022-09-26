import { useLocalStorage } from '@hydrangea/core';

export default function useEnableAutoLogin() {
  return useLocalStorage<boolean>('enableAutoLogin', true);
}
