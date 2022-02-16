import axios from "axios";
import Caver from "caver-js";
import { AbiItem } from "caver-js/types/packages/caver-utils/src";
import KIP17ABI from "../abi/KIP17TokenABI.json";
import MarketABI from "../abi/MarketABI.json";

const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;
const CHAIN_ID = "8217";

const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
    },
    { name: "x-chain-id", value: CHAIN_ID },
  ],
};

const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://node-api.klaytnapi.com/v1/klaytn",
    option
  )
);

export const getBalance = (address: string) => {
  return caver.rpc.klay.getBalance(address).then((response: any) => {
    const balance = caver.utils.fromPeb(
      caver.utils.hexToNumberString(response)
    );
    console.log("Balance(KLAY)", balance);
    return balance;
  });
};

const NFTContract = new caver.contract(
  KIP17ABI as AbiItem[],
  process.env.NEXT_PUBLIC_BETA_CONTRACT
);

const MarketContract = new caver.contract(
  MarketABI as AbiItem[],
  process.env.NEXT_PUBLIC_MARKET_CONTRACT
);

export const getSeller = async (tokenId: number) => {
  const seller = await MarketContract.methods.seller(tokenId).call();

  return seller;
};

export const fetchCardsOf = async (address: any) => {
  // fetch balance
  const balance = await NFTContract.methods.balanceOf(address).call();
  console.log("Balance", balance);

  // fetch token IDs
  const tokenIds = [];
  for (let i = 0; i < balance; i++) {
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }

  console.log(tokenIds);

  const tokenMetadata = [];
  const tokenDescriptions = [];
  const tokenName = [];
  const tokenAttributes = [];
  // fetch token Images
  const tokenImages = [];
  // for (let i = 0; i < balance; i++) {
  //   const id = await NFTContract.methods.tokenURI(tokenIds[i]).call(); // -> image 주소
  //   tokenUris.push(id);
  // }
  for (let i = 0; i < balance; i++) {
    const metadataUrl = await NFTContract.methods.tokenURI(tokenIds[i]).call(); // -> metadata 주소
    const response = await axios.get(metadataUrl); // 실제 메타데이터
    console.log("response is ", response);
    const uriJSON = response.data;

    let imageurl;
    if(uriJSON.image.slice(7) == "ipfs://") {
      imageurl = "https://ipfs.io/ipfs/" + uriJSON.image.slice(7); //delete "ipfs://"
    } else {
      imageurl = uriJSON.image;
    }
    
    tokenImages.push(imageurl);

    const tempAttributes = [];
    for (let j = 0; j < uriJSON.attributes.length; j++) {
      tempAttributes.push(uriJSON.attributes[j]);
    }
    // tokenAttributes.push(tempAttributes);
    // tokenDescriptions.push(uriJSON.description);
    // tokenName.push(uriJSON.name);

    const tempMetadata = {
      name: <string>"",
      description: <string>"",
      attributes: <any>[],
    };
    tempMetadata.name = String(uriJSON.name);
    tempMetadata.description = String(uriJSON.description);
    tempMetadata.attributes = tempAttributes;
    tokenMetadata.push(tempMetadata);
  }
  console.log("tokenMetadata is ", tokenMetadata);

  const nfts = [];
  for (let i = 0; i < balance; i++) {
    nfts.push({
      image: tokenImages[i],
      id: tokenIds[i],
      metadata: tokenMetadata[i],
    });
  }
  console.log("nft", nfts);

  return nfts;
};

export const fetchNFTIds = async (address: any) => {
  const tokenIds = [];

  // fetch balance
  const balance = await NFTContract.methods.balanceOf(address).call();

  for (let i = 0; i < balance; i++) {
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }

  return tokenIds;
};

export const fetchNFTInfo = async (tokenId: any) => {
  const metadataUrl = await NFTContract.methods.tokenURI(tokenId).call();
  const response = await axios.get(metadataUrl);
  const uriJSON = response.data;

  const imageurl = "https://ipfs.io/ipfs/" + uriJSON.image.slice(7); //delete "ipfs://"

  return {
    image: imageurl,
    metadata: {
      name: String(uriJSON.name),
      description: String(uriJSON.description),
      attributes: uriJSON.attributes,
    },
  };
};
