import { Link } from "@/components/Link.tsx";
import { isBrowser, type ComponentType } from "@/util.ts";
import { usePathname } from "@/hooks.ts";

type LoremIpsumProps = {
  count?: number;
};

export const LoremIpsum: ComponentType<LoremIpsumProps> = ({
  children,
  count = 1,
}) => {
  const pathname = usePathname();
  const browser = isBrowser();
  return (
    <>
      {children}
      <p>
        {isBrowser() ? (
          <Link href="/">link to home rendered on client</Link>
        ) : (
          <span>SERVER RENDERED</span>
        )}
      </p>
      <pre>{JSON.stringify({ pathname, browser })}</pre>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <p class="italic mb-2" key={i}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ipsum
            quia consequatur odit quidem qui doloremque inventore unde quaerat.
            Cupiditate suscipit vel temporibus natus facilis debitis, aspernatur
            autem nulla. Obcaecati!!
          </p>
        ))}
    </>
  );
};
