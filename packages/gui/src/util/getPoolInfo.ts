import type { PoolInfo } from '@hydrangea/api';
import { toCamelCase } from '@hydrangea/api';

export default async function getPoolInfo(poolUrl: string): PoolInfo {
  const url = `${poolUrl}/pool_info`;
  const response = await fetch(url);
  const data = await response.json();

  return toCamelCase(data);
}
