import { sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import { createConfig, http } from "wagmi";
export const STAKING_PROXY = "0x72157402b445b97becee455f8db51427bd52d29d";
export const REWARD_TOKEN = "0x611420e65ffbe883ec220c76dcc0b3d64d78acae";

export const config = createConfig({
  connectors: [metaMask()],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/nsie4CkPWDSvgFDKT6Yhg",
    ),
  },
});
