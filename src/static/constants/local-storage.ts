import type { TWeb3Account } from "@/store/useWeb3Store";

export enum LocalStorageKeyEnum {
  WEB3_ACCOUNT_ADDRESS = "web3-connected-account-address",
}

export type TLocalStorageTypeMapping = {
  [LocalStorageKeyEnum.WEB3_ACCOUNT_ADDRESS]: TWeb3Account;
};
