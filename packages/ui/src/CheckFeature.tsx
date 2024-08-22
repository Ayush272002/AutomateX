import { CheckMark } from "./CheckMark";

export const CheckFeature = ({ label }: { label: string }) => {
  return (
    <div className="flex">
      <div className="pr-4">
        <CheckMark />
      </div>
      {label}
    </div>
  );
};
