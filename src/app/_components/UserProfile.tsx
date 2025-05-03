"use client";

import { Button } from "@/components/ui/button";
import useConnectionWeb3 from "@/hooks/useConnectionWeb3";
import useWeb3Store, { Web3StoreStatusEnum } from "@/store/useWeb3Store";
import { simplifyAddress } from "@/utils/string";
import Link from "next/link";

const UserProfile = () => {
  const web3Status = useWeb3Store((state) => state.status);
  const accountAddress = useWeb3Store((state) => state.accountAddress);

  const { connectWalletHandler, disconnectWalletHandler } = useConnectionWeb3();

  switch (web3Status) {
    case Web3StoreStatusEnum.METAMASK_UNINSTALLED:
      return (
        <Link href={"https://metamask.io/download"} target="_blank">
          <Button>Install Metamask</Button>
        </Link>
      );
    case Web3StoreStatusEnum.DISCONNECTED:
    case Web3StoreStatusEnum.ERROR:
      return <Button onClick={connectWalletHandler}>Connect Wallet</Button>;
    case Web3StoreStatusEnum.CONNECTED:
    case accountAddress:
      return (
        <div className="flex items-center gap-4">
          <p>{simplifyAddress(accountAddress)}</p>
          <Button onClick={disconnectWalletHandler} variant="destructive">
            Logout
          </Button>
        </div>
      );
    default:
      return null;
  }
};
export default UserProfile;
