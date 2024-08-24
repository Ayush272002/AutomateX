import { Input } from "@repo/ui/input";
import { PrimaryButton } from "@repo/ui/primaryButton";
import { useState } from "react";

const SolanaSelector = ({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      <Input
        label={"To"}
        type={"text"}
        placeholder="To"
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        label={"Amount"}
        type={"text"}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="pt-4">
        <PrimaryButton
          onClick={() => {
            setMetadata({
              amount,
              address,
            });
          }}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SolanaSelector;
