// /pages/further-school/index.jsx
// Further School of Languages (B2C) — i18n es/en/pt con fallbacks.
// Estilo alineado a /pages/nosotros: hero dark (glass), ondas invertidas, sección central blanca, animaciones livianas.

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  FiSmile,
  FiMapPin,
  FiMusic,
  FiAward,
  FiGlobe,
  FiInstagram,
} from "react-icons/fi";
import { loadMessages } from "@/lib/i18n";


/* ===== Azul unificado (más oscuro) ===== */
const HEADER_BLUE_HEX = "#0A1628";
const BG_DARK = "bg-[#0A1628]"; // fondo dark principal
const BG_ALT = "bg-[#0A1628]"; // banda dark alternativa (mismo tono)
const TEXT_DARK = "text-white";
const TEXT_LIGHT = "text-gray-900";

/* Gradiente de acento (naranja→rojo) */
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
const BODY_DARK = "text-white/90";
const TITLE_LIGHT = "text-gray-900 font-bold tracking-tight";
const SUB_LIGHT = "text-gray-600";
const BODY_LIGHT = "text-gray-800";

/* Contenedor */
const SHELL = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/* Botones */
const LINK_BASE =
  "inline-flex items-center gap-2 rounded-xl font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#FF3816]/60 transition-all duration-300";
const BTN_PRIMARY = `${LINK_BASE} px-6 py-3 text-gray-900 bg-white hover:bg-gray-100 active:scale-[.99] shadow-sm`;
const BTN_GHOST = `${LINK_BASE} px-6 py-3 text-white/90 border border-white/20 hover:bg-white/10 active:scale-[.99]`;

