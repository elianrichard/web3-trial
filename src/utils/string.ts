export const simplifyAddress = (address?: string | null) => {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};
