/* eslint-disable @next/next/no-img-element -- original SVG logo asset, served unchanged */
import Link from "next/link";

/**
 * The original Evenir logo asset, unchanged (only the SVG viewBox is trimmed
 * of its built-in whitespace). Proportions are locked by the intrinsic ratio.
 */
export function Logo({
  href,
  variant = "color",
  className = "h-7",
  label = "Evenir",
}: {
  href: string;
  variant?: "color" | "white";
  className?: string;
  label?: string;
}) {
  const src = variant === "white" ? "/brand/evenir-logo-white.svg" : "/brand/evenir-logo.svg";
  const ratio = variant === "white" ? 719.56 / 131.09 : 722 / 132;
  return (
    <Link href={href} className="inline-flex shrink-0 items-center rounded-sm" aria-label={label}>
      <img src={src} alt="" width={Math.round(28 * ratio)} height={28} className={`${className} w-auto`} />
    </Link>
  );
}
