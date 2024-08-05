import { cn, PropsWithChildren } from "@/utils.ts";
import { intrinsic } from "@/components/intrinsic.ts";
import Icon from "@/components/Icon.tsx";

export const BaseButton = intrinsic("button", {
  className: cn(
    "flex items-center gap-2 relative",
    "border hover:border-orange-500 font-bold rounded-lg py-1 px-2 select-none",
    "disabled:border-dashed disabled:text-gray-300 disabled:pointer-events-none",
  ),
});

type ButtonProps = {
  loading?: boolean;
};

export const Button = ({
  loading,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <BaseButton disabled={loading} {...props}>
    {loading && (
      <span className="absolute inset-0 flex items-center justify-center text-black">
        <Icon.Spinner />
      </span>
    )}
    <span
      className={cn({
        invisible: loading,
      })}
    >
      {children}
    </span>
  </BaseButton>
);
