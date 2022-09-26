import { useLocalStorage } from '@hydrangea/core';

export default function useEnableDataLayerService() {
  return useLocalStorage<boolean>('enableDataLayerService', false);
}
