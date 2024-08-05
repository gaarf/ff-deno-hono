import { intrinsic } from "@/components/intrinsic.ts";

export * from "@/components/Json.tsx";
export * from "@/components/Button.tsx";

export const Input = intrinsic("input", {
  className: "border",
});

export const Textarea = intrinsic("textarea", {
  className: "border",
});

export const Box = intrinsic("div", {
  className: "flex justify-between items-center",
});

export const Link = intrinsic("a", {
  className: "underline",
});

export const Pre = intrinsic("pre", {
  className: "bg-slate-200 rounded overflow-auto p-2 my-4",
});
