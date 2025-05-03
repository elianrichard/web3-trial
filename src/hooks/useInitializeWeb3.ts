"use client";

import { LocalStorageKeyEnum } from "@/static/constants/local-storage";
import useWeb3Store, { Web3StoreStatusEnum } from "@/store/useWeb3Store";
import { getLocalStorage } from "@/utils/local-storage";
import { useCallback, useEffect, useRef } from "react";

export default function useInitializeWeb3() {
  const connectWeb3Wallet = useWeb3Store((state) => state.connectWallet);
  const setWeb3Status = useWeb3Store((state) => state.setStatus);
  const isRendered = useRef(false);

  const handleInitializeWeb3 = useCallback(() => {
    if (!window.ethereum) {
      setWeb3Status(Web3StoreStatusEnum.METAMASK_UNINSTALLED);
      return;
    }

    const localAccount = getLocalStorage(
      LocalStorageKeyEnum.WEB3_ACCOUNT_ADDRESS,
    );

    if (localAccount) {
      connectWeb3Wallet(localAccount);
      setWeb3Status(Web3StoreStatusEnum.CONNECTED);
      return;
    }

    setWeb3Status(Web3StoreStatusEnum.DISCONNECTED);
  }, [connectWeb3Wallet, setWeb3Status]);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;
    handleInitializeWeb3();
  }, [handleInitializeWeb3]);
}
