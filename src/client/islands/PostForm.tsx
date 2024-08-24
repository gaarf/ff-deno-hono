import { Button } from "@/components/Button.tsx";
import { LabeledTextarea, LabeledInput } from "@/components/LabeledInput.tsx";
import { useCallback, useState } from "@/react.shim.ts";

export const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(() => setLoading(true), []);

  return (
    <form
      method="post"
      className="flex p-4 rounded bg-neutral-1 flex-col items-start gap-4"
      onSubmit={handleSubmit}
    >
      <fieldset className="flex flex-col gap-2 w-full">
        <LabeledInput label="Title" name="title" />
        <LabeledTextarea label="Content" name="content" rows={8} required />
      </fieldset>
      <Button type="submit" loading={loading}>
        Submit
      </Button>
    </form>
  );
};
