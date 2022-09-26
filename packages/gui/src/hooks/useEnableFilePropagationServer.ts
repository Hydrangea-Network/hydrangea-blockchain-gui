import { useLocalStorage } from '@hydrangea/core';

export default function useEnableFilePropagationServer() {
  return useLocalStorage<boolean>('enableFilePropagationServer', false);
}
