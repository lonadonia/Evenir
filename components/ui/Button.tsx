import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { ICON_STROKE } from "./icons";

export type ButtonVariant = "primary" | "secondary" | "secondaryOnDark" | "quiet";
export type ButtonSize = "sm" | "md" | "lg";
/** Forces a visual state — used by the style guide to document states statically. */
export type ForcedState = "hover" | "focus" | "active" | "disabled";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 font-semibold whitespace-nowrap select-none " +
  "rounded-md transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out " +
  "focus-visible:outline-[2.5px] focus-visible:outline-offset-[3px] focus-visible:outline-(--focus) " +
  "data-[state=focus]:outline-[2.5px] data-[state=focus]:outline-offset-[3px] data-[state=focus]:outline-solid data-[state=focus]:outline-(--focus) " +
  "active:translate-y-px data-[state=active]:translate-y-px " +
  "aria-disabled:pointer-events-none disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-ink shadow-[inset_0_-2px_0_rgb(27_35_36/0.14)] " +
    "hover:bg-orange-soft data-[state=hover]:bg-orange-soft " +
    "active:shadow-[inset_0_2px_0_rgb(27_35_36/0.18)] data-[state=active]:shadow-[inset_0_2px_0_rgb(27_35_36/0.18)] " +
    "disabled:bg-mist disabled:text-graphite disabled:shadow-none aria-disabled:bg-mist aria-disabled:text-graphite aria-disabled:shadow-none " +
    "data-[state=disabled]:bg-mist data-[state=disabled]:text-graphite data-[state=disabled]:shadow-none",
  secondary:
    "border-[1.5px] border-teal-ink text-teal-ink bg-transparent " +
    "hover:bg-mist-100 data-[state=hover]:bg-mist-100 active:bg-mist data-[state=active]:bg-mist " +
    "disabled:border-line-strong disabled:text-graphite aria-disabled:border-line-strong aria-disabled:text-graphite " +
    "data-[state=disabled]:border-line-strong data-[state=disabled]:text-graphite",
  secondaryOnDark:
    "border-[1.5px] border-white/70 text-white bg-transparent " +
    "hover:bg-white/10 hover:border-white data-[state=hover]:bg-white/10 data-[state=hover]:border-white " +
    "active:bg-white/15 data-[state=active]:bg-white/15",
  quiet:
    "text-teal-ink bg-transparent px-0! h-auto! underline decoration-1 underline-offset-[0.28em] decoration-teal-ink/40 " +
    "hover:decoration-teal-ink hover:decoration-2 data-[state=hover]:decoration-teal-ink data-[state=hover]:decoration-2",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.9375rem]",
  md: "h-12 px-5 text-[1rem]",
  lg: "h-14 px-7 text-[1.0625rem]",
};

type IconKind = "right" | "down" | "external" | "none";

function TrailingIcon({ kind }: { kind: IconKind }) {
  if (kind === "none") return null;
  const Icon = kind === "down" ? ArrowDown : kind === "external" ? ArrowUpRight : ArrowRight;
  const motion =
    kind === "down"
      ? "group-hover/btn:translate-y-0.5"
      : kind === "external"
        ? "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        : "group-hover/btn:translate-x-0.5";
  return (
    <Icon aria-hidden="true" strokeWidth={ICON_STROKE + 0.25} className={`size-[1.1em] shrink-0 transition-transform duration-200 ${motion}`} />
  );
}

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra = "") {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`;
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconKind;
  state?: ForcedState;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon = "none",
  state,
  children,
  className = "",
  external,
  hint,
  ...rest
}: CommonProps & { href: string; external?: boolean; hint?: string } & Omit<ComponentProps<"a">, "href" | "children">) {
  const cls = buttonClass(variant, size, className);
  const content = (
    <>
      <span>
        {children}
        {external && hint ? <span className="sr-only"> ({hint})</span> : null}
      </span>
      <TrailingIcon kind={external ? "external" : icon} />
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} data-state={state} target="_blank" rel="noopener" {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-state={state} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon = "none",
  state,
  children,
  className = "",
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "children">) {
  return (
    <button
      className={buttonClass(variant, size, className)}
      data-state={state}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      <span>{children}</span>
      <TrailingIcon kind={icon} />
    </button>
  );
}

/** Inline text link with an arrow — the tertiary action. */
export function ArrowLink({
  href,
  children,
  external,
  className = "",
  tone = "teal",
  hint,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  tone?: "teal" | "light";
  hint?: string;
}) {
  const color =
    tone === "light"
      ? "text-white decoration-white/50 hover:decoration-white"
      : "text-teal-ink decoration-teal-ink/40 hover:decoration-teal-ink";
  const cls = `group/al inline-flex items-center gap-1.5 font-semibold underline decoration-1 underline-offset-[0.3em] hover:decoration-2 ${color} ${className}`;
  const Icon = external ? ArrowUpRight : ArrowRight;
  const body = (
    <>
      <span>
        {children}
        {external && hint ? <span className="sr-only"> ({hint})</span> : null}
      </span>
      <Icon
        aria-hidden="true"
        strokeWidth={2}
        className={`size-[1.05em] shrink-0 transition-transform duration-200 ${external ? "group-hover/al:-translate-y-0.5 group-hover/al:translate-x-0.5" : "group-hover/al:translate-x-0.5"}`}
      />
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener">
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
