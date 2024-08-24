"use client";

import Appbar from "../../../components/Appbar";
import { useState } from "react";
import ZapCell from "../../../components/ZapCell";
import { LinkButton } from "@repo/ui/linkButton";
import { PrimaryButton } from "@repo/ui/primaryButton";
import Modal from "../../../components/Modal";
import { useAvailableActionsAndTriggers } from "../../../hooks/useAvailableActionsAndTriggers";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function () {
  const router = useRouter();
  const { availableActions, availableTriggers } =
    useAvailableActionsAndTriggers();
  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
  }>();
  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      availableActionId: string;
      availableActionName: string;
      metadata: any;
    }[]
  >([]);

  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
    null,
  );

  return (
    <div>
      <Appbar />
      <div className="flex justify-end bg-slate-200 p-4">
        <PrimaryButton
          onClick={async () => {
            if (!selectedTrigger?.id) {
              return;
            }

            const response = await axios.post(
              `${API_BASE_URL}/api/v1/zap`,
              {
                availableTriggerId: selectedTrigger.id,
                triggerMetadata: {},
                actions: selectedActions.map((a) => ({
                  availableActionId: a.availableActionId,
                  actionMetadata: a.metadata,
                })),
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              },
            );

            router.push("/dashboard");
          }}
        >
          Publish
        </PrimaryButton>
      </div>
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
            index={1}
            onClick={() => {
              setSelectedModalIndex(1);
            }}
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
                index={action.index}
                onClick={() => {
                  setSelectedModalIndex(action.index);
                }}
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
      {selectedModalIndex && (
        <Modal
          index={selectedModalIndex}
          availableItems={
            selectedModalIndex === 1 ? availableTriggers : availableActions
          }
          onSelect={(
            props: null | { name: string; id: string; metadata: any },
          ) => {
            if (props === null) {
              setSelectedModalIndex(null);
              return;
            }
            if (selectedModalIndex === 1) {
              setSelectedTrigger({
                id: props.id,
                name: props.name,
              });
            } else {
              setSelectedActions((a) => {
                let newActions = [...a];
                newActions[selectedModalIndex - 2] = {
                  index: selectedModalIndex,
                  availableActionId: props.id,
                  availableActionName: props.name,
                  metadata: props.metadata,
                };
                return newActions;
              });
            }
            setSelectedModalIndex(null);
          }}
        />
      )}
    </div>
  );
}
