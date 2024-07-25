import { PropsWithChildren } from "hono/jsx";

export const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <p class="bg-orange-500">landing page goes here</p>
      <datetime>{children}</datetime>
    </>
  );
};
