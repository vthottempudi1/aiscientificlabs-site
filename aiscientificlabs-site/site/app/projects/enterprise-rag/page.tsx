// app/projects/enterprise-rag/page.tsx
// Case study for the Enterprise Advanced RAG project.
// Every figure here comes from the project's README and its Cloud-v2 evaluation summary on GitHub.

import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Enterprise Advanced RAG case study | AIScientificLabs",
  description:
    "Architecture, evaluation method, results and known limitations of a RAG and Text-to-SQL system deployed on AWS, scored on a 40-question challenge set over 363 sources.",
};

const repo = "https://github.com/vthottempudi1/NEW-ADV-RAG-IMPLEMENT";
const report = `${repo}/blob/main/evals/reports/EVALUATION_SUMMARY_20260712.md`;

// Release results from the Cloud-v2 evaluation summary
const results = [
  { metric: "Faithfulness", challenge: "0.965", regression: "0.963" },
  { metric: "Context precision", challenge: "0.992", regression: "0.965" },
  { metric: "Context recall", challenge: "0.976", regression: "0.986" },
  { metric: "Answer relevancy", challenge: "0.978", regression: "0.983" },
  { metric: "Source precision", challenge: "0.975", regression: "1.000" },
  { metric: "Source recall", challenge: "0.944", regression: "1.000" },
  { metric: "Forbidden-answer, forbidden-source and route violations", challenge: "0", regression: "0" },
];

// What was evaluated
const setup = [
  ["Corpus", "363 sources: 49 authoritative documents and 314 noisy distractors"],
  ["Vector points", "34,420 chunks in Qdrant Cloud"],
  ["Embedding model", "text-embedding-3-small"],
  ["Answer model", "gpt-4o"],
  ["LLM judge", "gpt-4o-mini"],
  ["Release", "Cloud-v2, retrieval cache schema 52, evaluated July 12–13, 2026"],
];

const architecture = [
  { title: "Routing", body: "Each question is routed to document retrieval, Text-to-SQL, or a hybrid of both, and LangGraph orchestrates the chosen path." },
  { title: "Retrieval", body: "Dense, sparse and hybrid search with reranking, plus HyDE, corrective RAG and self-reflective RAG as conditional policies. Hybrid search with reranking proved the strongest default." },
  { title: "Governed SQL", body: "Generated SQL is parsed with sqlglot and only safe, read-only, single-statement queries are allowed. Execution pauses until a person approves it." },
  { title: "Guardrails", body: "Nine checkpoints: request validation, JWT auth, rate limits, token budgets, input restructuring, prompt-injection checks, moderation and redaction, isolated retrieved context, and output validation." },
  { title: "Caching and ingestion", body: "Five query-time cache tiers with saved-cost telemetry. Ingestion hashes each document so the same file is never indexed twice." },
  { title: "Deployment", body: "FastAPI services on AWS ECS Fargate behind load balancers, with RDS PostgreSQL, S3, Qdrant Cloud, Route 53, ACM, autoscaling and CloudWatch alarms." },
];

