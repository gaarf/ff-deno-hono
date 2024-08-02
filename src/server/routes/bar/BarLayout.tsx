import { PropsWithChildren } from "@/utils.ts";

export const BarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <h1 className="font-bold">Bar layout</h1>
      <section className="border border-yellow-500 border-dashed rounded p-4">
        {children}
      </section>
    </>
  );
};
