import { createApi } from '@reduxjs/toolkit/query/react';
import hydrangeaLazyBaseQuery from './hydrangeaLazyBaseQuery';

export const baseQuery = hydrangeaLazyBaseQuery({});

export default createApi({
  reducerPath: 'hydrangeaApi',
  baseQuery,
  endpoints: () => ({}),
});
