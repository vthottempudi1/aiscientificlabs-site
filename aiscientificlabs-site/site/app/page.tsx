// app/page.tsx
// The home page. Sections in order: header, hero, services, lab (projects), approach,
// tech stack, writing, founder, contact, footer. Text content lives in this file;
// personal details (email, links, form id) live in lib/site.ts.

import { site } from "@/lib/site";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { ContactForm } from "@/components/contact-form";
import { MobileMenu } from "@/components/mobile-menu";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Marquee } from "@/components/magicui/marquee";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";

/* ---------- Content data ---------- */

// The four consulting services
const services = [
  {
    title: "Scientific document intelligence",
    body: "Search and question answering over journal articles, patents, lab reports and ELNs that reads chemical structures, reaction schemes, tables and figures, not just the text.",
    typical: "Literature copilots, prior-art search, internal R&D knowledge bases",
  },
  {
    title: "Molecular property prediction",
    body: "ADMET and physicochemical property models built on SMILES and molecular graphs, using fine-tuned chemical language models and graph neural networks.",
    typical: "Virtual screening, lead-optimisation triage, model reviews",
  },
  {
    title: "Clinical and regulatory copilots",
    body: "Agent systems that search ClinicalTrials.gov, FDA labels and guidance documents, compare protocols, and draft summaries where every claim links to its source.",
    typical: "Trial landscape analysis, eligibility comparison, regulatory intelligence",
  },
  {
    title: "AI architecture and deployment",
    body: "From prototype to production on AWS or GCP, with evaluation pipelines, guardrails, caching, monitoring and documentation your quality team can review.",
    typical: "Architecture reviews, RAG hardening, cloud deployment",
  },
];

// The engagement process (a real sequence, so it is numbered)
const steps = [
  { title: "Scope on your data", body: "We start from your documents, assays or trial questions, and agree what a correct answer looks like before choosing any model." },
  { title: "Build with evaluation gates", body: "Each release is measured on a fixed test set (faithfulness, retrieval precision, prediction error) and blocked if it regresses." },
  { title: "Keep people in the loop", body: "High-stakes steps, such as generated database queries or regulatory summaries, go to a reviewer before they take effect." },
  { title: "Deploy and hand over", body: "Containerised deployment in your own cloud, with monitoring, runbooks and documentation your team owns." },
];

// Section links in the header (and the phone menu)
const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#lab", label: "Lab" },
  { href: "#approach", label: "Approach" },
  { href: "#writing", label: "Writing" },
  { href: "#about", label: "About" },
];

// Medium series on enterprise RAG, in reading order
const articles = [
  {
    part: 1,
    title: "Building an enterprise-grade advanced RAG system",
    body: "What it took beyond the demo: structured and unstructured data, safety controls, evidence, cost and repeatable quality measurement.",
    href: "https://ai.plainenglish.io/building-an-enterprise-grade-advanced-rag-system-what-it-took-beyond-the-demo-3f30e2025dad",
  },
  {
    part: 2,
    title: "One chat interface, three sources of truth",
    body: "How one question-answering system routes between document retrieval, SQL and a hybrid of both.",
    href: "https://ai.plainenglish.io/most-enterprise-ai-assistants-begin-with-a-deceptively-simple-interface-one-text-box-94aa92106767",
  },
  {
    part: 3,
    title: "Retrieval is a pipeline",
    body: "Sentence-aware chunking, hybrid search and reranking, and why wrong evidence often starts well before the reranker.",
    href: "https://ai.plainenglish.io/retrieval-is-a-pipeline-sentence-aware-chunking-hybrid-search-and-reranking-43a289c9c41f",
  },
  {
    part: 4,
    title: "Evaluating RAG without fooling yourself",
    body: "Source precision, source recall and sealed holdouts, for answers that look right but rest on the wrong evidence.",
    href: "https://ai.plainenglish.io/evaluating-rag-without-fooling-yourself-article-4-of-5-d29c80231aff",
  },
  {
    part: 5,
    title: "When five relevant chunks still cannot answer the question",
    body: "Why retrieving relevant passages is not the same as having the evidence to answer the whole question.",
    href: "https://ai.plainenglish.io/enterprise-advanced-rag-article-5-of-5-22eaeeb42c59",
  },
];

