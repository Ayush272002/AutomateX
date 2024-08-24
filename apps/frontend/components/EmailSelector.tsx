import { Input } from "@repo/ui/input";
import { PrimaryButton } from "@repo/ui/primaryButton";
import { useState } from "react";

const EmailSelector = ({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) => {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  return (
    <div>
      <Input
        label={"To"}
        type={"text"}
        placeholder="To"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label={"Body"}
        type={"text"}
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="pt-2">
        <PrimaryButton
          onClick={() => {
            setMetadata({
              email,
              body,
            });
          }}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
};

export default EmailSelector;
