import Caver from "caver-js";
import KIP17ABI from "../abi/KIP17TokenABI.json";

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
    const balance = caver.utils.convertFromPeb(
      caver.utils.hexToNumberString(response)
    );
    console.log("Balance(KLAY)", balance);
    return balance;
  });
};

const NFTContract = new caver.contract(KIP17ABI, process.env.NEXT_PUBLIC_BETA_CONTRACT);

export const fetchCardsOf = async (address: string) => {
  // fetch balance
  const balance = await NFTContract.methods.balanceOf(address).call();
  console.log("Balance", balance);

  // fetch token IDs
  const tokenIds = [];
  for (let i = 0; i < balance; i++) {
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }

  // fetch token URIs
  const tokenUris = [];
  for (let i = 0; i < balance; i++) {
    const id = await NFTContract.methods.tokenURI(tokenIds[i]).call();
    tokenUris.push(id);
  }

  const nfts = [];
  for (let i = 0; i < balance; i++) {
    nfts.push({ uri: tokenUris[i], id: tokenIds[i] });
  }
  console.log("nft", nfts);

  return nfts;
};