// Technologies shown in the scrolling strip
const stack = ["Python", "PyTorch", "PyTorch Geometric", "Hugging Face", "LangGraph", "FastAPI", "Qdrant", "PostgreSQL + pgvector", "RAGAS", "AWS", "Google Cloud", "Docker"];

/* ---------- Small shared pieces ---------- */

// The hexagon logo mark used in the header and footer
function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
      <path d="M16 3 L27 9.5 L27 22.5 L16 29 L5 22.5 L5 9.5 Z" fill="none" stroke="var(--hero-teal)" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="3.4" fill="var(--signal)" />
    </svg>
  );
}

// Status indicator for each project: live (teal), build (amber), planned (grey)
function Status({ state, children }: { state: "live" | "build" | "planned"; children: string }) {
  return <span className="status" data-state={state}>{children}</span>;
}

// A section heading block with consistent spacing
function SectionHead({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <header className="mb-10 max-w-2xl">
      <h2 id={id} className="text-3xl sm:text-[2.6rem]">{title}</h2>
      {intro && <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>{intro}</p>}
    </header>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">
        Skip to content
      </a>

      {/* ===== Header (sticky, same colour as the hero) ===== */}
      <header className="sticky top-0 z-40 border-b backdrop-blur"
        style={{ background: "color-mix(in srgb, var(--hero-bg) 88%, transparent)", borderColor: "var(--hero-line)", paddingTop: "env(safe-area-inset-top)" }}>
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
          <a href="#top" className="flex items-center gap-2.5 font-medium" style={{ color: "var(--hero-ink)" }}>
            <LogoMark />
            <span className="text-[1.05rem] tracking-tight">AIScientificLabs</span>
          </a>
          <div className="hidden items-center gap-7 text-sm md:flex" style={{ color: "var(--hero-muted)" }}>
            {navLinks.map((l) => <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>)}
          </div>
          <div className="flex items-center gap-3">
            <a href={site.bookingUrl} className="btn-primary !px-4 !py-2 text-sm">Book a call</a>
            <MobileMenu links={navLinks} />
          </div>
        </nav>
      </header>

      <main id="main">
        {/* ===== Hero: headline + animated data-flow diagram on the hexagon field ===== */}
        <section id="top" className="hex-field" style={{ color: "var(--hero-ink)" }}>
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
            <div>
              <BlurFade>
                <h1 className="text-[2.6rem] sm:text-6xl lg:text-[4.1rem]">
                  AI Systems Built for Science. Engineered for Trust.
                </h1>
              </BlurFade>
              <BlurFade delay={0.15}>
                <p className="mt-6 max-w-xl text-lg sm:text-xl" style={{ color: "var(--hero-muted)" }}>
                  We design, evaluate, and deploy reliable AI systems for drug discovery, clinical research, and
                  regulatory intelligence. From evidence-grounded AI agents to molecular models, our solutions
                  prioritize measurable performance, scientific rigor, and human oversight.
                </p>
              </BlurFade>
              <BlurFade delay={0.3}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href={site.bookingUrl} className="btn-primary">Book a call <span aria-hidden className="ml-1.5">&rarr;</span></a>
                  <a href="#lab" className="btn-ghost">Explore our lab <span aria-hidden className="ml-1.5">&rarr;</span></a>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={0.45}>
              <PipelineDiagram />
            </BlurFade>
          </div>
        </section>

        {/* ===== Services: sticky heading on the left, ruled list on the right ===== */}
        <section className="mx-auto max-w-6xl px-5 py-24" aria-labelledby="services">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHead id="services" title="What we build"
                intro="Four kinds of engagement, each grounded in systems we have built." />
            </div>
            <ul className="divide-y" style={{ borderColor: "var(--line)" }}>
              {services.map((s) => (
                <li key={s.title} className="py-8 first:pt-0" style={{ borderColor: "var(--line)" }}>
                  <h3 className="text-2xl">{s.title}</h3>
                  <p className="mt-3 max-w-[62ch]" style={{ color: "var(--muted)" }}>{s.body}</p>
                  <p className="mt-4 text-sm"><span style={{ color: "var(--teal)" }}>Typical work:</span> {s.typical}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Lab: bento grid of projects with honest status labels ===== */}
        <section className="border-y py-24" style={{ borderColor: "var(--line)" }} aria-labelledby="lab">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead id="lab" title="The lab"
              intro="Systems we have built and are building. Each one is a reusable component for client work." />

            <BentoGrid>
              {/* TrialSentinel: the flagship, largest tile */}
              <BentoCard className="lg:col-span-4">
                <Status state="build">In build</Status>
                <h3 className="mt-4 text-3xl">TrialSentinel</h3>
                <p className="mt-1" style={{ color: "var(--teal)" }}>Multi-agent clinical trial intelligence engine</p>
                <p className="mt-4 max-w-[60ch]" style={{ color: "var(--muted)" }}>
                  Six specialist agents search and reason over ClinicalTrials.gov, with three-tier memory and a
                  human-in-the-loop learning loop that improves answers from reviewer feedback. Runs on Google Cloud.
                </p>
                <dl className="mt-auto grid grid-cols-2 gap-6 pt-8">
                  <div>
                    <dt className="text-sm" style={{ color: "var(--muted)" }}>Studies in scope</dt>
                    <dd className="text-4xl" style={{ fontFamily: "var(--font-display)" }}><NumberTicker value={400000} />+</dd>
                  </div>
                  <div>
                    <dt className="text-sm" style={{ color: "var(--muted)" }}>Specialist agents</dt>
                    <dd className="text-4xl" style={{ fontFamily: "var(--font-display)" }}><NumberTicker value={6} /></dd>
                  </div>
                </dl>
              </BentoCard>

              {/* Enterprise Advanced RAG: proof of production depth */}
              <BentoCard className="lg:col-span-2">
                <Status state="live">In production</Status>
                <h3 className="mt-4 text-2xl">Enterprise Advanced RAG</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--muted)" }}>
                  Hybrid dense and sparse retrieval with reranking, corrective RAG with critic and verifier
                  steps, a nine-layer guardrail pipeline and human approval for generated SQL. Deployed on AWS.
                </p>
                <dl className="mt-auto grid grid-cols-2 gap-4 pt-6">
                  <div>
                    <dt className="text-sm" style={{ color: "var(--muted)" }}>Faithfulness</dt>
                    <dd className="text-3xl" style={{ fontFamily: "var(--font-display)" }}><NumberTicker value={0.965} decimals={3} /></dd>
                  </div>
                  <div>
                    <dt className="text-sm" style={{ color: "var(--muted)" }}>Context precision</dt>
                    <dd className="text-3xl" style={{ fontFamily: "var(--font-display)" }}><NumberTicker value={0.992} decimals={3} /></dd>
                  </div>
                </dl>
                <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>RAGAS evaluation scores</p>
              </BentoCard>

              {/* MolDocIQ: chemistry-aware document ingestion */}
              <BentoCard className="lg:col-span-2">
                <Status state="planned">In design</Status>
                <h3 className="mt-4 text-2xl">MolDocIQ</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--muted)" }}>
                  Chemistry-aware PDF ingestion. Nougat parses scientific papers, DECIMER converts drawn
                  structures to SMILES, and RxnScribe turns reaction schemes into structured data.
                </p>
                <div className="mt-auto pt-5"><div className="mono rounded-lg border px-3 py-2.5 text-xs" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
                  <span style={{ color: "var(--muted)" }}>structure image to SMILES</span><br />
                  O=c1ccc2ccccc2o1
                </div></div>
              </BentoCard>

              {/* ChemBERTa-2 ADMET */}
              <BentoCard className="lg:col-span-2">
                <Status state="live">Deployed</Status>
                <h3 className="mt-4 text-2xl">ADMET prediction</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--muted)" }}>
                  Multi-task ADMET prediction from SMILES using a ChemBERTa-2 chemical language model
                  fine-tuned with LoRA, served through FastAPI on AWS ECS Fargate.
                </p>
              </BentoCard>

              {/* GNN molecular properties */}
              <BentoCard className="lg:col-span-2">
                <Status state="live">Built</Status>
                <h3 className="mt-4 text-2xl">Graph neural networks for molecular properties</h3>
                <p className="mt-3 text-[0.95rem]" style={{ color: "var(--muted)" }}>
                  Property prediction directly on molecular graphs with AttentiveFP and Graph Transformer
                  models in PyTorch Geometric.
                </p>
              </BentoCard>

              {/* SynthPath: what comes next */}
              <BentoCard className="lg:col-span-6 sm:flex-row sm:items-center sm:gap-8">
                <div className="shrink-0"><Status state="planned">Planned</Status></div>
                <div>
                  <h3 className="mt-3 text-2xl sm:mt-0">SynthPath</h3>
                  <p className="mt-1" style={{ color: "var(--muted)" }}>
                    From biological target to synthesizable candidate molecules in three phases, built on the components above.
                  </p>
                </div>
              </BentoCard>
            </BentoGrid>
          </div>
        </section>

        {/* ===== Approach: numbered because it is a real sequence ===== */}
        <section className="mx-auto max-w-6xl px-5 py-24" aria-labelledby="approach">
          <SectionHead id="approach" title="How an engagement runs"
            intro="Regulated science needs systems you can audit. The process is built around that." />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t pt-5" style={{ borderColor: "var(--teal)" }}>
                <span className="text-sm" style={{ color: "var(--teal)" }}>Step {i + 1}</span>
                <h3 className="mt-2 text-xl">{s.title}</h3>
                <p className="mt-2 text-[0.95rem]" style={{ color: "var(--muted)" }}>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ===== Tech stack strip ===== */}
        <section className="border-y py-8" style={{ borderColor: "var(--line)" }} aria-label="Technologies we work with">
          <Marquee duration="45s">
            {stack.map((t) => <span key={t} className="whitespace-nowrap text-lg" style={{ color: "var(--muted)" }}>{t}</span>)}
          </Marquee>
        </section>

        {/* ===== Writing ===== */}
        <section className="mx-auto max-w-6xl px-5 py-24" aria-labelledby="writing">
          <SectionHead id="writing" title="Writing" intro="Notes on building AI systems that hold up in production." />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.part} className="flex">
                <a href={a.href} className="bento-card group flex w-full flex-col p-7 transition-colors hover:border-[color:var(--teal)]">
                  <p className="text-sm" style={{ color: "var(--teal)" }}>Enterprise RAG series · Part {a.part} of 5</p>
                  <h3 className="mt-2 text-xl group-hover:underline">{a.title}</h3>
                  <p className="mt-3 text-[0.95rem]" style={{ color: "var(--muted)" }}>{a.body}</p>
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-6"><a href={site.links.medium} className="underline underline-offset-4" style={{ color: "var(--teal)" }}>Read all articles on Medium</a></p>
        </section>

        {/* ===== Founder ===== */}
        <section className="border-t" style={{ borderColor: "var(--line)" }} aria-labelledby="about">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 id="about" className="text-3xl sm:text-[2.6rem]">Founder</h2>
            <div className="max-w-[62ch] text-lg">
              <p>
                {site.founder} is an AI solutions architect with more than twelve years in enterprise software
                engineering. He builds production retrieval, agent and molecular AI systems and deploys them on
                AWS and Google Cloud.
              </p>
              <p className="mt-4" style={{ color: "var(--muted)" }}>
                AIScientificLabs brings that engineering discipline to life-science teams that need AI they can
                measure, review and trust.
              </p>
              <div className="mt-6 flex gap-6 text-base">
                <a href={site.links.linkedin} className="underline underline-offset-4" style={{ color: "var(--teal)" }}>LinkedIn</a>
                <a href={site.links.github} className="underline underline-offset-4" style={{ color: "var(--teal)" }}>GitHub</a>
                <a href={site.links.medium} className="underline underline-offset-4" style={{ color: "var(--teal)" }}>Medium</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="hex-field" style={{ color: "var(--hero-ink)" }} aria-labelledby="contact-title">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 id="contact-title" className="text-3xl sm:text-[2.6rem]">Start a conversation</h2>
              <p className="mt-4 max-w-md text-lg" style={{ color: "var(--hero-muted)" }}>
                Tell us about the data and the decision it should support. You&apos;ll get a reply within two business days.
              </p>
              <p className="mt-8" style={{ color: "var(--hero-muted)" }}>
                Or email <a href={`mailto:${site.email}`} className="underline underline-offset-4" style={{ color: "var(--hero-teal)" }}>{site.email}</a>
              </p>
            </div>
            <div style={{ color: "var(--ink)" }}><ContactForm /></div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="border-t" style={{ borderColor: "var(--line)", paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ color: "var(--muted)" }}>
          <div className="flex items-center gap-2"><LogoMark /><span>© {new Date().getFullYear()} AIScientificLabs</span></div>
          <div className="flex gap-6">
            <a href={site.links.linkedin} className="hover:underline">LinkedIn</a>
            <a href={site.links.github} className="hover:underline">GitHub</a>
            <a href={`mailto:${site.email}`} className="hover:underline">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
