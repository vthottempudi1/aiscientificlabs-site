"use client";
// components/contact-form.tsx
// Contact form that sends messages to your email through Formspree (free tier),
// so the static site needs no backend server. Shows clear success and error states.

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  // idle -> sending -> sent | error
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Sends the form fields to Formspree as JSON
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <p className="bento-card p-6" role="status">
        Message sent. You&apos;ll get a reply at the email you entered, usually within two business days.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bento-card grid gap-4 p-6 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          Name
          <input name="name" required autoComplete="name" className="field" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Work email
          <input name="email" type="email" required autoComplete="email" className="field" />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        Organisation
        <input name="organisation" autoComplete="organization" className="field" />
      </label>
      <label className="grid gap-1.5 text-sm">
        What are you working on?
        <textarea name="message" required rows={5} className="field"
          placeholder="The data you have, the decision it should support, and any regulatory constraints." />
      </label>
      {state === "error" && (
        <p className="text-sm" style={{ color: "var(--signal)" }} role="alert">
          The message didn&apos;t send. Check your connection and try again, or email {site.email} directly.
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn-primary justify-self-start disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
