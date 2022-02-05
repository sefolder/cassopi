import axios from "axios";

const A2A_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "cassoPi";

export const buyCard = async (tokenId: string, setQrvalue: (arg0: string) => void, callback: (arg0: any) => void) => {
  const functionJson = `{ "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "NFTAddress", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }`;
  executeContract(
    process.env.NEXT_PUBLIC_BETA_CONTRACT,
    functionJson,
    "10000000000000000",
    `[\"${tokenId}\",\"${process.env.NEXT_PUBLIC_BETA_CONTRACT}\"]`,
    setQrvalue,
    callback
  );
};

export const displayCard = async (
  fromAddress: string,
  tokenId: string,
  setQrvalue: (arg0: string) => void,
  callback: (arg0: any) => void
) => {
  const functionJson = `{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }`;
  executeContract(
    process.env.NEXT_PUBLIC_BETA_CONTRACT,
    functionJson,
    "0",
    `[\"${fromAddress}\",\"${process.env.NEXT_PUBLIC_BETA_CONTRACT}\",\"${tokenId}\"]`,
    setQrvalue,
    callback
  );
};

export const MintCardWithURI = async (
  toAddress: string,
  tokenId: string,
  uri: string,
  setQrvalue: (arg0: string) => void,
  callback: (arg0: any) => void
) => {
  const functionJson = `{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }`;
  executeContract(
    process.env.NEXT_PUBLIC_BETA_CONTRACT,
    functionJson,
    "0",
    `[\"${toAddress}\",\"${tokenId}\",\"${uri}\"]`,
    setQrvalue,
    callback
  );
};

export const getAddress = (
  setQrvalue: (arg0: string) => void,
  callback: (arg0: any) => void
) => {
  axios
    .post(A2A_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "auth",
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log("result", JSON.stringify(res.data.result));
              callback(res.data.result.klaytn_address);
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};

export const executeContract = (
  txTo: any,
  functionJSON: string,
  value: string,
  params: string,
  setQrvalue: (arg0: string) => void,
  callback: (arg0: any) => void
) => {
  axios
    .post(A2A_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "execute_contract",
      transaction: {
        to: txTo,
        abi: functionJSON,
        value: value,
        params: params,
      },
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(
                "excute contract result",
                JSON.stringify(res.data.result)
              );
              callback(res.data.result);
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};