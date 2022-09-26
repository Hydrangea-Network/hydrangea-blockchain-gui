import { WalletType } from '@hydrangea/api';
import type { Wallet } from '@hydrangea/api';

export default function getWalletPrimaryTitle(wallet: Wallet): string {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'Hydrangea';
    default:
      return wallet.meta?.name ?? wallet.name;
  }
}
