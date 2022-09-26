import PlotterName from './PlotterName';
import optionsForPlotter from '../utils/optionsForPlotter';
import defaultsForPlotter from '../utils/defaultsForPlotter';

export default {
  displayName: 'Hydrangea Proof of Space',
  options: optionsForPlotter(PlotterName.CHIAPOS),
  defaults: defaultsForPlotter(PlotterName.CHIAPOS),
  installInfo: { installed: true },
};
