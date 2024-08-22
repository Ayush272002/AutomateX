import { Check } from "./Check";

export const Feature = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex pl-8">
      <Check />
      <div className="flex flex-col justify-center pl-2">
        <div className="flex">
          <div className="font-bold text-sm">{title}</div>

          <div className="pl-1 text-sm">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};
