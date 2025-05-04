"use client";

import { useCallback } from "react";
import useWeb3Store, { Web3StoreStatusEnum } from "@/store/useWeb3Store";
import { removeLocalStorage, setLocalStorage } from "@/utils/local-storage";
import { LocalStorageKeyEnum } from "@/static/constants/local-storage";
import { signInWeb3Account } from "@/utils/web3";

export default function useConnectionWeb3() {
  const web3Account = useWeb3Store((state) => state.account);
  const disconnectWeb3Wallet = useWeb3Store((state) => state.disconnectWallet);
  const connectWeb3Wallet = useWeb3Store((state) => state.connectWallet);
  const setWeb3Status = useWeb3Store((state) => state.setStatus);

  const connectWalletHandler = useCallback(async () => {
    if (web3Account) return;
    if (!window.ethereum) {
      setWeb3Status(Web3StoreStatusEnum.METAMASK_UNINSTALLED);
      alert("You don't have MetaMask installed!");
      return;
    }
    try {
      const account = await signInWeb3Account();
      if (!account) return;
      connectWeb3Wallet(account);
      setWeb3Status(Web3StoreStatusEnum.CONNECTED);
      setLocalStorage(LocalStorageKeyEnum.WEB3_ACCOUNT_ADDRESS, account);
      return;
    } catch (err) {
      console.log(err);
      setWeb3Status(Web3StoreStatusEnum.ERROR);
      return;
    }
  }, [web3Account, connectWeb3Wallet, setWeb3Status]);

  const disconnectWalletHandler = useCallback(() => {
    setWeb3Status(Web3StoreStatusEnum.DISCONNECTED);
    removeLocalStorage(LocalStorageKeyEnum.WEB3_ACCOUNT_ADDRESS);
    disconnectWeb3Wallet();
  }, [setWeb3Status, disconnectWeb3Wallet]);

  return { connectWalletHandler, disconnectWalletHandler };
}
