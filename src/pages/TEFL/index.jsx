// /pages/TEFL/index.jsx
// TEFL — Teaching English as a Foreign Language (es/en con fallbacks)
// Diseño alineado a /pages/nosotros: hero dark, ondas invertidas, sección blanca central, animaciones livianas.

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { loadMessages } from "@/lib/i18n";
import { WaveToDark, WaveToLight } from "@/componentes/ui/Waves";

/* ====== Tokens (mismos que /nosotros) ====== */
const BG_DARK = "bg-[#0A1628]";
const CARD_GLASS =
  "rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.35)]";
const GRAD = "bg-gradient-to-tr from-[#EE7203] via-[#FF4D1F] to-[#FF3816]";
const GRAD_TEXT =
  "bg-gradient-to-r from-[#EE7203] via-[#FF4D1F] to-[#FF3816] bg-clip-text text-transparent";
const TITLE_DARK = "text-white font-bold tracking-tight";
const SUB_DARK = "text-white/70";
const BODY_DARK = "text-white/90";
const TITLE_LIGHT = "text-gray-900 font-bold tracking-tight";
const SUB_LIGHT = "text-gray-600";
const BODY_LIGHT = "text-gray-800";
const LINK =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#FF3816]/60 transition-all duration-300";

/* ====== Animations (ligeras) ====== */
function useVariants() {
  const reduce = useReducedMotion();
  return {
    fadeUp: {
      hidden: { opacity: 0, y: reduce ? 0 : 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      },
    },
    fadeIn: {
      hidden: { opacity: 0, scale: reduce ? 1 : 0.98 },
      show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      },
    },
    stagger: {
      hidden: {},
      show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
    },
  };
}






