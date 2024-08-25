import { Button } from "@/components/Button.tsx";
import { Box } from "@/components/intrinsic.ts";
import React, {
  PropsWithChildren,
  useCallback,
  useState,
} from "@/react.shim.ts";
import { cn } from "@/utils.ts";

type LoadingFormProps = PropsWithChildren<{
  className?: string;
  afterContent?: React.ReactNode;
}>;

export const LoadingForm = ({
  children,
  afterContent,
  className,
}: LoadingFormProps) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(() => setLoading(true), []);

  return (
    <form
      method="post"
      className={cn(
        "flex w-full p-4 rounded bg-neutral-1 flex-col items-start gap-4",
        className
      )}
      onSubmit={handleSubmit}
    >
      <fieldset className="flex flex-col gap-2 w-full">{children}</fieldset>
      <Box className="justify-between self-stretch">
        <Button type="submit" loading={loading}>
          Submit
        </Button>
        {afterContent}
      </Box>
    </form>
  );
};
