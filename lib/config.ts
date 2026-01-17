import { sepolia } from "wagmi/chains";
import { createConfig, http, injected } from "wagmi";

export const config = createConfig({
  connectors: [injected()],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/nsie4CkPWDSvgFDKT6Yhg",
    ),
  },
});