const limitations = [
  "Two retrieval edge cases remain open by design rather than being tuned against a dataset that has already been seen. In one, retrieval can prefer a related but less specific source. In the other, an answer can be correct while citing only one of two expected sources.",
  "LLM-judged scores vary from run to run. Some correct answers scored just under their per-question threshold and passed on a focused rerun; this is recorded as judge variance, not counted as a deterministic pass.",
  "Prompt-injection, PII and output checks are mainly pattern-based. They are defensive checkpoints, not a complete security product.",
  "The corpus is enterprise IT operations content, not scientific literature. The project demonstrates the retrieval, evaluation and governance approach used for scientific work.",
  "This is a portfolio system deployed on AWS, not a client production deployment.",
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-14" aria-labelledby={id}>
      <h2 id={id} className="text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function EnterpriseRagCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hex-field" style={{ color: "var(--hero-ink)" }}>
          <div className="mx-auto max-w-4xl px-5 pb-16 pt-14 sm:pt-20">
            <a href="/#lab" className="text-sm hover:underline" style={{ color: "var(--hero-muted)" }}>&larr; All projects</a>
            <p className="mt-6 text-sm" style={{ color: "var(--hero-teal)" }}>Case study · Deployed on AWS · portfolio</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">Enterprise Advanced RAG</h1>
            <p className="mt-5 max-w-2xl text-lg" style={{ color: "var(--hero-muted)" }}>
              One question-answering system over documents and a SQL database, with governed query generation,
              human approval, nine guardrail checkpoints, and a release evaluated against a deliberately noisy corpus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={repo} className="btn-primary">Code on GitHub <span aria-hidden className="ml-1.5">&rarr;</span></a>
              <a href={report} className="btn-ghost">Full evaluation report <span aria-hidden className="ml-1.5">&rarr;</span></a>
            </div>
          </div>
        </section>

        <Section id="problem" title="The problem">
          <p className="text-lg" style={{ color: "var(--muted)" }}>
            Most RAG demos stop at upload, embed, retrieve and answer. Real questions mix document knowledge with
            operational data, such as &ldquo;How many P1 incidents breached SLA last month, and what is our escalation
            policy?&rdquo; A useful system has to answer both halves, show its evidence, refuse unsafe operations, and
            prove its quality on more than a few hand-picked examples.
          </p>
        </Section>

        <Section id="architecture" title="Architecture">
          <ul className="grid gap-4 sm:grid-cols-2">
            {architecture.map((a) => (
              <li key={a.title} className="bento-card p-6">
                <h3 className="text-xl">{a.title}</h3>
                <p className="mt-2 text-[0.95rem]" style={{ color: "var(--muted)" }}>{a.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="evaluation" title="How it was evaluated">
          <p className="text-lg" style={{ color: "var(--muted)" }}>
            Pull requests are blocked by deterministic checks that need no judge model: expected route, forbidden
            answers, forbidden sources, and exact source precision and recall. LLM-judged RAGAS metrics run at release.
            Holdout sets are checksummed and run once; after their results influence a change, they move into regression.
          </p>
          <dl className="bento-card mt-8 divide-y" style={{ borderColor: "var(--line)" }}>
            {setup.map(([k, v]) => (
              <div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[12rem_1fr]" style={{ borderColor: "var(--line)" }}>
                <dt className="text-sm" style={{ color: "var(--muted)" }}>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="results" title="Results">
          <div className="bento-card overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm" style={{ color: "var(--muted)" }}>
                  <th className="px-6 py-4 font-normal">Metric</th>
                  <th className="px-6 py-4 font-normal">40-question challenge</th>
                  <th className="px-6 py-4 font-normal">12-question regression</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.metric} className="border-t" style={{ borderColor: "var(--line)" }}>
                    <td className="px-6 py-3">{r.metric}</td>
                    <td className="mono px-6 py-3">{r.challenge}</td>
                    <td className="mono px-6 py-3">{r.regression}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
            Source: <a href={report} className="underline underline-offset-4" style={{ color: "var(--teal)" }}>Cloud-v2 evaluation summary</a>.
            The codebase also passes 178 automated tests in CI.
          </p>
        </Section>

        <Section id="limitations" title="Known limitations">
          <ul className="space-y-4">
            {limitations.map((l) => (
              <li key={l} className="border-l-2 pl-4" style={{ borderColor: "var(--signal)", color: "var(--muted)" }}>{l}</li>
            ))}
          </ul>
        </Section>

        <section className="hex-field" style={{ color: "var(--hero-ink)" }}>
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl">Need this level of evidence for your data?</h2>
              <p className="mt-2" style={{ color: "var(--hero-muted)" }}>We apply the same evaluation discipline to scientific and clinical systems.</p>
            </div>
            <a href={site.bookingUrl} className="btn-primary shrink-0">Book a call <span aria-hidden className="ml-1.5">&rarr;</span></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
