import { LabeledInput, LabeledTextarea, LoadingForm } from "@/components";
import { Markdown } from "@/components/Markdown.tsx";
import { useState, useRef } from "@/react.shim.ts";
import { useEffect } from "@/react.shim.ts";

export const PostForm = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (ref) {
      const listener = () => setContent(ref.current?.value || "");
      ref.current?.addEventListener("input", listener);
      return () => {
        ref.current?.removeEventListener("input", listener);
      };
    }
  }, [ref]);

  return (
    <>
      <LoadingForm>
        <LabeledInput label="Title" name="title" />
        <LabeledTextarea
          label="Content"
          name="content"
          rows={8}
          ref={ref}
          required
        />
      </LoadingForm>

      {content && <Markdown className="p-4 border border-dashed">{content}</Markdown>}
    </>
  );
};
