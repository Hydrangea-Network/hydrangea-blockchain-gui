import React, { useState, useMemo } from 'react';
import {
  Flex,
  LayoutDashboardSub,
  Loading,
  DropdownActions,
  MenuItem,
  /*useTrans,*/ usePersistState,
} from '@chia/core';
import { Trans } from '@lingui/macro';
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';
// import { defineMessage } from '@lingui/macro';
import { WalletReceiveAddressField } from '@chia/wallets';
import type { NFTInfo, Wallet } from '@chia/api';
import { useGetNFTWallets /*useGetNFTsByNFTIDsQuery*/ } from '@chia/api-react';
import { Box, Grid } from '@mui/material';
// import NFTGallerySidebar from './NFTGallerySidebar';
import NFTCardLazy from '../NFTCardLazy';
// import Search from './NFTGallerySearch';
import { NFTContextualActionTypes } from '../NFTContextualActions';
import type NFTSelection from '../../../types/NFTSelection';
import useFetchNFTs from '../../../hooks/useFetchNFTs';
import useHiddenNFTs from '../../../hooks/useHiddenNFTs';
import useHideObjectionableContent from '../../../hooks/useHideObjectionableContent';
import useNachoNFTs from '../../../hooks/useNachoNFTs';
import NFTProfileDropdown from '../NFTProfileDropdown';
import NFTGalleryHero from './NFTGalleryHero';
import { useLocalStorage } from '@chia/core';
import useNFTMetadata from '../../../hooks/useNFTMetadata';

export const defaultCacheSizeLimit = 1024; /* MB */

function searchableNFTContent(nft: NFTInfo) {
  const items = [nft.$nftId, nft.dataUris?.join(' ') ?? '', nft.launcherId];

  return items.join(' ').toLowerCase();
}

export default function NFTGallery() {
  const { wallets: nftWallets, isLoading: isLoadingWallets } =
    useGetNFTWallets();
  const { nfts, isLoading: isLoadingNFTs } = useFetchNFTs(
    nftWallets.map((wallet: Wallet) => wallet.id),
  );
  const noMetadataNFTs = nfts
    .filter((nft) => {
      return nft.metadataUris.length === 0;
    })
    .map((nft) => nft.$nftId);

  const { allowedNFTs } = useNFTMetadata(
    nfts,
    true,
  ); /* NFTs with metadata and no sensitive_content */

  const allAllowedNFTs = noMetadataNFTs.concat(allowedNFTs);

  const [isNFTHidden] = useHiddenNFTs();
  const isLoading = isLoadingWallets || isLoadingNFTs;
  const [search /*, setSearch*/] = useState<string>('');
  const [showHidden, setShowHidden] = usePersistState(false, 'showHiddenNFTs');
  const [hideObjectionableContent] = useHideObjectionableContent();

  const [walletId, setWalletId] = usePersistState<number | undefined>(
    undefined,
    'nft-profile-dropdown',
  );

  const { data: nachoNFTs } = useNachoNFTs();

  // const t = useTrans();
  const [selection, setSelection] = useState<NFTSelection>({
    items: [],
  });

  const [limitCacheSize] = useLocalStorage(
    `limit-cache-size`,
    defaultCacheSizeLimit,
  );

  React.useEffect(() => {
    if (limitCacheSize !== defaultCacheSizeLimit) {
      const ipcRenderer = (window as any).ipcRenderer;
      ipcRenderer?.invoke('setLimitCacheSize', limitCacheSize);
    }
  }, [limitCacheSize]);

  const filteredData = useMemo(() => {
    if (nachoNFTs && walletId === -1) {
      return nachoNFTs;
    }

    if (!nfts) {
      return nfts;
    }

    return nfts.filter((nft) => {
      if (walletId !== undefined && nft.walletId !== walletId) {
        return false;
      }

      if (!showHidden && isNFTHidden(nft)) {
        return false;
      }

      if (hideObjectionableContent && allAllowedNFTs.indexOf(nft.$nftId) === -1)
        return false;

      const content = searchableNFTContent(nft);
      if (search) {
        return content.includes(search.toLowerCase());
      }

      return true;
    });
  }, [
    search,
    walletId,
    nfts,
    isNFTHidden,
    showHidden,
    hideObjectionableContent,
    nachoNFTs,
    allAllowedNFTs,
  ]);

  function handleSelect(nft: NFTInfo, selected: boolean) {
    setSelection((currentSelection) => {
      const { items } = currentSelection;

      return {
        items: selected
          ? [...items, nft]
          : items.filter((item) => item.$nftId !== nft.$nftId),
      };
    });
  }

  function handleToggleShowHidden() {
    setShowHidden(!showHidden);
  }

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <LayoutDashboardSub
      // sidebar={<NFTGallerySidebar onWalletChange={setWalletId} />}
      header={
        <Flex
          gap={2}
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <NFTProfileDropdown onChange={setWalletId} walletId={walletId} />
          <Flex justifyContent="flex-end" alignItems="center">
            {/*
            <Search
              onChange={setSearch}
              value={search}
              placeholder={t(defineMessage({ message: `Search...` }))}
            />
            */}
            {/*
            <NFTContextualActions selection={selection} />
            */}
            <Box width={{ xs: 300, sm: 330, md: 600, lg: 780 }}>
              <Flex gap={1}>
                <WalletReceiveAddressField
                  variant="outlined"
                  size="small"
                  fullWidth
                />
                <DropdownActions
                  label={<Trans>Filters</Trans>}
                  startIcon={<FilterListIcon />}
                  endIcon={undefined}
                  variant="text"
                  color="secondary"
                  size="large"
                >
                  <MenuItem onClick={handleToggleShowHidden}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch checked={showHidden} />}
                        label={<Trans>Show Hidden</Trans>}
                      />
                    </FormGroup>
                  </MenuItem>
                </DropdownActions>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      }
    >
      {!filteredData?.length ? (
        <NFTGalleryHero />
      ) : (
        <Grid spacing={2} alignItems="stretch" container>
          {filteredData?.map((nft: NFTInfo) => (
            <Grid xs={12} sm={6} md={4} lg={4} xl={3} key={nft.$nftId} item>
              <NFTCardLazy
                nft={nft}
                onSelect={(selected) => handleSelect(nft, selected)}
                selected={selection.items.some(
                  (item) => item.$nftId === nft.$nftId,
                )}
                canExpandDetails={true}
                availableActions={NFTContextualActionTypes.All}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </LayoutDashboardSub>
  );
}
