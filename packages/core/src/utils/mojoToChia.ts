import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import hydrangeaFormatter from './hydrangeaFormatter';

export default function mojoToHydrangea(mojo: string | number | BigNumber): BigNumber {
  return hydrangeaFormatter(mojo, Unit.MOJO)
    .to(Unit.HYDRANGEA)
    .toBigNumber();
}