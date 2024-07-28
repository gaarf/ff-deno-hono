import { PropsWithChildren } from "@/util.ts";

export const BarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <h1 class="font-bold">Bar layout</h1>
      <section class="border border-yellow-500 border-dashed rounded p-4">{children}</section>
    </>
  );
};
