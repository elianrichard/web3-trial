import type { TWeb3Account } from "@/store/useWeb3Store";
import { BrowserProvider, formatUnits } from "ethers";

export const getWebEthereum = () => {
  if (!window.ethereum) {
    alert("You don't have MetaMask installed!");
    return null;
  }
  return window.ethereum;
};

export const getWeb3BrowserProvider = () => {
  const web3 = getWebEthereum();
  if (!web3) return null;
  const provider = new BrowserProvider(web3);
  return provider;
};

export const getWeb3Signer = async () => {
  const provider = getWeb3BrowserProvider();
  if (!provider) return null;
  const signer = await provider.getSigner();
  return signer;
};

export const getWeb3Address = async () => {
  const signer = await getWeb3Signer();
  if (!signer) return null;
  const address = await signer.getAddress();
  return address;
};

export const getWeb3Balance = async () => {
  const provider = getWeb3BrowserProvider();
  if (!provider) return null;
  const address = await getWeb3Address();
  if (!address) return null;
  const balance = await provider.getBalance(address);
  return formatUnits(balance);
};

export const getWeb3Account = async (): Promise<TWeb3Account | null> => {
  const balance = await getWeb3Balance();
  const address = await getWeb3Address();
  if (!address || !balance) return null;
  return { address, balance };
};

export const signInWeb3Account = async (): Promise<TWeb3Account | null> => {
  const web3 = getWebEthereum();
  if (!web3) return null;
  await web3.request({
    method: "wallet_requestPermissions",
    params: [{ eth_accounts: {} }],
  });
  return await getWeb3Account();
};
