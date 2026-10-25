"use client";

import { useRef, useState } from "react";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import type { SiteCopy } from "@/content/site";

type Values = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The existing evenir.cz contact form (same four fields + consent), restyled.
 * PREVIEW ONLY: nothing is submitted anywhere — the confirmation says so.
 */
export function ContactForm({ t, privacyHref }: { t: SiteCopy["form"]; privacyHref: string }) {
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const validate = (v: Values): Errors => {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = t.errors.name;
    if (!EMAIL.test(v.email.trim())) e.email = t.errors.email;
    if (v.phone.replace(/[^\d+]/g, "").length < 9) e.phone = t.errors.phone;
    if (v.message.trim().length < 5) e.message = t.errors.message;
    return e;
  };

  const set = (k: keyof Values) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: ev.target.value };
    setValues(next);
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    }, 700);
  };

  if (status === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="flex min-h-[28rem] flex-col items-start justify-center outline-none">
        <span className="grid size-14 place-items-center rounded-full bg-mist-100 text-teal-ink">
          <CircleCheck aria-hidden="true" className="size-7" strokeWidth={2} />
        </span>
        <p className="display-tight mt-6 text-h3 text-ink">{t.successTitle}</p>
        <p className="mt-2 text-body">{t.successText}</p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-sm bg-orange-tint px-3 py-2 text-small font-semibold text-ink">
          <Info aria-hidden="true" className="size-4 text-ink" strokeWidth={2.25} />
          {t.demo}
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setValues({ name: "", email: "", phone: "", message: "" });
            setStatus("idle");
          }}
        >
          {t.again}
        </Button>
      </div>
    );
  }

  const errorList = (Object.keys(errors) as (keyof Values)[]).filter((k) => errors[k]);

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="form-demo-note">
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-md border-[1.5px] border-danger/40 bg-danger-tint p-4 text-small text-ink outline-none focus-visible:ring-2 focus-visible:ring-danger"
        >
          <p className="flex items-center gap-2 font-semibold text-danger">
            <CircleAlert aria-hidden="true" className="size-4" strokeWidth={2.25} />
            {t.errors.summary}
          </p>
          <ul className="mt-2 grid gap-1 ps-6">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#cf-${k}`} className="link">
                  {t[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" name="name" label={t.name} required requiredLabel={t.required} autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} />
        <Field id="cf-email" name="email" type="email" label={t.email} required requiredLabel={t.required} autoComplete="email" inputMode="email" value={values.email} onChange={set("email")} error={errors.email} />
        <Field id="cf-phone" name="phone" type="tel" label={t.phone} required requiredLabel={t.required} autoComplete="tel" inputMode="tel" value={values.phone} onChange={set("phone")} error={errors.phone} className="sm:col-span-2" />
        <Field id="cf-message" name="message" label={t.message} required requiredLabel={t.required} multiline value={values.message} onChange={set("message")} error={errors.message} className="sm:col-span-2" />
      </div>
      <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-graphite">
          {t.consentA}
          <a href={privacyHref} target="_blank" rel="noopener" className="link">
            {t.consentLink}
          </a>
          {t.consentB}
        </p>
        <Button type="submit" size="lg" className="shrink-0" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </Button>
      </div>
      <p id="form-demo-note" className="sr-only">
        {t.demo}
      </p>
    </form>
  );
}
