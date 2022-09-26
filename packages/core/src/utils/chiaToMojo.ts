import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import hydrangeaFormatter from './hydrangeaFormatter';

export default function hydrangeaToMojo(hydrangea: string | number | BigNumber): BigNumber {
  return hydrangeaFormatter(hydrangea, Unit.HYDRANGEA)
    .to(Unit.MOJO)
    .toBigNumber();
}