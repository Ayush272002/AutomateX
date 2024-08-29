"use client";

import { DarkButton } from "@repo/ui/darkButton";
import { useZaps } from "../../hooks/useZaps";
import { Spinner } from "@repo/ui/spinner";
import ZapTable from "../../components/ZapTable";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardAppbar from "../../components/DashboardAppbar";

export default function () {
  const { loading, zaps } = useZaps();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
  }, []);

  return (
    <div>
      <DashboardAppbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-2xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </div>
  );
}
