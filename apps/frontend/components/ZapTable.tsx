import { useRouter } from "next/navigation";
import Zap from "../interface/zap";
import { LinkButton } from "@repo/ui/linkButton";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;

const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
  const router = useRouter();

  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="flex">
        <div className="flex-1">Name</div>
        <div className="flex-1">ID</div>
        {/* <div className="flex-1">Created at</div> */}
        <div className="flex-1">Webhook URL</div>
        <div className="flex-1 text-center">Go</div>
      </div>
      {zaps.map((z, index) => (
        <div key={index} className="flex border-b border-t py-4">
          <div className="flex-1 flex">
            <img src={z.trigger.type.image} className="w-[30px] h-[30px]" />{" "}
            {z.actions.map((x) => (
              <img
                key={x.id}
                src={x.type.image}
                className="w-[30px] h-[30px]"
              />
            ))}
          </div>
          <div className="flex-1">{z.id}</div>
          {/* <div className="flex-1">CURR DATE</div> */}
          <div className="flex-1">{`${WEBHOOK_URL}/hooks/catch/1/${z.id}`}</div>
          <div className="flex-1">
            <LinkButton
              onClick={() => {
                router.push("/zap/" + z.id);
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ZapTable;
