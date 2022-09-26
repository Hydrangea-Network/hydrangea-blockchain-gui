import type { NFTInfo } from '@hydrangea/api';
import { useCurrencyCode } from '@hydrangea/core';
import useOpenExternal from './useOpenExternal';

/* ========================================================================== */

function getMintGardenURL(nft: NFTInfo, testnet: boolean) {
  const url = `https://${testnet ? 'testnet.' : ''}mintgarden.io/nfts/${
    nft.$nftId
  }`;
  return url;
}

function getSkyNFTURL(nft: NFTInfo, testnet: boolean) {
  const launcherId = nft.launcherId.startsWith('0x')
    ? nft.launcherId.substring(2)
    : nft.launcherId;
  const url = `https://${
    testnet ? 'test.' : ''
  }skynft.org/item.php?launcher_id=${launcherId}`;
  return url;
}

function getSpacescanURL(nft: NFTInfo, testnet: boolean) {
  const url = `https://spacescan.io/${testnet ? 'txhg10' : 'xhg'}/nft/${
    nft.$nftId
  }`;
  return url;
}

/* ========================================================================== */

export enum NFTExplorer {
  MintGarden = 'mintgarden',
  SkyNFT = 'skynft',
  Spacescan = 'spacescan',
}

const UrlBuilderMapping = {
  [NFTExplorer.MintGarden]: getMintGardenURL,
  [NFTExplorer.SkyNFT]: getSkyNFTURL,
  [NFTExplorer.Spacescan]: getSpacescanURL,
};

export default function useViewNFTOnExplorer() {
  const openExternal = useOpenExternal();
  const testnet = useCurrencyCode() === 'TXHG';

  function handleViewNFTOnExplorer(nft: NFTInfo, explorer: NFTExplorer) {
    const urlBuilder = UrlBuilderMapping[explorer];
    const url = urlBuilder(nft, testnet);

    openExternal(url);
  }

  return handleViewNFTOnExplorer;
}
