"use client";

import { LinkButton } from "@repo/ui/linkButton";
import { PrimaryButton } from "@repo/ui/primaryButton";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

const DashboardAppbar = () => {
  const router = useRouter();
  const onClickHandler = () => {
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
  }, []);

  return (
    <div className="flex border-b justify-between p-4">
      <div
        className="flex flex-col justify-center text-2xl font-extrabold cursor-pointer"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Zapier
      </div>
      <div className="flex">
        <div className="pr-4">
          <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        </div>
        <div className="pr-4">
          <PrimaryButton onClick={onClickHandler}>Log out</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default DashboardAppbar;
