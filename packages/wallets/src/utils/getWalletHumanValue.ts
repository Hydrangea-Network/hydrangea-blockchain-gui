import type { Wallet } from '@hydrangea/api';
import { WalletType } from '@hydrangea/api';
import { mojoToCATLocaleString, mojoToChiaLocaleString } from '@hydrangea/core';

export default function getWalletHumanValue(wallet: Wallet, value: number): string {
  return wallet.type === WalletType.CAT
    ? mojoToCATLocaleString(value)
    : mojoToChiaLocaleString(value);
}
