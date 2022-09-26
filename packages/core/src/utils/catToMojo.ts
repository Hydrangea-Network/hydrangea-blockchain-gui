import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import hydrangeaFormatter from './hydrangeaFormatter';

export default function catToMojo(cat: string | number | BigNumber): BigNumber {
  return hydrangeaFormatter(cat, Unit.CAT)
    .to(Unit.MOJO)
    .toBigNumber();
}