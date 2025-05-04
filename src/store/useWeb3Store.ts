import { create } from "zustand";

export enum Web3StoreStatusEnum {
  METAMASK_UNINSTALLED = "METAMASK_UNINSTALLED",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  ERROR = "ERROR",
}

export type TWeb3Account = {
  address: string;
  balance: string;
};

type TWeb3Store = {
  account: TWeb3Account | null;
  status: Web3StoreStatusEnum | null;
  setStatus: (status: Web3StoreStatusEnum) => void;
  connectWallet: (address: TWeb3Account) => void;
  disconnectWallet: () => void;
};

const useWeb3Store = create<TWeb3Store>()((set) => ({
  account: null,
  status: null,
  setStatus: (status) => set((prev) => ({ ...prev, status })),
  connectWallet: (account) =>
    set((prev) => ({
      ...prev,
      account,
    })),
  disconnectWallet: () => set((prev) => ({ ...prev, account: null })),
}));

export default useWeb3Store;
