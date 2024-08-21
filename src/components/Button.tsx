import { cn } from "@/utils.ts";
import { useState } from "@/react.shim.ts";
import { intrinsic } from "@/components/intrinsic.ts";
import Icon from "@/components/Icon.tsx";
import { Intent } from "@/theme/index.ts";

export const BaseButton = intrinsic("button", {
  className: cn(
    "relative active:translate-y-px hover:scale-105 flex items-center gap-2",
    "border text-neutral-12 font-bold rounded-lg py-1 px-2 select-none",
    "disabled:border-dashed disabled:text-opacity-50 disabled:pointer-events-none",
  ),
});

type ButtonProps = {
  intent?: Intent;
  loading?: boolean;
  href?: string;
  anchorProps?: JSX.IntrinsicElements["a"];
} & Parameters<typeof BaseButton>[0];

export const Button = ({
  loading,
  intent = "neutral",
  href,
  anchorProps = {},
  children,
  ...props
}: ButtonProps) => {
  const button = (
    <BaseButton
      disabled={loading}
      {...props}
      className={cn(
        {
          "bg-danger-8 border-danger-9": intent === "danger",
          "bg-warning-8 border-warning-9": intent === "warning",
          "bg-success-10 border-success-10": intent === "success",
          "bg-neutral-2": intent === "neutral",
        },
        props.className,
      )}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Icon.Spinner />
        </span>
      )}
      <span
        className={cn({
          invisible: loading,
          "flex flex-1 items-center justify-center gap-2": true,
        })}
      >
        {children}
      </span>
    </BaseButton>
  );

  if (href && !loading && !props.disabled) {
    return (
      <a href={href} {...anchorProps} tabIndex={-1}>
        {button}
      </a>
    );
  }
  return button;
};

export const LoadingButton = (props: Omit<ButtonProps, "loading">) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      {...props}
      loading={loading}
      onClick={(event) => {
        setLoading(true);
        props.onClick?.call(null, event);
      }}
    />
  );
};
