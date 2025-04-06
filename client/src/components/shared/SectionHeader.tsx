import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description: string;
  titleColor?: string;
  accentColor?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  description,
  titleColor = "text-gray-900",
  accentColor = "bg-gray-500",
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", centered && "text-center")}>
      <h2 className={cn("font-rajdhani font-bold text-3xl", titleColor)}>
        {title}
      </h2>
      <div
        className={cn(
          "w-20 h-1 mt-3 mb-5",
          accentColor,
          centered && "mx-auto"
        )}
      ></div>
      <p className="text-[#333333] max-w-3xl mx-auto">{description}</p>
    </div>
  );
}
