// /pages/academy/index.jsx
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";
import { loadMessages } from "@/lib/i18n";
import CarouselInfinitePause from "@/componentes/ui/CarrouselInfinitePause";

/* ===== tokens (dark + light) ===== */
/* Azul unificado con School:
   - Base (principal):   #0A1628
   - Secundario/contraste: #0C212D */
const BG_DARK = "bg-[#0A1628] text-white";
const CARD_DARK =
  "rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm shadow-lg shadow-black/20";
const CARD_LIGHT = "rounded-2xl border border-gray-200 bg-white shadow-sm";

const BRAND_GRAD = "bg-gradient-to-tr from-[#EE7203] to-[#FF3816]";
const GRAD_TEXT =
  "bg-gradient-to-tr from-[#EE7203] to-[#FF3816] bg-clip-text text-transparent";

const LINK_DARK =
  "inline-flex items-center gap-2 px-4 py-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#FF3816]/60 hover:bg-white/5 transition";
const LINK_LIGHT =
  "inline-flex items-center gap-2 px-4 py-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#FF3816]/40 hover:bg-gray-50 transition text-gray-700";

const CTA_SOLID =
  "relative inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#FF3816]/60 overflow-hidden";

const WRAP = "mx-auto w-full max-w-7xl px-4 sm:px-6";
const LIGHT_WRAP =
  "bg-gradient-to-br from-white via-gray-50 to-white text-gray-900";

/* ===== util i18n simple ===== */
function useT(messages) {
  return (path, fallback = "") =>
    path
      .split(".")
      .reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), messages) ??
    fallback;
}

