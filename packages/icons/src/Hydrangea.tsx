import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import HydrangeaIcon from './images/hydrangea_logo.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={HydrangeaIcon} viewBox="0 0 150 58" {...props} />;
}
