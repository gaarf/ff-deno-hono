import { isBrowser } from "@/utils.ts";

export const Favicon = ({ icon }: { icon: string }) => {
  return (
    <link
      rel="icon"
      href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`}
    />
  );
};

export function getEmoji() {
  if (isBrowser()) {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const emoji = link?.href.match(/>([^<]*)<\/text><\/svg>$/);
    if (emoji) {
      return decodeURIComponent(emoji[1]);
    }
  }
}