/* ===== Featured badges pill ===== */
function Badge({ children, type = "default", tone = "dark" }) {
  const mapDark = {
    default: "text-white/90 bg-white/10",
    offer:
      "text-[#1B1B1B] bg-white/90 ring-1 ring-black/10 font-semibold tracking-wide",
    hot: "text-white bg-[#FF3816]/80",
  };
  const mapLight = {
    default: "text-gray-700 bg-gray-100",
    offer: "text-white bg-[#111827] font-semibold",
    hot: "text-white bg-[#FF3816]/90",
  };
  const map = tone === "light" ? mapLight : mapDark;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${map[type]}`}
    >
      {children}
    </span>
  );
}

/* ===== Ondas invertidas verticalmente ===== */
function WaveToLight({ className = "" }) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      <svg
        className="block w-full h-20 -scale-y-100 translate-y-[1px]"  // 👈 fijate esta línea
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22,103.59,29,158,17.39C256,41,312,2,376,1.5S512,39,576,55.5s128,17,192-5,128-71,192-44,128,101,240,114V0Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}


function WaveToDark({ className = "" }) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      <svg
        className="block w-full h-16 -scale-y-100 translate-y-[1px]"  // 👈 se superpone 1px
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
      >
        <path
          d="M1200,0V16c-61,13-122,40-183,47S792,47,713,47,550,84,471,99,315,109,236,88,77,25,0,16V0Z"
          fill="#0A1628" // 👈 mismo color que el fondo dark siguiente
        />
      </svg>
    </div>
  );
}



/* ====== Page ====== */
export default function AcademyPage({ messages }) {
  const { locale } = useRouter();
  const t = useT(messages);
  const prefersReduced = useReducedMotion();

  /* anims */
  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReduced ? 0 : 0.6, ease: "easeOut" },
  };

  const metaTitle = t("academy.meta.title");
  const metaDesc = t("academy.meta.description");

  return (
    <MotionConfig reducedMotion="user">
      <div className={BG_DARK}>
        <Head>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDesc} />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDesc} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content={locale} />
        </Head>

        {/* ===== HERO (oscuro) ===== */}
        <header className={`${WRAP} pt-16 sm:pt-20 lg:pt-24`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div {...fadeUp}>
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#FF3816]" />
                  {t("academy.hero.badge")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="block">{t("academy.hero.title.prefix")}</span>
                <span className={`${GRAD_TEXT} block`}>
                  {t("academy.hero.title.highlight")}
                </span>
              </h1>

              <p className="mt-4 text-white/60 text-lg">
                {t("academy.hero.description")}
              </p>
              <p className="mt-2 text-white font-semibold">
                {t("academy.hero.sub")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#courses"
                  className={CTA_SOLID}
                  aria-label={t("academy.hero.ctaPrimary")}
                >
                  <span
                    className={`${BRAND_GRAD} absolute inset-0 transition-transform duration-300`}
                  />
                  <span className="relative">
                    {t("academy.hero.ctaPrimary")}
                  </span>
                  <svg
                    className="relative h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7-7 7M21 12H3"
                    />
                  </svg>
                </Link>
                <Link href="/about" className={LINK_DARK}>
                  {t("academy.hero.ctaSecondary")}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="relative"
            >
              <div
                className={`${CARD_DARK} relative aspect-video overflow-hidden`}
              >
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/Q_mfg5gTuEE?list=TLGGVuln3dhLRjAyNzEwMjAyNQ"
                  title="Further Academy — Overview"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute -inset-10 rounded-[28px] blur-2xl opacity-30" />
              </div>
            </motion.div>
          </div>
        </header>

        {/* ---- Onda hacia bloque blanco (invertida) ---- */}
        <WaveToLight className="-mb-[1px]" />

        {/* ===== BLOQUE CLARO (misma info, estilos light) ===== */}
       <section className="bg-white text-gray-900">

       {/* TRUST — carrusel infinito con pausa */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  viewport={{ once: true, amount: 0.3 }}
  className={`${WRAP} text-center overflow-hidden select-none py-16`}
>
  <p className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-10">
    {t("academy.trust.title") || "Trusted by leading organizations"}
  </p>

  <CarouselInfinitePause />
</motion.div>


          

          {/* INTRO / FEATURES */}
          <div className={`${WRAP} py-10 sm:py-16`}>
            <div className={`${CARD_LIGHT} p-6 sm:p-10`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    {t("academy.intro.kicker")}
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {t("academy.intro.title")}{" "}
                    <span className={GRAD_TEXT}>
                      {t("academy.intro.highlight")}
                    </span>
                  </h2>
                  <p className="mt-3 text-gray-700">
                    {t("academy.intro.copy")}
                  </p>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      t("academy.intro.points.selfPaced"),
                      t("academy.intro.points.cert"),
                      t("academy.intro.points.specialized"),
                      t("academy.intro.points.flexible"),
                    ].map((tx) => (
                      <li
                        key={tx}
                        className="flex items-center gap-2 text-gray-900"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF3816]" />
                        <span>{tx}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-gray-200">
                  <Image
                    src="/images/academy/portada.avif"
                    alt={t("academy.intro.imageAlt")}
                    width={1200}
                    height={700}
                    priority={false}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FEATURED COURSE */}
          <div id="courses" className={`${WRAP} py-8 sm:py-14`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {t("academy.featured.section")}
              </h3>
              <Link href="#latest" className={LINK_LIGHT}>
                {t("academy.featured.browseAll")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-6">
              {/* Left */}
              <div className={`${CARD_LIGHT} p-5 sm:p-6`}>
                <div className="flex items-center gap-2 mb-3">
                  <Badge type="offer" tone="light">
                    {t("academy.featured.badgeOffer")}
                  </Badge>
                  <Badge type="hot" tone="light">
                    {t("academy.featured.badgeHot")}
                  </Badge>
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  {t("academy.featured.kicker")}
                </p>
                <h4 className="text-2xl sm:text-3xl font-extrabold mt-1 text-gray-900">
                  {t("academy.featured.title")}
                </h4>
                <p className="mt-3 text-gray-700">
                  {t("academy.featured.desc")}
                </p>

                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t("academy.featured.bullets", []).map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF3816]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href="https://academy.furthercorporate.com/all-courses/0TQTPo4jpzpjU4xo66Gp" className={CTA_SOLID}>
                    <span className={`${BRAND_GRAD} absolute inset-0`} />
                    <span className="relative">
                      {t("academy.featured.startCourse")}
                    </span>
                  </Link>
                  <Link href="https://academy.furthercorporate.com/all-courses/0TQTPo4jpzpjU4xo66Gp" className={LINK_LIGHT}>
                    {t("academy.featured.goCourse")}
                  </Link>
                </div>
              </div>

              {/* Right */}
              <div
                className={`${CARD_LIGHT} p-5 sm:p-6 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge tone="light">
                      {t("academy.featured.tags.aiSkills")}
                    </Badge>
                    <Badge tone="light">
                      {t("academy.featured.tags.peopleCulture")}
                    </Badge>
                    <Badge tone="light">
                      {t("academy.featured.tags.leadership")}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {t("academy.featured.limited")}
                  </p>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-gray-900">
                      {t("academy.featured.price.sale")}
                    </span>
                    <span className="text-gray-400 line-through">
                      {t("academy.featured.price.original")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Link href="https://academy.furthercorporate.com/all-courses/0TQTPo4jpzpjU4xo66Gp" className={CTA_SOLID}>
                    <span className={`${BRAND_GRAD} absolute inset-0`} />
                    <span className="relative">
                      {t("academy.featured.cta")}
                    </span>
                  </Link>
                  <Link href="https://academy.furthercorporate.com/all-courses/0TQTPo4jpzpjU4xo66Gp" className={LINK_LIGHT}>
                    {t("academy.featured.view")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* LATEST COURSES */}
          <div id="latest" className={`${WRAP} py-10 sm:py-14`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {t("academy.latest.title")}
              </h3>
              <Link href="/academy" className={LINK_LIGHT}>
                {t("academy.latest.browse")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className={`${CARD_LIGHT} p-5 sm:p-6 flex flex-col`}>
                <div className="relative h-40 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src="/images/academy/pitch.avif"
                    alt={t("academy.latest.items.pitch.alt")}
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge type="offer" tone="light">
                    {t("academy.latest.items.pitch.offer")}
                  </Badge>
                  <Badge type="hot" tone="light">
                    {t("academy.latest.items.pitch.popular")}
                  </Badge>
                </div>
                <h4 className="mt-2 text-xl font-bold text-gray-900">
                  {t("academy.latest.items.pitch.title")}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {t("academy.latest.items.pitch.level")}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-4">
                  {t("academy.latest.items.pitch.summary")}
                </p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-gray-900">
                    {t("academy.latest.items.pitch.price.sale")}
                  </span>
                  <span className="text-gray-400 line-through">
                    {t("academy.latest.items.pitch.price.original")}
                  </span>
                  <span className="ml-auto text-gray-500">
                    {t("academy.latest.items.pitch.duration")}
                  </span>
                </div>

                <div className="mt-4 flex gap-3">
                  <Link href="https://academy.furthercorporate.com/all-courses/0TQTPo4jpzpjU4xo66Gp" className={CTA_SOLID}>
                    <span className={`${BRAND_GRAD} absolute inset-0`} />
                    <span className="relative">
                      {t("academy.latest.items.pitch.view")}
                    </span>
                  </Link>
                  <Link href="https://academy.furthercorporate.com/all-courses/0TQTPo4jpzpjU4xo66Gp" className={LINK_LIGHT}>
                    {t("academy.latest.items.pitch.go")}
                  </Link>
                </div>
              </article>

              <div className="md:col-span-2 flex items-center justify-center border border-dashed border-gray-300 rounded-2xl p-8 text-gray-400">
                {t("academy.latest.placeholder")}
              </div>
            </div>
          </div>

         {/* TESTIMONIALS */}
<section
  id="testimonials"
  className="relative py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 overflow-hidden"
>
  <div className={`${WRAP} relative z-10`}>
    {/* Encabezado */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        {t("academy.testimonials.title")}
      </h3>
      <p className="text-gray-500 mt-3">
        {t("academy.testimonials.subtitle")}
      </p>
    </motion.div>

    {/* Carrusel */}
    <motion.div
      className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 sm:px-0"
      whileTap={{ cursor: "grabbing" }}
    >
      {t("academy.testimonials.items", []).map((it, i) => (
        <motion.blockquote
          key={i}
          className="min-w-[90%] sm:min-w-[45%] lg:min-w-[30%] snap-center rounded-3xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-500 p-8 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          {/* Comillas decorativas */}
          <div className="absolute top-6 left-6 text-[#FF3816]/20 text-6xl leading-none font-serif select-none">
            “
          </div>

          {/* Contenido */}
          <p className="relative text-gray-800 text-base leading-relaxed mt-4">
            {it.quote}
          </p>

          {/* Footer */}
          <footer className="mt-6 flex items-center gap-4">
            {it.image && (
              <img
                src={it.image}
                alt={it.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#FF3816]/20"
              />
            )}
            <div>
              <strong className="text-gray-900 font-semibold block">
                {it.name}
              </strong>
              <span className="text-gray-500 text-sm">{it.role}</span>
            </div>
          </footer>
        </motion.blockquote>
      ))}
    </motion.div>
  </div>

  {/* Glow decorativo */}
  <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-[radial-gradient(circle_at_center,rgba(238,114,3,0.15),transparent_70%)] blur-[100px]" />
</section>


          {/* ---- Onda de regreso al oscuro (invertida) ---- */}
          <WaveToDark className="-mb-[1px]"/>
        </section>

        {/* ===== FOOT PAD (oscuro) ===== */}
        <div className="h-8 bg-[#0A1628]" />
      </div>
    </MotionConfig>
  );
}

/* ===== i18n (Pages Router) ===== */
export async function getStaticProps({ locale = "en" }) {
  const messages = await loadMessages(locale);
  return { props: { messages } };
}
