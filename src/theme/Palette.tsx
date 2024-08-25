import { cn } from "@/utils.ts";

const ColorSwatch = ({ colorClass }: { colorClass: string }) => {
  const [, intent, level] = colorClass.split("-"); // Remove the 'bg-' prefix to get the color name

  return (
    <div
      className={cn(
        "aspect-square overflow-hidden rounded relative font-mono",
        `border border-${intent}-${level}`,
        colorClass,
      )}
    >
      <span className="text-xs opacity-30 hidden md:inline p-1">
        {intent}
      </span>
      <div className="md:text-3xl absolute md:bottom-0 right-1 opacity-30">
        {level}
      </div>
    </div>
  );
};

export const ColorGrid = () => {
  const classNames = [
    "neutral",
    "warning",
    "danger",
    "success",
    "accent",
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
