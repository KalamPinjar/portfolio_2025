"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Three fields, native form semantics, no form library.
 *
 * The route handler validates the same payload with Zod — that is where the
 * real rule lives. The client copy exists only to give fast feedback, and a
 * form this size does not justify shipping a validation runtime to do it.
 * Uncontrolled inputs mean typing causes no React re-render at all.
 */
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: {
  name: string;
  email: string;
  message: string;
}): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Tell me what to call you — two characters or more.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "That does not look like an email address.";
  }
  if (values.message.trim().length < 20) {
    errors.message = "A bit more detail helps — 20 characters or more.";
  } else if (values.message.length > 4000) {
    errors.message = "Over 4000 characters. Trim it, or email me directly.";
  }

  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Send focus to the first field that needs attention.
      const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        toast.error("That did not send", {
          description: payload.error ?? `Email me directly at ${site.email}.`,
        });
        return;
      }

      form.reset();
      setSent(true);
      toast.success("Message sent", {
        description: "I reply to everything that is not a template.",
      });
    } catch {
      toast.error("That did not send", {
        description: `Check your connection, or email me at ${site.email}.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  function clearError(field: keyof Errors) {
    setErrors((previous) =>
      previous[field] ? { ...previous, [field]: undefined } : previous,
    );
  }

  if (sent) {
    return (
      <div className="rounded-card border border-accent/30 bg-accent/[0.06] p-8">
        <p className="font-display text-2xl font-bold tracking-tight">Got it.</p>
        <p className="mt-3 text-fg-2">
          I will come back to you within a day or so. If it is urgent, my inbox
          is{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-sm text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-fg-2 underline underline-offset-4 hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Field label="Name" error={errors.name} htmlFor="name">
        <input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          onInput={() => clearError("name")}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Email" error={errors.email} htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          onInput={() => clearError("email")}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field label="Message" error={errors.message} htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="What are you building, and where do you need a hand?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          onInput={() => clearError("message")}
          className={cn(inputClass(!!errors.message), "min-h-32 resize-y")}
        />
      </Field>

      {/* Honeypot — hidden from people, visible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="self-start">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-control border bg-surface px-4 py-3 text-sm text-fg transition-colors duration-150 placeholder:text-fg-3",
    "focus:outline-none focus-visible:border-accent",
    hasError ? "border-signal" : "border-line hover:border-line-strong",
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="label text-fg-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-signal">
          {error}
        </p>
      )}
    </div>
  );
}
