import { LabeledInput, LabeledTextarea, LoadingForm } from "@/components";

export const PostForm = () => {
  return (
    <LoadingForm>
      <LabeledInput label="Title" name="title" />
      <LabeledTextarea label="Content" name="content" rows={8} required />
    </LoadingForm>
  );
};
