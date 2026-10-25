import type { ComponentProps } from "react";
import { CircleAlert } from "lucide-react";

export type FieldState = "focus" | "error" | "filled" | "disabled";

const control =
  "block w-full rounded-sm border-[1.5px] bg-white px-4 text-body text-ink placeholder:text-graphite/70 " +
  "transition-[border-color,box-shadow] duration-150 outline-none " +
  "border-line-strong hover:border-graphite " +
  "focus:border-teal-ink focus:shadow-[0_0_0_4px_rgb(25_146_155/0.22)] " +
  "data-[state=focus]:border-teal-ink data-[state=focus]:shadow-[0_0_0_4px_rgb(25_146_155/0.22)] " +
  "aria-invalid:border-danger aria-invalid:bg-danger-tint/40 aria-invalid:focus:shadow-[0_0_0_4px_rgb(180_35_24/0.18)] " +
  "disabled:cursor-not-allowed disabled:border-line disabled:bg-mist-50 disabled:text-graphite";

export function Field({
  id,
  label,
  required,
  requiredLabel,
  error,
  multiline,
  state,
  className = "",
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  requiredLabel?: string;
  error?: string;
  multiline?: boolean;
  state?: FieldState;
  className?: string;
} & Omit<ComponentProps<"input">, "id"> &
  Omit<ComponentProps<"textarea">, "id">) {
  const errId = `${id}-error`;
  const shared = {
    id,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errId : undefined,
    "aria-required": required || undefined,
    "data-state": state,
    disabled: state === "disabled" || rest.disabled,
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-1 text-small font-semibold text-ink">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-danger">
              *
            </span>
            {requiredLabel && <span className="sr-only">({requiredLabel})</span>}
          </>
        )}
      </label>
      {multiline ? (
        <textarea {...(rest as ComponentProps<"textarea">)} {...shared} rows={5} className={`${control} min-h-36 resize-y py-3.5`} />
      ) : (
        <input {...(rest as ComponentProps<"input">)} {...shared} className={`${control} h-13`} />
      )}
      {error && (
        <p id={errId} className="mt-2 flex items-start gap-1.5 text-small font-semibold text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2.25} />
          {error}
        </p>
      )}
    </div>
  );
}
