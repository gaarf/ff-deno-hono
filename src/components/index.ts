import { cn } from "@/utils.ts";
import { intrinsic } from "@/client/compat.ts";

export * from "@/components/Json.tsx";

export const Button = intrinsic("button", {
  className: cn(
    "border hover:border-orange-500 font-bold rounded-lg py-1 px-2 select-none",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-forbidden",
  ),
});

export const Input = intrinsic("input", {
  className: "border",
});

export const Textarea = intrinsic("textarea", {
  className: "border",
});

export const Box = intrinsic("div", {
  className: "flex justify-between",
});

export const Link = intrinsic("a", {
  className: "underline",
});

export const Pre = intrinsic("pre", {
  className: "bg-slate-200 rounded overflow-auto p-2 my-4",
});
