"use client";

import { useCallback } from "react";
import useWeb3Store, { Web3StoreStatusEnum } from "@/store/useWeb3Store";
import { removeLocalStorage, setLocalStorage } from "@/utils/local-storage";
import { LocalStorageKeyEnum } from "@/static/constants/local-storage";

export default function useConnectionWeb3() {
  const accountAddress = useWeb3Store((state) => state.accountAddress);
  const disconnectWeb3Wallet = useWeb3Store((state) => state.disconnectWallet);
  const connectWeb3Wallet = useWeb3Store((state) => state.connectWallet);
  const setWeb3Status = useWeb3Store((state) => state.setStatus);

  const connectWalletHandler = useCallback(async () => {
    if (accountAddress) return;
    if (!window.ethereum) {
      setWeb3Status(Web3StoreStatusEnum.METAMASK_UNINSTALLED);
      alert("You don't have MetaMask installed!");
      return;
    }
    try {
      const accounts = (await window.ethereum.request?.({
        method: "eth_requestAccounts",
      })) as string[];
      if (!accounts[0]) return;
      connectWeb3Wallet(accounts[0]);
      setWeb3Status(Web3StoreStatusEnum.CONNECTED);
      setLocalStorage(LocalStorageKeyEnum.WEB3_ACCOUNT_ADDRESS, accounts[0]);
      return;
    } catch (err) {
      console.log(err);
      setWeb3Status(Web3StoreStatusEnum.ERROR);
      return;
    }
  }, [accountAddress, connectWeb3Wallet, setWeb3Status]);

  const disconnectWalletHandler = useCallback(() => {
    setWeb3Status(Web3StoreStatusEnum.DISCONNECTED);
    removeLocalStorage(LocalStorageKeyEnum.WEB3_ACCOUNT_ADDRESS);
    disconnectWeb3Wallet();
  }, [setWeb3Status, disconnectWeb3Wallet]);

  return { connectWalletHandler, disconnectWalletHandler };
}
