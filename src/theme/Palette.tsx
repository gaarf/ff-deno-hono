import { cn } from "@/utils.ts";

const ColorSwatch = ({ colorClass }: { colorClass: string }) => {
  const [, intent, level] = colorClass.split("-"); // Remove the 'bg-' prefix to get the color name
  const colorLevel = parseInt(level);

  return (
    <div
      className={cn(
        "aspect-square overflow-hidden rounded",
        "shadow relative p-2",
        {
          "text-default-bg": colorLevel > 6,
        },
        colorClass
      )}
    >
      <span className="text-xs hidden md:block">{intent}</span>
      <div className="text-3xl absolute bottom-0 right-1 opacity-20">
        {level}
      </div>
    </div>
  );
};

export const ColorGrid = () => {
  const classNames = [
    "neutral",
    "accent",
    "success",
    "warning",
    "danger",
  ].reduce<string[]>((acc, category) => {
    for (let i = 1; i <= 12; i++) {
      acc.push(`bg-${category}-${i}`);
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-12 gap-1">
      {classNames.map((colorClass, index) => (
        <ColorSwatch key={index} colorClass={colorClass} />
      ))}
    </div>
  );
};
