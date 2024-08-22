import { cn } from "@/utils.ts";
import { PropsWithChildren, useState } from "@/react.shim.ts";
import { intrinsic } from "@/components/intrinsic.ts";
import { Icon } from "@/components/Icon.tsx";
import { Intent } from "@/theme/index.ts";

export const BaseButton = intrinsic("button", {
  className: cn(
    "active:translate-y-px",
    "relative inline-flex items-center gap-2",
    "border text-neutral-12 font-bold rounded-lg py-1 px-2 select-none",
    "disabled:text-opacity-30 disabled:border-dotted disabled:pointer-events-none",
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
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        {
          "bg-danger-3 hover:bg-danger-4 border-danger-8": intent === "danger",
          "bg-warning-4 hover:bg-warning-5 border-warning-8":
            intent === "warning",
          "bg-success-4 hover:bg-success-5 border-success-8":
            intent === "success",
          "bg-accent-4 hover:bg-accent-5 border-accent-8": intent === "accent",
          "bg-neutral-3 hover:bg-neutral-4": intent === "neutral",
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
      <a
        href={href}
        {...anchorProps}
        className={cn("inline-flex", anchorProps.className)}
        tabIndex={-1}
      >
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

export const ButtonGroup = ({ children }: PropsWithChildren) => {
  return (
    <span
      className={cn(
        "flex [&_button]:border-transparent [&_button]:rounded-none gap-px",
        "border rounded-lg overflow-hidden bg-neutral-6",
      )}
    >
      {children}
    </span>
  );
};
