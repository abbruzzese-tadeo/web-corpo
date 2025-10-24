// pages/nosotros/index.jsx
// -- Mismo contenido y diseño, pero ondas invertidas (mirando hacia abajo)
// -- Sin animaciones costosas, 1 path optimizado por onda, excelente rendimiento.

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { loadMessages } from "@/lib/i18n";
import { WaveToDark, WaveToLight } from "@/componentes/ui/Waves";

/* ====== Tokens ====== */
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
export default function AboutIndex({ messages }) {
  const t = messages?.about ?? {};
  const meta = t?.meta ?? {};
  const hero = t?.hero ?? {};
  const intro = t?.intro ?? {};
  const media = t?.media ?? {};
  const testimonials = t?.testimonials ?? {};
  const cta = t?.cta ?? {};

  const { fadeUp, fadeIn, stagger } = useVariants();

  return (
    <>
      <Head>
        <title>{meta.title || "About | Further Corporate"}</title>
        <meta
          name="description"
          content={
            meta.description ||
            "Professional language services delivering measurable impact."
          }
        />
      </Head>

      <main
        className={`${BG_DARK} min-h-screen relative overflow-hidden text-white`}
      >
       
        {/* --- HERO CON VIDEO PARALLAX --- */}
<section
  className="relative z-10 overflow-hidden min-h-[90vh] flex items-center justify-center"
  aria-labelledby="about-hero-title"
>
  {/* Video de fondo */}
  <motion.div
    className="absolute inset-0 -z-10 overflow-hidden"
    style={{ perspective: 1000 }}
  >
    <motion.video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/images/school-poster.webp"
      className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
      style={{
        scale: useTransform(useScroll().scrollYProgress, [0, 1], [1, 1.15]),
        y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -120]),
      }}
    >
      <source src="/videos/school-bg.webm" type="video/webm" />
      <source src="/videos/school-bg.mp4" type="video/mp4" />
    </motion.video>

    {/* Overlay para contraste */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/85 to-[#0A1628]/95" />
  </motion.div>

  {/* Orbes decorativos */}
  <div
    className="pointer-events-none absolute inset-0 -z-[5]"
    aria-hidden
  >
    <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-[#EE7203]/25 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FF3816]/20 blur-3xl" />
  </div>

  {/* Contenido centrado */}
  <div className="relative text-center px-6">
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      key="about-hero"
      className="max-w-3xl mx-auto space-y-8"
    >
     

      <motion.h1
        variants={fadeUp}
        id="about-hero-title"
        className={`${TITLE_DARK} text-4xl sm:text-5xl lg:text-6xl leading-[1.1]`}
      >
        {!!hero?.title?.prefix && (
          <span className="block mb-3">{hero.title.prefix}</span>
        )}
        {!!hero?.title?.highlight && (
          <span className={`${GRAD_TEXT}`}>{hero.title.highlight}</span>
        )}
      </motion.h1>

      {hero?.subtitle && (
        <motion.p
          variants={fadeUp}
          className={`${SUB_DARK} text-lg max-w-xl mx-auto`}
        >
          {hero.subtitle}
        </motion.p>
      )}

      {hero?.description && (
        <motion.p
          variants={fadeUp}
          className={`${BODY_DARK} text-base max-w-xl mx-auto`}
        >
          {hero.description}
        </motion.p>
      )}

      {(hero?.primaryCta?.label || hero?.secondaryCta?.label) && (
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 pt-2"
        >
          {hero?.primaryCta?.label && (
            <a
              href={hero?.primaryCta?.href || "#contact"}
              className={`${LINK} ${GRAD} text-white shadow-[0_10px_34px_rgba(238,114,3,0.35)] hover:scale-[1.02] active:scale-[.99]`}
            >
              {hero.primaryCta.label} <span aria-hidden>↗</span>
            </a>
          )}
          {hero?.secondaryCta?.label && (
            <a
              href={hero?.secondaryCta?.href || "#media"}
              className={`${LINK} ${CARD_GLASS} text-white/90 hover:border-white/20`}
            >
              {hero.secondaryCta.label} <span aria-hidden>→</span>
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  </div>

</section>

  {/* 🔽 Onda invertida hacia la siguiente sección */}
  <WaveToLight  />


        {/* --- INTRO (blanco) --- */}
        {(intro?.heading || (intro?.paragraphs ?? []).length > 0) && (
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
                    {typeof intro?.headlineNumber !== "undefined" && (
                      <div
                        className={`text-6xl sm:text-7xl font-black ${GRAD_TEXT}`}
                      >
                        {intro.headlineNumber}
                      </div>
                    )}
                    <h2
                      id="intro-title"
                      className={`${TITLE_LIGHT} text-3xl sm:text-4xl mt-4`}
                    >
                      {intro?.heading}
                    </h2>
                    {intro?.subheading && (
                      <p className={`${SUB_LIGHT} text-lg`}>
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

            {/* 🔼 Onda subiendo (invertida también para empalmar) */}
            <WaveToDark />
          </section>
        )}

        {/* --- MEDIA --- */}
        {(media?.title || media?.text) && (
          <section id="media" className="relative z-10">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24 text-center">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
              >
                <motion.h3
                  variants={fadeUp}
                  className={`${TITLE_DARK} text-3xl sm:text-4xl mb-4`}
                >
                  {media?.title}
                </motion.h3>
                {media?.text && (
                  <motion.p
                    variants={fadeUp}
                    className={`${SUB_DARK} text-lg max-w-2xl mx-auto`}
                  >
                    {media.text}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* --- TESTIMONIALS --- */}
        {Array.isArray(testimonials?.items) &&
          testimonials.items.length > 0 && (
            <section
              aria-labelledby="testimonials-title"
              className="relative z-10"
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
                      id="testimonials-title"
                      className={`${TITLE_DARK} text-3xl sm:text-4xl`}
                    >
                      {testimonials?.title}
                    </h3>
                    {testimonials?.subtitle && (
                      <p
                        className={`${SUB_DARK} text-lg max-w-2xl mx-auto mt-3`}
                      >
                        {testimonials.subtitle}
                      </p>
                    )}
                  </motion.div>

                  <div className="grid gap-8 md:grid-cols-2">
                    {testimonials.items.map((it, idx) => (
                      <motion.blockquote
                        key={idx}
                        variants={fadeUp}
                        className={`${CARD_GLASS} p-8 relative`}
                      >
                        <div className="absolute top-6 left-6 text-6xl font-serif text-white/10 leading-none">
                          "
                        </div>
                        {it?.quote && (
                          <p className="text-white/90 leading-relaxed text-base relative z-10 pt-8">
                            {it.quote}
                          </p>
                        )}
                        <footer className="mt-6 pt-6 border-t border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#EE7203] to-[#FF3816] flex items-center justify-center text-white font-bold">
                              {(it?.name || "?").charAt(0)}
                            </div>
                            <div>
                              {it?.name && (
                                <div className="font-semibold text-white">
                                  {it.name}
                                </div>
                              )}
                              {it?.role && (
                                <div className="text-sm text-white/70">
                                  {it.role}
                                </div>
                              )}
                              {it?.company && (
                                <div className="text-sm text-white/50">
                                  {it.company}
                                </div>
                              )}
                            </div>
                          </div>
                        </footer>
                      </motion.blockquote>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          )}

        {/* --- CTA --- */}
        {cta?.button && (
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
                      href={
                        cta?.href || "https://www.linkedin.com/company/further"
                      }
                      target={
                        cta?.href?.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        cta?.href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`${LINK} ${GRAD} text-white shadow-[0_10px_34px_rgba(238,114,3,0.35)] hover:scale-[1.02]`}
                      aria-label={cta?.button}
                    >
                      {cta?.button} <span aria-hidden>↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

/* i18n */
export async function getStaticProps({ locale }) {
  return { props: { messages: await loadMessages(locale) } };
}
