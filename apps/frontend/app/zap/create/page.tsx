"use client";

import Appbar from "../../../components/Appbar";
import { useState } from "react";
import ZapCell from "../../../components/ZapCell";
import { LinkButton } from "@repo/ui/linkButton";
import { PrimaryButton } from "@repo/ui/primaryButton";

export default function () {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
    }[]
  >([]);

  return (
    <div>
      <Appbar />
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            name={selectedTrigger ? selectedTrigger : "Trigger"}
            index={1}
            onClick={() => {}}
          />
        </div>

        <div className="w-full pt-2 pb-2">
          {selectedActions.map((action, index) => (
            <div className="pt-2 flex justify-center">
              <ZapCell
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : "Action"
                }
                index={2 + index}
                onClick={() => {}}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div>
            <PrimaryButton
              onClick={() => {
                setSelectedActions((a) => [
                  ...a,
                  {
                    index: a.length + 2,
                    availableActionId: "",
                    availableActionName: "",
                    metadata: {},
                  },
                ]);
              }}
            >
              <div className="text-2xl">+</div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
