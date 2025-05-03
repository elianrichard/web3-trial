import { create } from "zustand";

export enum Web3StoreStatusEnum {
  METAMASK_UNINSTALLED = "METAMASK_UNINSTALLED",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  ERROR = "ERROR",
}

type TWeb3Store = {
  accountAddress: string | null;
  status: Web3StoreStatusEnum | null;
  setStatus: (status: Web3StoreStatusEnum) => void;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
};

const useWeb3Store = create<TWeb3Store>()((set) => ({
  accountAddress: "",
  status: null,
  setStatus: (status) => set((prev) => ({ ...prev, status })),
  connectWallet: (accountAddress) =>
    set((prev) => ({ ...prev, accountAddress })),
  disconnectWallet: () => set((prev) => ({ ...prev, accountAddress: null })),
}));

export default useWeb3Store;
