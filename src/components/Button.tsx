import { cn } from "@/utils.ts";
import { intrinsic } from "@/components/intrinsic.ts";
import Icon from "@/components/Icon.tsx";

export const BaseButton = intrinsic("button", {
  className: cn(
    "inline-flex items-center justify-center gap-2 relative active:translate-y-px",
    "border hover:border-orange-500 font-bold rounded-lg py-1 px-2 select-none",
    "disabled:border-dashed disabled:text-gray-300 disabled:pointer-events-none"
  ),
});

type ButtonProps = {
  loading?: boolean;
  href?: string;
  anchorProps?: JSX.IntrinsicElements["a"];
} & Parameters<typeof BaseButton>[0];

export const Button = ({
  loading,
  href,
  anchorProps = {},
  children,
  ...props
}: ButtonProps) => {
  const button = (
    <BaseButton
      disabled={loading}
      {...props}
      tabIndex={props.tabIndex || (href ? -1 : undefined)}
    >
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

  if (href && !loading && !props.disabled) {
    return (
      <a href={href} {...anchorProps}>
        {button}
      </a>
    );
  }
  return button;
};
