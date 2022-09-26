import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { useCurrencyCode, mojoToHydrangeaLocaleString, CardSimple, useLocale } from '@hydrangea/core';
import { useGetFarmedAmountQuery } from '@hydrangea/api-react';

export default function FarmCardTotalHydrangeaFarmed() {
  const currencyCode = useCurrencyCode();
  const [locale] = useLocale();
  const { data, isLoading, error } = useGetFarmedAmountQuery();

  const farmedAmount = data?.farmedAmount;

  const totalHydrangeaFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      return (
        <>
          {mojoToHydrangeaLocaleString(farmedAmount, locale)}
          &nbsp;
          {currencyCode}
        </>
      );
    }
  }, [farmedAmount, locale, currencyCode]);

  return (
    <CardSimple
      title={<Trans>Total Hydrangea Farmed</Trans>}
      value={totalHydrangeaFarmed}
      loading={isLoading}
      error={error}
    />
  );
}
