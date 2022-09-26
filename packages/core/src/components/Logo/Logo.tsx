import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps } from '@mui/material';
import { Hydrangea } from '@hydrangea/icons';

const StyledHydrangea = styled(Hydrangea)`
  max-width: 100%;
  width: auto;
  height: auto;
`;

export default function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <StyledHydrangea />
    </Box>
  );
}
