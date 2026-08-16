import Image from "next/image";
import { Link } from "@/i18n/navigation";

type BrandLogoProps = {
  brandName?: string;
  size?: "nav" | "hero";
  link?: boolean;
};

export function BrandLogo({
  brandName = "Kaméleon AG",
  size = "nav",
  link = true,
}: BrandLogoProps) {
  const dims =
    size === "hero"
      ? { width: 520, height: 220, className: "h-auto w-[min(92vw,520px)]" }
      : { width: 160, height: 68, className: "h-9 w-auto md:h-10" };

  const img = (
    <Image
      src="/logo-kameleon-ag.png"
      alt={brandName}
      width={dims.width}
      height={dims.height}
      className={dims.className}
      priority={size === "hero" || size === "nav"}
    />
  );

  if (!link) return img;
  return (
    <Link href="/" aria-label={brandName} className="inline-flex shrink-0">
      {img}
    </Link>
  );
}
