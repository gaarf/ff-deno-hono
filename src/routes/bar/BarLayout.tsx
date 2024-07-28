import { PropsWithChildren } from "@/util.ts";

export const BarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <h1>Bar layout</h1>
      <section class="bg-yellow-500">{children}</section>
    </>
  );
};
