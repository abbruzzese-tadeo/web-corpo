// /pages/faq.jsx
// FAQ — Next.js (Pages Router) + Tailwind + i18n (messages.faq) + SEO + JSON-LD
// Estilo alineado a /further-school y /further-media: hero dark (glass), ondas invertidas, sección central blanca, CTA dark.

import React, { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { loadMessages } from "@/lib/i18n";

/* ============ Tokens coherentes ============ */
const BG_DARK = "bg-[#0C212D] text-white";
const BG_ALT = "bg-[#112C3E] text-white";
const SHELL = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/* Gradiente naranja→rojo */
const ACCENT = "from-[#EE7203] via-[#FF5A2B] to-[#FF3816]";
const GRAD = `bg-gradient-to-tr ${ACCENT}`;
const GRAD_TEXT = `bg-gradient-to-tr ${ACCENT} bg-clip-text text-transparent`;

/* Cards */
const CARD_GLASS =
  "rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.35)]";
const CARD_DARK =
  "rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm shadow-lg shadow-black/20";
const CARD_LIGHT = "rounded-[2rem] border border-gray-200 bg-white shadow-sm";

/* Tipos de texto */
const TITLE_DARK = "text-white font-bold tracking-tight";
const SUB_DARK = "text-white/70";
const TITLE_LIGHT = "text-gray-900 font-bold tracking-tight";
const SUB_LIGHT = "text-gray-600";

/* ============ Defaults i18n ============ */
const DEFAULT_META = {
  title: "FAQ | Further Corporate",
  description:
    "Frequently Asked Questions about Further Corporate: services, classes, payments, and more.",
  canonical: "https://your-domain.com/faq",
};

const DEFAULT_FAQ = [
  {
    id: "what-is-further",
    q: "What is Further Corporate?",
    a: "We are a language & technology studio focused on corporate training, content, and automation.",
  },
  {
    id: "how-classes-work",
    q: "How do classes work?",
    a: "We design role-based programs with measurable outcomes, blended resources, and flexible schedules.",
  },
  {
    id: "payments",
    q: "What payment methods do you accept?",
    a: "We accept standard corporate invoicing and recurring payments depending on the contract.",
  },
  {
    id: "certificates",
    q: "Do you provide certificates?",
    a: "Yes, we provide completion certificates and optional assessments depending on your plan.",
  },
];

/* ============ JSON-LD builder ============ */
function toFaqJsonLd(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/* ============ Ondas invertidas (1 path, rendimiento) ============ */
function WaveDivider({
  from = "dark", // "dark" rellena con blanco; "light" rellena con #0C212D
  flip = false, // true → mira hacia abajo
  height = 72,
  className = "",
}) {
  const fill = from === "dark" ? "#FFFFFF" : "#0C212D";
  return (
    <div
      aria-hidden
      className={className}
      style={{ transform: flip ? "scaleY(-1)" : "none" }}
    >
      <svg
        role="presentation"
        focusable="false"
        width="100%"
        height={height}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block w-full"
      >
        <path
          d="M0 0v48c55 18 122 22 188 8 96-20 156-51 230-51 75 0 139 33 213 49 74 16 145 12 219-7 74-19 148-61 222-38 74 23 148 103 228 111V0H0Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ============ Página ============ */
export default function FAQPage({ messages }) {
  /* -- i18n -- */
  const t = messages?.faq || {};
  const metaTitle = t?.meta?.title || DEFAULT_META.title;
  const metaDesc = t?.meta?.description || DEFAULT_META.description;
  const canonical = t?.meta?.canonical || DEFAULT_META.canonical;

  /* -- Items FAQ -- */
  const items =
    Array.isArray(t?.items) && t.items.length ? t.items : DEFAULT_FAQ;

  /* -- IDs estables para TOC -- */
  const withIds = useMemo(() => {
    const slug = (s = "") =>
      s
        .toLowerCase()
        .trim()
        .replace(/[áàä]/g, "a")
        .replace(/[éèë]/g, "e")
        .replace(/[íìï]/g, "i")
        .replace(/[óòö]/g, "o")
        .replace(/[úùü]/g, "u")
        .replace(/ñ/g, "n")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    return items.map((it) => ({ ...it, id: it.id || slug(it.q) }));
  }, [items]);

  /* -- JSON-LD -- */
  const jsonLd = useMemo(() => JSON.stringify(toFaqJsonLd(items)), [items]);

  return (
    <>
      {/* ===== HEAD: SEO + JSON-LD ===== */}
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        {/* OG/Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        {/* JSON-LD FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </Head>

      {/* Skip link a11y */}
      <a
        href="#faq-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:text-[#0C212D] focus:bg-white"
      >
        Skip to content
      </a>

      {/* ===== Layout alternado con ondas: dark → light → dark ===== */}
      <main className={`${BG_DARK} min-h-screen`} id="top">
        {/* === HERO (dark con glass + breadcrumb) === */}
        <section className="relative z-10" aria-labelledby="faq-hero-title">
          {/* orbs sutiles */}
          <div className="pointer-events-none" aria-hidden>
            <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-[#EE7203]/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FF3816]/20 blur-3xl" />
          </div>

          <div className={`${SHELL} pt-28 pb-16 lg:pt-36 lg:pb-24`}>
            <div className={`${CARD_GLASS} p-6 lg:p-8`}>
              <nav aria-label="Breadcrumb" className="text-sm text-white/70">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white">FAQ</li>
                </ol>
              </nav>

              <header className="mt-4">
                <h1
                  id="faq-hero-title"
                  className={`${TITLE_DARK} text-4xl sm:text-5xl lg:text-6xl leading-[1.08]`}
                >
                  <span className="block mb-2">Frequently Asked Questions</span>
                  <span className={`${GRAD_TEXT}`}>
                    Everything you need to know
                  </span>
                </h1>
                <p className="mt-4 text-white/80 max-w-2xl">
                  Can’t find the answer you’re looking for? Reach out to our
                  team and we’ll help you.
                </p>
              </header>
            </div>
          </div>

          {/* Onda bajando a la sección blanca */}
          <WaveDivider from="dark" height={78} flip />
        </section>

        {/* === CONTENIDO (blanco): TOC + FAQs (details/summary accesibles) === */}
        <section
          id="faq-main"
          className="bg-white text-gray-900"
          aria-labelledby="faq-list-title"
        >
          <div className={`${SHELL} py-12 lg:py-16`}>
            <h2
              id="faq-list-title"
              className={`${TITLE_LIGHT} text-3xl sm:text-4xl mb-8`}
            >
              {t?.heading || "Common questions"}
            </h2>

            <div className="grid gap-10 lg:grid-cols-12">
              {/* Índice (sticky) */}
              <aside className="lg:col-span-4">
                <div className={`${CARD_LIGHT} p-6 sticky top-24`}>
                  <h3 className="text-base font-bold mb-3">On this page</h3>
                  <ul className="space-y-2 text-sm">
                    {withIds.map((it) => (
                      <li key={it.id}>
                        <a
                          href={`#${it.id}`}
                          className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-gray-800 hover:text-gray-900 hover:bg-gray-50 outline-none focus-visible:ring-2 focus-visible:ring-gray-300 transition"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${GRAD}`}
                            aria-hidden
                          />
                          {it.q}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Lista de FAQs */}
              <div className="lg:col-span-8 space-y-4">
                {/* Card grande contenedora para coherencia visual */}
                <div className={`${CARD_LIGHT} divide-y divide-gray-200`}>
                  {withIds.map((it) => (
                    <article key={it.id} id={it.id} className="overflow-hidden">
                      {/* details/summary → disclosure nativo (a11y) */}
                      <details className="group">
                        <summary className="flex cursor-pointer items-center justify-between px-6 py-5 list-none">
                          <h3 className="text-base sm:text-lg font-semibold pr-6 text-gray-900">
                            {it.q}
                          </h3>
                          <span
                            className={`shrink-0 h-9 w-9 grid place-items-center rounded-full text-white ${GRAD} transition-transform duration-300 group-open:rotate-45`}
                            aria-hidden="true"
                            title="Toggle"
                          >
                            {/* “+” que rota a “×” al abrir */}
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 5v14M5 12h14"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                        </summary>

                        <div className="px-6 pb-6 pt-0 text-gray-800">
                          {/* Permite HTML básico desde i18n (enlaces/strong) */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: it.a,
                            }}
                          />
                        </div>
                      </details>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Onda subiendo a CTA dark */}
          <WaveDivider from="light" height={66} flip />
        </section>

        {/* === CTA final (dark alt) === */}
        <section className={`${BG_ALT}`} aria-labelledby="faq-cta-title">
          <div className={`${SHELL} py-16`}>
            <div
              className={`${CARD_DARK} p-8 md:p-10 relative overflow-hidden`}
            >
              <div
                aria-hidden
                className={`absolute -right-10 -top-10 h-60 w-60 rounded-full blur-3xl opacity-30 ${GRAD}`}
              />
              <div className="relative">
                <h3
                  id="faq-cta-title"
                  className={`${TITLE_DARK} text-3xl sm:text-4xl`}
                >
                  <span className={GRAD_TEXT}>Still have questions?</span>
                </h3>
                <p className="mt-2 text-white/80 max-w-2xl">
                  We’re here to help you choose the best path for your team.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contacto" // cambia a /contact en EN si corresponde
                    className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-[#0C212D] bg-white hover:bg-white/90 transition outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    Contact us
                  </Link>
                  <Link
                    href="/further-media#podcast"
                    className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white border border-white/15 hover:bg-white/5 transition outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    Listen to our podcast
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ============ i18n loader (Pages Router) ============ */
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
}