/* ====== Page ====== */
export default function TEFLIndex({ messages }) {
  const t = messages?.tefl ?? {};
  const meta = t?.meta ?? {};
  const hero = t?.hero ?? {};
  // -- Para mantener compatibilidad con tu JSON anterior:
  const blocks = t?.blocks ?? {};
  const workAbroad = blocks?.workAbroad ?? {};
  const cert = blocks?.cert ?? {};
  const closing = t?.closing ?? {};

  // -- Si en el futuro agregás estructura tipo /nosotros:
  const intro = t?.intro ?? {
    // fallbacks desde workAbroad (contenido en blanco)
    heading: workAbroad?.title || "Work and teach abroad",
    subheading:
      workAbroad?.lead ||
      "Open doors to global opportunities with a TEFL foundation.",
    paragraphs: [
      workAbroad?.body ||
        "Gain classroom confidence, modern methodology, and practical tools to thrive internationally.",
    ],
  };

  // -- sección “curriculum/certificación” (oscura), usa datos de cert
  const curriculum = {
    title: cert?.title || "Certification & methodology",
    items: [
      {
        title: "Communicative Approach",
        text:
          cert?.body1 ||
          "Learn frameworks like Communicative Approach, TBL, PPP, and solid assessment practices.",
      },
      {
        title: "Lesson Planning",
        text:
          cert?.body2 ||
          "Plan effective lessons, manage classrooms, and measure real learning outcomes.",
      },
    ],
  };

  const cta = t?.cta ?? {
    title: "Ready to kick-off your TEFL journey?",
    subtitle:
      "Let’s shape your international teaching path with practical, measurable outcomes.",
    button: "Request Consultation",
    href: "/contacto",
  };

  const { fadeUp, fadeIn, stagger } = useVariants();

  return (
    <>
      <Head>
        <title>
          {meta.title || "TEFL — Teaching English as a Foreign Language"}
        </title>
        <meta
          name="description"
          content={
            meta.description ||
            "Professional TEFL foundations: methodology, planning, and measurable impact."
          }
        />
      </Head>

      <main
        className={`${BG_DARK} min-h-screen relative overflow-hidden text-white`}
      >
        {/* --- HERO (dark) --- */}
        <section className="relative z-10" aria-labelledby="tefl-hero-title">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 lg:pt-36 lg:pb-24">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center"
            >
              {/* copy */}
              <motion.div variants={fadeUp} className="space-y-8">
                {hero?.badge && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/85 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#EE7203] to-[#FF3816]" />
                    {hero.badge}
                  </span>
                )}

                <div>
                  <h1
                    id="tefl-hero-title"
                    className={`${TITLE_DARK} text-4xl sm:text-5xl lg:text-6xl leading-[1.08]`}
                  >
                    {/* soporte a tu estructura anterior hero.title + subtitle */}
                    {!!hero?.title && (
                      <span className="block mb-3">{hero.title}</span>
                    )}
                    <span className={`inline-block ${GRAD_TEXT}`}>
                      {hero?.subtitle ||
                        "Teaching English as a Foreign Language"}
                    </span>
                  </h1>

                  {hero?.description && (
                    <p className={`${SUB_DARK} mt-4 text-lg max-w-xl`}>
                      {hero.description}
                    </p>
                  )}
                </div>

                {(hero?.primaryCta?.label || hero?.secondaryCta?.label) && (
                  <div className="flex flex-wrap gap-4">
                    {hero?.primaryCta?.label && (
                      <a
                        href={hero?.primaryCta?.href || cta.href || "#contact"}
                        className={`${LINK} ${GRAD} text-white shadow-[0_10px_34px_rgba(238,114,3,0.35)] hover:scale-[1.02] active:scale-[.99]`}
                      >
                        {hero.primaryCta.label} <span aria-hidden>↗</span>
                      </a>
                    )}
                    {hero?.secondaryCta?.label && (
                      <a
                        href={hero?.secondaryCta?.href || "#curriculum"}
                        className={`${LINK} ${CARD_GLASS} text-white/90 hover:border-white/20`}
                      >
                        {hero.secondaryCta.label} <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>

              {/* visual */}
              <motion.div variants={fadeIn} className="relative">
                <div className={`${CARD_GLASS} p-2`}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={hero?.imageSrc || "/images/tefl/hero-class.jpg"}
                      alt={hero?.imageAlt || "TEFL classroom"}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {hero?.caption && (
                    <div className="mt-4 px-4 pb-2 text-sm text-white/65">
                      {hero.caption}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* 🔽 Onda invertida bajando a la sección blanca */}
          <WaveToLight  />
        </section>

        {/* --- INTRO (blanco) --- */}
        <section
          className="bg-white text-gray-900"
          aria-labelledby="intro-title"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="rounded-[2rem] border border-gray-200 bg-white shadow-sm p-8 lg:p-12"
            >
              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                <motion.div variants={fadeUp}>
                  <h2
                    id="intro-title"
                    className={`${TITLE_LIGHT} text-3xl sm:text-4xl`}
                  >
                    {intro?.heading}
                  </h2>
                  {intro?.subheading && (
                    <p className={`${SUB_LIGHT} text-lg mt-2`}>
                      {intro.subheading}
                    </p>
                  )}
                  <div className="mt-5 w-16 h-1.5 rounded-full bg-gradient-to-r from-[#EE7203] to-[#FF3816]" />
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-6">
                  {(intro?.paragraphs ?? []).map((p, i) => (
                    <p
                      key={i}
                      className={`${BODY_LIGHT} leading-relaxed text-base`}
                    >
                      {p}
                    </p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 🔼 Onda sube a banda dark (invertida para empalmar) */}
          <WaveToDark  />
        </section>

        {/* --- CURRICULUM / CERT (dark) --- */}
        <section
  id="curriculum"
  className="relative z-10 bg-[#0A1628] text-white"
  aria-labelledby="curriculum-title"
>

          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-12">
                <h3
                  id="curriculum-title"
                  className={`${TITLE_DARK} text-3xl sm:text-4xl`}
                >
                  {curriculum.title}
                </h3>
                <p className={`${SUB_DARK} mt-3 max-w-2xl mx-auto`}>
                  {workAbroad?.lead ||
                    "A hands-on approach to planning, delivery, and evaluation."}
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                {curriculum.items.map((it, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    className={`${CARD_GLASS} p-8`}
                  >
                    <h4 className="text-white font-semibold text-xl">
                      {it.title}
                    </h4>
                    <p className="mt-3 text-white/85 leading-relaxed">
                      {it.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- CTA (dark) --- */}
        <section className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className={`${CARD_GLASS} p-10 lg:p-14`}
            >
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <h4 className={`${TITLE_DARK} text-3xl sm:text-4xl mb-4`}>
                    {cta?.title}
                  </h4>
                  {cta?.subtitle && (
                    <p className={`${SUB_DARK} text-lg`}>{cta.subtitle}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <a
                    href={cta?.href || "/contacto"}
                    className={`${LINK} ${GRAD} text-white shadow-[0_10px_34px_rgba(238,114,3,0.35)] hover:scale-[1.02]`}
                    aria-label={cta?.button || "Request Consultation"}
                  >
                    {cta?.button || "Request Consultation"}{" "}
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

/* i18n */
export async function getStaticProps({ locale }) {
  return { props: { messages: await loadMessages(locale) } };
}
