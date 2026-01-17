import { abi } from "@/lib/abi";
import { parseEther } from "viem";
import {
  useWriteContract,
  useReadContract,
  useAccount,
  useBalance,
  useEnsName,
} from "wagmi";

export function Dashboard() {
  const { address, isConnected } = useAccount();
  console.log(address);
  console.log(isConnected);

  const {
    mutate,
    isPending,
    isSuccess,
    data: hash,
    error,
  } = useWriteContract();

  const bal = useBalance({
    address: "0xE0992D80e2824E98cf5e76d6b9e7d02abEF77F5a",
  });
  console.log(bal);
  const amount = parseEther("0.00000002");

  return (
    <div className="h-screen w-scren flex justify-center items-center">
      <div>
        <button
          className="mx-2 border rounded p-2 text-2xl"
          disabled={isPending}
          onClick={() => {
            mutate({
              address: "0x9f82462BF164EDCD5f10F3596C3D9A307DBb3875",
              abi,
              functionName: "unstake",
              args: [BigInt(1000000)],
              value: BigInt(1000000),
            });
          }}
        >
          {isPending ? "Staking..." : "Stake"}
        </button>
        {isSuccess && <div>Transaction successful! Hash: {hash}</div>}
        {error && <div>Error: {error.message}</div>}
        <div>
          <ShowStake />
        </div>
      </div>
    </div>
  );
}

function ShowStake() {
  const { data: balance, refetch } = useReadContract({
    address: "0x9f82462BF164EDCD5f10F3596C3D9A307DBb3875",
    abi,
    functionName: "stakedBalance",
    args: ["0xE0992D80e2824E98cf5e76d6b9e7d02abEF77F5a"],
  });
  //   console.log(balance);
  return (
    <div>
      You have staked {balance ? `${balance.toString()} ETH` : "0 ETH"}
      <br />
      <button onClick={() => refetch()}>Refresh Balance</button>
    </div>
  );
}
