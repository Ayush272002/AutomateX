"use client";

import { LinkButton } from "@repo/ui/linkButton";
import { PrimaryButton } from "@repo/ui/primaryButton";
import { useRouter } from "next/navigation";

const Appbar = () => {
  const router = useRouter();
  return (
    <div className="flex border-b justify-between p-4">
      <div className="flex flex-col justify-center text-2xl font-extrabold">
        Zapier
      </div>
      <div className="flex">
        <div className="pr-4">
          <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        </div>
        <div className="pr-4">
          <LinkButton onClick={() => router.push("/login")}>Log in</LinkButton>
        </div>
        <PrimaryButton onClick={() => router.push("/signup")}>
          Sign up
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Appbar;
