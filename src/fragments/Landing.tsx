import { PropsWithChildren } from "hono/jsx";

export const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <p class="bg-blue-100">hmr without flag</p>
      <datetime>{children}</datetime>
    </>
  );
};
