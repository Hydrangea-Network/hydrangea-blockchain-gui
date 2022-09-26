import { useMemo } from 'react';
import type { Wallet } from '@hydrangea/api';
import { WalletType } from '@hydrangea/api';
import BigNumber from 'bignumber.js';
import { mojoToCATLocaleString, mojoToHydrangeaLocaleString, useLocale } from '@hydrangea/core';

export default function useWalletHumanValue(wallet: Wallet, value?: string | number | BigNumber, unit?: string): string {
  const [locale] = useLocale();
  
  return useMemo(() => {
    if (wallet && value !== undefined) {
      const localisedValue = wallet.type === WalletType.CAT
        ? mojoToCATLocaleString(value, locale)
        : mojoToHydrangeaLocaleString(value, locale);

      return `${localisedValue} ${unit}`;
    }

    return '';
  }, [wallet, value, unit, locale]);
}
