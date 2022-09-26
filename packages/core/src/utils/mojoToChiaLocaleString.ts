import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import hydrangeaFormatter from './hydrangeaFormatter';

export default function mojoToHydrangeaLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return hydrangeaFormatter(mojo, Unit.MOJO)
    .to(Unit.HYDRANGEA)
    .toLocaleString(locale);
}