/* ===== Ondas (invertidas) ===== */
function WaveDivider({
  from = "dark", // "dark" | "light"
  flip = false, // true → mira hacia abajo
  height = 72,
  className = "",
}) {
  // cuando subimos desde "light" rellenamos con el MISMO azul oscuro
  const fill = from === "dark" ? "#FFFFFF" : HEADER_BLUE_HEX;
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

/* ===== Animaciones accesibles (ligeras) ===== */
function useAnims() {
  const reduce = useReducedMotion();
  return {
    fadeUp: {
      hidden: { opacity: 0, y: reduce ? 0 : 22 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
    fadeIn: {
      hidden: { opacity: 0, scale: reduce ? 1 : 0.98 },
      show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    },
    leftIn: {
      hidden: { opacity: 0, x: reduce ? 0 : -18 },
      show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    },
    rightIn: {
      hidden: { opacity: 0, x: reduce ? 0 : 18 },
      show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    },
    stagger: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
  };
}

/* ===== Página ===== */
export default function FurtherSchoolPage({ messages }) {
  const t = messages?.school ?? {};
  const { fadeUp, fadeIn, leftIn, rightIn, stagger } = useAnims();

  /* SEO */
  const metaTitle =
    t?.meta?.title ||
    "Further School of Languages — Aprendiendo inglés desde 1997";
  const metaDesc =
    t?.meta?.description ||
    "Clases presenciales y online para todas las edades. Preparación para exámenes Cambridge y TOEFL.";

  /* i18n fallbacks */
  const hero = {
    title: t?.hero?.title || "Further School of Languages:",
    subtitle: t?.hero?.subtitle || "Aprendiendo inglés desde 1997",
    badge:
      t?.hero?.badge ||
      t?.meta?.title?.split(" — ")[1] ||
      "Learning English Since 1997",
    imageSrc:
      t?.hero?.imageSrc ||
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1480&auto=format&fit=crop",
    imageAlt: t?.hero?.imageAlt || "English class with motivated students",
  };

  const sec = {
    funTitle: t?.sections?.fun?.title || "Aprender inglés de manera divertida",
    funBody:
      t?.sections?.fun?.body || "Nuestras clases son todo menos aburridas...",
    parkTitle:
      t?.sections?.park?.title || "Escuela de inglés en Parque Patricios",
    parkBody:
      t?.sections?.park?.body ||
      "Further School of Languages brinda clases de inglés presenciales y online...",
    cultureBody:
      t?.sections?.culture?.body ||
      "Entendemos el idioma como un componente dentro de la cultura...",
  };

  const exams = {
    title: t?.exams?.title || "Preparación para exámenes internacionales",
    expertIntro: t?.exams?.expertIntro || "Somos expertos en preparación para",
    cambridgeTitle:
      t?.exams?.cambridgeTitle || "Exámenes de inglés de Cambridge",
    cambridge: t?.exams?.cambridge || [
      "FCE",
      "CAE",
      "CPE",
      "IELTS",
      "BEC",
      "BULATS",
    ],
    usTitle: t?.exams?.usTitle || "Exámenes de inglés Estadounidense",
    toefl: t?.exams?.toefl || "TOEFL: Test of English as a Foreign Language",
  };

  const ig = {
    handle: t?.instagram?.handle || "@furtherlanguages",
    title: t?.instagram?.title || "Further School",
    followLabel: t?.instagram?.followLabel || "Seguir",
    loadMore: t?.instagram?.loadMore || "Cargar más",
    credit: t?.instagram?.widgetCredit || "Free Instagram Feed widget",
    body:
      t?.instagram?.ctaBody ||
      "Enfocamos la frescura en nuestras clases, incorporando el juego, la espontaneidad, y la naturalidad como herramientas fundamentales.",
    cta: t?.instagram?.cta || "Visitanos en Instagram",
    href: t?.instagram?.href || "https://www.instagram.com/furtherlanguages/",
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
      </Head>

      <MotionConfig reducedMotion="user">
        {/* ===== MAIN ===== */}
        <main
          className={`${BG_DARK} ${TEXT_DARK} min-h-screen overflow-x-clip`}
        >
          {/* === HERO === */}

{/* === HERO === */}
<section
  className="relative z-10 overflow-hidden min-h-[90vh] flex items-center justify-center"
  aria-labelledby="school-hero-title"
>
  {/* Fondo de video con parallax */}
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
        scale: useTransform(
          useScroll().scrollYProgress,
          [0, 1],
          [1, 1.15]
        ),
        y: useTransform(
          useScroll().scrollYProgress,
          [0, 1],
          [0, -100]
        ),
      }}
    >
      <source src="/videos/school-bg.webm" type="video/webm" />
      <source src="/videos/school-bg.mp4" type="video/mp4" />
    </motion.video>

    {/* Capa de overlay para contraste */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/80 to-[#0A1628]/95" />
  </motion.div>

  {/* Orbes naranjas sutiles */}
  <div
    className="pointer-events-none absolute inset-0 -z-[5]"
    aria-hidden
  >
    <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-[#EE7203]/25 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FF3816]/20 blur-3xl" />
  </div>

  {/* Contenido centrado */}
  <div className={`${SHELL} relative text-center`}>
    <motion.div
  initial="hidden"
  animate="show"
  variants={stagger}
  key="school-hero" // 👈 esto fuerza a framer a reiniciar la animación

    >
      {/* {hero.badge && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/85 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#EE7203] to-[#FF3816]" />
          {hero.badge}
        </motion.span>
      )} */}

      <motion.h1
        variants={fadeUp}
        id="school-hero-title"
        className={`${TITLE_DARK} text-4xl sm:text-5xl lg:text-6xl leading-[1.1]`}
      >
        <span className="block mb-2">{hero.title}</span>
        <span className={`${GRAD_TEXT}`}>{hero.subtitle}</span>
      </motion.h1>

      {sec.funBody && (
        <motion.p
          variants={fadeUp}
          className={`${SUB_DARK} text-lg max-w-xl mx-auto`}
        >
          {sec.funBody}
        </motion.p>
      )}

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap justify-center gap-3 pt-2"
      >
        <a href="#exams" className={BTN_PRIMARY}>
          {messages?.common?.buttons?.requestConsultation ||
            "Solicitar consulta"}
        </a>
        <a href="#instagram" className={BTN_GHOST}>
          {messages?.common?.buttons?.watchOverview || "Ver presentación"}
        </a>
      </motion.div>
    </motion.div>
  </div>

  {/* Onda decorativa hacia secciones blancas */}
</section>
  <WaveDivider from="dark" height={78} flip />

          {/* === FEATURES (blanco) === */}
          <section
            className="bg-white text-gray-900"
            aria-labelledby="features-title"
          >
            <div className={`${SHELL} py-14`}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={stagger}
              >
                <h2
                  id="features-title"
                  className={`${TITLE_LIGHT} text-3xl sm:text-4xl mb-8`}
                >
                  Why Further?
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div variants={fadeIn} className={`${CARD_LIGHT} p-6`}>
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                      <FiSmile className="h-6 w-6 text-gray-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {sec.funTitle}
                    </h3>
                    <p className={`${SUB_LIGHT}`}>{sec.funBody}</p>
                  </motion.div>

                  <motion.div variants={fadeIn} className={`${CARD_LIGHT} p-6`}>
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                      <FiMapPin className="h-6 w-6 text-gray-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {sec.parkTitle}
                    </h3>
                    <p className={`${SUB_LIGHT}`}>{sec.parkBody}</p>
                  </motion.div>

                  <motion.div variants={fadeIn} className={`${CARD_LIGHT} p-6`}>
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                      <FiMusic className="h-6 w-6 text-gray-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {messages?.home?.methodology?.title ||
                        "Metodología con cultura"}
                    </h3>
                    <p className={`${SUB_LIGHT}`}>{sec.cultureBody}</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Onda de vuelta al azul (mismo tono) */}
            <WaveDivider from="light" height={66} flip />
          </section>

          {/* === LOGO CLOUD (dark, mismo azul) === */}
          <section className={`${BG_ALT} ${TEXT_DARK}`} aria-label="Logo cloud">
            <div className={`${SHELL} py-12`}>
              <div className="text-center mb-6">
                <p className="text-white/70">
                  {messages?.home?.testimonials?.subtitle ||
                    "Organizaciones confían en nosotros"}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 opacity-90">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-md bg-white/10 border border-white/10"
                    aria-hidden
                  />
                ))}
              </div>
            </div>
          </section>

          {/* === EXÁMENES (dark, mismo azul) === */}
          <section id="exams" aria-labelledby="exams-title">
            <div className={`${SHELL} py-16`}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-8"
              >
                <motion.h2
                  variants={fadeUp}
                  id="exams-title"
                  className={`${TITLE_DARK} text-3xl`}
                >
                  {exams.title}
                </motion.h2>

                <motion.p variants={fadeUp} className={`${SUB_DARK}`}>
                  {exams.expertIntro}
                </motion.p>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={fadeIn} className={`${CARD_DARK} p-6`}>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <FiAward aria-hidden="true" /> {exams.cambridgeTitle}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {exams.cambridge.map((x) => (
                        <span
                          key={x}
                          className="px-3 py-1 rounded-xl border border-white/10 bg-white/5 text-white/90 text-sm"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn} className={`${CARD_DARK} p-6`}>
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <FiGlobe aria-hidden="true" /> {exams.usTitle}
                    </h3>
                    <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 inline-block text-white/90">
                      {exams.toefl}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* === TESTIMONIAL (dark, mismo azul) === */}
          <section className={`${BG_ALT}`} aria-label="Testimonial destacado">
            <div className={`${SHELL} py-16`}>
              <div className={`${CARD_DARK} p-8`}>
                <blockquote className="text-xl text-white/90 leading-relaxed">
                  “
                  {messages?.home?.testimonials?.items?.[0]?.quote ||
                    "El programa transformó la confianza de nuestros alumnos para comunicar en inglés en tiempo récord."}
                  ”
                </blockquote>
                <div className="mt-4 text-white/70 text-sm">
                  {messages?.home?.testimonials?.items?.[0]?.name || "María"} ·{" "}
                  {messages?.home?.testimonials?.items?.[0]?.role ||
                    "Directora de RR. HH."}
                </div>
              </div>
            </div>
          </section>

          {/* === INSTAGRAM (blanco + CTA) === */}
          <section
            id="instagram"
            className="bg-white text-gray-900"
            aria-labelledby="instagram-title"
          >
            <div className={`${SHELL} py-16`}>
              <div className={`${CARD_LIGHT} p-6`}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
                      }}
                      aria-hidden
                    >
                      <FiInstagram className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {ig.title}
                      </div>
                      <div className="text-gray-600 text-sm">{ig.handle}</div>
                    </div>
                  </div>
                  <a
                    href={ig.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                  >
                    {ig.followLabel}
                  </a>
                </div>

                {/* placeholder feed */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-gray-100 animate-pulse"
                      aria-hidden
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                    {ig.loadMore}
                  </button>
                </div>

                <p className="mt-6 text-center text-gray-500 text-sm">
                  {ig.credit}
                </p>
              </div>

              <p
                id="instagram-title"
                className="mt-10 text-center text-gray-700 max-w-3xl mx-auto"
              >
                {ig.body}
              </p>

              <div className="mt-6 text-center">
                <a
                  href={ig.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition"
                >
                  <span aria-hidden>📸</span> {ig.cta}
                </a>
              </div>
            </div>

            {/* Onda subiendo a CTA (mismo azul) */}
            <WaveDivider from="light" height={66} flip />
          </section>

          {/* === CTA BAR (mismo azul) === */}
          <section
            id="contact"
            className={`${BG_ALT} ${TEXT_DARK}`}
            aria-labelledby="cta-title"
          >
            <div className={`${SHELL} py-14`}>
              <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 border border-white/10">
                <div className="absolute inset-0 -z-10 opacity-30">
                  <div className={`w-full h-full ${GRAD}`} />
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2
                      id="cta-title"
                      className="text-2xl sm:text-3xl font-bold"
                    >
                      {messages?.home?.cta?.title ||
                        "¿Listo para potenciar las habilidades lingüísticas?"}
                    </h2>
                    <p className="text-white/80 mt-2">
                      {messages?.home?.cta?.subtitle ||
                        "Contactanos para diseñar un plan a medida."}
                    </p>
                  </div>

                  <form
                    className="grid gap-3"
                    onSubmit={(e) => e.preventDefault()}
                    aria-label="Quick contact form"
                  >
                    <label className="sr-only" htmlFor="email-school">
                      {messages?.footer?.a11y?.emailLabel || "Email"}
                    </label>
                    <input
                      id="email-school"
                      type="email"
                      required
                      placeholder={
                        messages?.common?.forms?.emailPlaceholder ||
                        "tu@empresa.com"
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/50 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    />
                    <div className="flex gap-3">
                      <button type="submit" className={BTN_PRIMARY}>
                        {messages?.common?.cta?.send || "Enviar"}
                      </button>
                      <a href="/contacto" className={BTN_GHOST}>
                        {messages?.common?.buttons?.scheduleCall ||
                          "Programar llamada"}
                      </a>
                    </div>
                    <p className="text-white/60 text-xs">
                      {messages?.footer?.a11y?.newsletterDesc ||
                        "Ingresa tu correo para que te contactemos."}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </MotionConfig>
    </>
  );
}

/* ===== i18n loader (Pages Router) ===== */
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
}
