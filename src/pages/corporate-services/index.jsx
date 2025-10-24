// /pages/corporate-services/index.jsx
// Corporate Services — diseño alineado con “Nosotros” (ondas invertidas verticalmente)

import React, { useMemo, useState, useRef } from "react";
import Head from "next/head";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  animate,
  useInView,
  useMotionValue,
} from "framer-motion";
import { loadMessages } from "@/lib/i18n";

/* ==============================
   Design Tokens (dark + light)
   ============================== */
/* Azul unificado:
   - Base deep:   #0C212D
   - Alterno (footer-like): #0A1628
*/
const BG =
  "bg-gradient-to-b from-[#0A1628] via-[#0C212D] to-[#0C212D] text-white";
const BG_ALT = "bg-[#0A1628]/80";
const GRAD = "bg-gradient-to-br from-[#EE7203] via-[#FF5A1F] to-[#FF3816]";
const GRAD_SUBTLE =
  "bg-gradient-to-br from-[#EE7203]/20 via-[#FF5A1F]/10 to-[#FF3816]/20";
const GRAD_TEXT =
  "bg-gradient-to-r from-[#EE7203] via-[#FF5A1F] to-[#FF3816] bg-clip-text text-transparent";
const CARD =
  "relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl shadow-2xl shadow-black/40";
const CARD_HOVER =
  "hover:border-white/25 hover:shadow-[0_20px_70px_rgba(238,114,3,0.15)] transition-all duration-500";
const LINK =
  "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#FF3816]/60 transition-all duration-300";
const TITLE = "text-white font-black tracking-tight";
const SUB = "text-white/70 leading-relaxed";
const TEXT = "text-white/85 leading-relaxed";
const SHELL = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/* Light section tokens */
const LIGHT_WRAP = "bg-gradient-to-br from-white via-gray-50 to-white";

/* ==============================
   Animation Variants
   ============================== */
const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};
const itemFade = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const itemScale = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const floatingAnimation = {
  y: [-10, 10, -10],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

/* ==============================
   Counter
   ============================== */
function Counter({ value = 0, suffix = "+", duration = 1.5 }) {
  const ref = useRef(null);
  const isIn = useInView(ref, { margin: "-20% 0px", once: true });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [out, setOut] = useState("0");

  React.useEffect(() => {
    if (!isIn) return;
    const controls = animate(mv, value, {
      duration: reduce ? 0.4 : duration,
      ease: reduce ? "linear" : [0.22, 1, 0.36, 1],
      onUpdate: (latest) =>
        setOut(`${Math.round(latest).toLocaleString()}${suffix}`),
    });
    return controls.stop;
  }, [isIn, value, suffix, duration, reduce, mv]);

  return (
    <span
      ref={ref}
      className="tabular-nums font-black text-5xl"
      aria-live="polite"
      aria-atomic="true"
    >
      {out}
    </span>
  );
}

/* ==============================
   Floating Orbs + Grid
   ============================== */
function FloatingOrbs() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, #EE7203 0%, transparent 70%)",
        }}
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
        style={{
          background: "radial-gradient(circle, #FF3816 0%, transparent 70%)",
        }}
        animate={{
          y: [10, -10, 10],
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px] opacity-10"
        style={{
          background: "radial-gradient(circle, #FF5A1F 0%, transparent 70%)",
        }}
        animate={{
          y: [-15, 15, -15],
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
}
function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30" aria-hidden>
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/* ==============================
   Wave Dividers (invertidas verticalmente)
   ============================== */
// Hacia sección clara (dark → light)
function WaveToLight() {
  return (
    <div aria-hidden className="relative">
      <svg
        className="block w-full h-20 -scale-y-100 text-white"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <defs>
          <linearGradient
            id="waveGradientLight"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        <path
          d="M0,0V46.29c47.79,22,103.59,29,158,17.39C256,41,312,2,376,1.5S512,39,576,55.5s128,17,192-5,128-71,192-44,128,101,240,114V0Z"
          className="fill-white"
        />
        <path
          d="M0,20V56.29c47.79,22,103.59,29,158,17.39C256,51,312,12,376,11.5S512,49,576,65.5s128,17,192-5,128-71,192-44,128,101,240,114V20Z"
          fill="url(#waveGradientLight)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

// Regreso a sección oscura (light → dark)
function WaveToDark() {
  return (
    <div aria-hidden className="relative">
      <svg
        className="block w-full h-16 -scale-y-100"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200,0V16c-61,13-122,40-183,47S792,47,713,47,550,84,471,99,315,109,236,88,77,25,0,16V0Z"
          className="fill-[#0A1628]"
        />
        <path
          d="M1200,10V26c-61,13-122,40-183,47S792,57,713,57,550,94,471,109,315,119,236,98,77,35,0,26V10Z"
          className="fill-[#0C212D]"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/* ==============================
   Main Page
   ============================== */
export default function CorporateIndex({ messages }) {
  const tCorp = messages?.corporate ?? {};
  const tHome = messages?.home ?? {};
  const tCommon = messages?.common ?? {};

  const metaHome = messages?.meta?.home ?? {};
  const metaTitle =
    tCorp?.meta?.title ??
    metaHome?.title ??
    "Further Corporate: B2B Language Services";
  const metaDesc =
    tCorp?.meta?.description ??
    metaHome?.description ??
    "Corporate language training with CEFR-aligned assessment and measurable outcomes.";

  const hero = {
    badge:
      tCorp?.hero?.badge ??
      tHome?.hero?.badge ??
      "Corporate Language Solutions",
    prefix:
      tCorp?.hero?.title?.prefix ??
      tHome?.hero?.title?.prefix ??
      "Servicios de idiomas",
    highlight: tCorp?.hero?.title?.highlight ?? "B2B",
    description:
      tCorp?.hero?.description ??
      tHome?.hero?.description ??
      "Programas corporativos personalizados, alineados al CEFR, con resultados medibles.",
    ctaPrimary: tCommon?.buttons?.requestProposal ?? "Request Proposal",
    ctaSecondary: tCommon?.cta?.learnMore ?? "Learn More",
  };

  const stats = useMemo(() => {
    const s = tHome?.stats ?? {};
    return [
      {
        label: s?.yearsInBusiness?.label ?? "Years in Business",
        value: Number(s?.yearsInBusiness?.value ?? 25),
      },
      {
        label: s?.corporatePartners?.label ?? "Corporate Partners",
        value: Number(s?.corporatePartners?.value ?? 50),
      },
      {
        label: s?.corporateStudents?.label ?? "Corporate Students",
        value: Number(s?.corporateStudents?.value ?? 3000),
      },
      {
        label: s?.privateStudents?.label ?? "Private Students",
        value: Number(s?.privateStudents?.value ?? 500),
      },
    ];
  }, [tHome?.stats]);

  const serviceCardsRaw =
    tCorp?.services?.cards ?? tHome?.services?.cards ?? [];
  const serviceCards = Array.isArray(serviceCardsRaw) ? serviceCardsRaw : [];
  const defaultServices = [
    {
      title: "Corporate Training",
      description:
        "Customized B2B programs designed for your team's specific needs and industry context.",
    },
    {
      title: "Executive Programs",
      description:
        "One-on-one coaching for C-suite executives with flexible scheduling and personalized content.",
    },
    {
      title: "International Certification",
      description:
        "Comprehensive exam preparation for globally recognized language certifications.",
    },
  ];
  const servicesSource =
    serviceCards.length > 0 ? serviceCards : defaultServices;

  const services = useMemo(
    () =>
      servicesSource.slice(0, 3).map((c, i) => ({
        title: c?.title || "Service",
        body: c?.description ?? "",
        icon:
          i === 0 ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="5"
                width="18"
                height="12"
                rx="2"
                fill="currentColor"
                className="text-white/10"
              />
              <path
                d="M3 16h18M10 19h4"
                stroke="#FF6A1F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="11" r="2" fill="#EE7203" />
            </svg>
          ) : i === 1 ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 20v-8l8-4 8 4v8"
                fill="none"
                stroke="#FF6A1F"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="8" r="2.5" fill="#EE7203" />
              <path
                d="M8 20v-6m8 6v-6"
                stroke="currentColor"
                strokeOpacity=".3"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeOpacity=".4"
                strokeWidth="2"
              />
              <path
                d="M8 16v-4m4 4v-7m4 7V9"
                stroke="#FF6A1F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          ),
      })),
    [servicesSource]
  );

  const languages =
    Array.isArray(tCorp?.languages) && tCorp.languages.length
      ? tCorp.languages
      : [
          "English",
          "Italiano",
          "Deutsch",
          "Português",
          "Français",
          "Español (L2)",
        ];

  const cefr = {
    title: tCorp?.cefr?.title ?? "CEFR Placement",
    whyTitle: tCorp?.cefr?.whyTitle ?? "Why CEFR?",
    p1:
      tCorp?.cefr?.p1 ??
      tHome?.methodology?.bullets?.[0]?.text ??
      "Placement and tracking aligned with CEFR for transparent, international standards.",
    p2:
      tCorp?.cefr?.p2 ??
      "From A1 (beginner) to C2 (mastery), with consistent, measurable evaluation.",
    blogLabel: tCommon?.cta?.learnMore ?? "Learn More",
    blogHref:
      tCorp?.cefr?.blogHref ?? "/blog/evaluando-la-fluidez-que-es-el-cefr",
    bullets:
      Array.isArray(tCorp?.cefr?.bullets) && tCorp.cefr.bullets.length
        ? tCorp.cefr.bullets
        : [
            "Transparent levels",
            "International comparability",
            "Measurable progress",
          ],
  };

  const testimonialsNS =
    tCorp?.testimonials ??
    tHome?.testimonials ??
    messages?.about?.testimonials ??
    {};
  const testimonials = Array.isArray(testimonialsNS?.items)
    ? testimonialsNS.items
    : [];

  const forms = {
    emailPH: tCommon?.forms?.emailPlaceholder ?? "you@company.com",
    invalidEmail:
      tCommon?.forms?.invalidEmail ?? "Please enter a valid email address.",
    thanks:
      tCommon?.forms?.thanks ?? "Thanks! Please check your inbox to confirm.",
    error: tCommon?.forms?.error ?? "Something went wrong. Please try again.",
    sending: tCommon?.forms?.sending ?? "Sending...",
    ctaSend: tCommon?.cta?.send ?? "Send",
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", error: "" });
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim())
      return setStatus({
        state: "error",
        error: "Please enter your full name.",
      });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setStatus({ state: "error", error: forms.invalidEmail });
    if (form.message.trim().length < 10)
      return setStatus({
        state: "error",
        error: "Please provide more details (10+ characters).",
      });

    try {
      setStatus({ state: "sending", error: "" });
      await new Promise((r) => setTimeout(r, 800));
      setStatus({ state: "ok", error: "" });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus({ state: "error", error: forms.error });
    }
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
        <main className={`${BG} min-h-screen relative overflow-hidden`}>
          <FloatingOrbs />
          <GridPattern />

          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className={`relative ${SHELL} pt-20 pb-16 lg:pt-24`}>
              <motion.div
                variants={containerStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="relative z-10"
              >
                <motion.div
                  variants={itemFade}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-4"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#EE7203] to-[#FF3816] animate-pulse" />
                  <span className="text-xs font-medium text-white/90">
                    {hero.badge}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemFade}
                  className={`${TITLE} text-4xl sm:text-5xl lg:text-6xl leading-[1.15] max-w-4xl`}
                >
                  <span className="block text-white/95">{hero.prefix}</span>
                  <span className={`block mt-1 ${GRAD_TEXT}`}>
                    {hero.highlight}
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemFade}
                  className={`${SUB} mt-5 text-base sm:text-lg max-w-2xl`}
                >
                  {hero.description}
                </motion.p>

                <motion.div
                  variants={itemFade}
                  className="mt-7 flex flex-wrap gap-3"
                >
                  <motion.a
                    href="#contacto"
                    className={`${LINK} ${GRAD} text-white font-semibold shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {hero.ctaPrimary}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                  <motion.a
                    href="#servicios"
                    className={`${LINK} border border-white/20 hover:border-white/40 hover:bg-white/5`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {hero.ctaSecondary}
                  </motion.a>
                </motion.div>
              </motion.div>

              <div
                className="absolute top-1/2 right-10 w-64 h-64 bg-gradient-to-br from-[#EE7203]/20 to-transparent rounded-full blur-3xl"
                aria-hidden
              />
            </div>

            {/* Wave hacia el bloque blanco (invertida vertical) */}
            <WaveToLight className="-mb-[1px]" />
          </section>

          {/* BLOQUE BLANCO (Stats + Logos) */}
          <section className={`${LIGHT_WRAP} text-gray-900`}>
            <div className={`${SHELL} py-16 lg:py-20`}>
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                {stats.map((s, idx) => (
                  <motion.div
                    key={`${s.label}-${idx}`}
                    variants={itemScale}
                    className="rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow p-8 group"
                    whileHover={{ y: -6 }}
                  >
                    <dt className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">
                      {s.label}
                    </dt>
                    <dd className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE7203] to-[#FF3816]">
                      <Counter value={s.value} suffix="+" />
                    </dd>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <p className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-6">
                  Trusted by leading organizations
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="rounded-2xl border border-gray-200 bg-white h-16 flex items-center justify-center text-gray-400 text-xs font-medium hover:text-gray-700 hover:shadow-md transition-all"
                      whileHover={{ scale: 1.03, y: -2 }}
                    >
                      Client {i + 1}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Wave de regreso al dark (invertida vertical) */}
            <WaveToDark className="-mb-[1px]" />
          </section>

          {/* SERVICES */}
          <section id="servicios" className="relative py-24">
            <div className={SHELL}>
              <motion.div
                variants={itemFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className={`${TITLE} text-4xl sm:text-5xl lg:text-6xl`}>
                  Professional Language{" "}
                  <span className={GRAD_TEXT}>Solutions</span>
                </h2>
              </motion.div>

              <motion.div
                className="grid gap-8 md:grid-cols-3"
                variants={containerStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {services.map((svc) => (
                  <motion.article
                    key={svc.title}
                    variants={itemScale}
                    className={`${CARD} ${CARD_HOVER} p-8 group overflow-hidden`}
                    whileHover={{ y: -10, rotateX: 0.0001 }}
                  >
                    <div
                      className={`absolute inset-0 ${GRAD_SUBTLE} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />
                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 ring-1 ring-white/10 group-hover:ring-white/30 group-hover:scale-110 transition-all duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {svc.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#EE7203] group-hover:to-[#FF3816] transition-all duration-300">
                        {svc.title}
                      </h3>
                      <p className={`${TEXT} text-base`}>{svc.body}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>

          {/* LANGUAGES + CEFR */}
          <section
            className={`${BG_ALT} backdrop-blur-xl border-y border-white/10 py-24`}
          >
            <div className={SHELL}>
              <div className="grid gap-12 lg:grid-cols-2">
                <motion.div
                  variants={itemFade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <h2 className={`${TITLE} text-3xl sm:text-4xl mb-6`}>
                    Available <span className={GRAD_TEXT}>Languages</span>
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {languages.map((l, i) => (
                      <motion.span
                        key={l}
                        className="px-5 py-2.5 rounded-2xl border border-white/15 bg-white/5 text-white font-medium hover:border-white/30 hover:bg-white/10 transition-all cursor-default"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {l}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className={`${CARD} ${CARD_HOVER} p-8`}
                  variants={itemScale}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{cefr.title}</h3>
                  <p className={`${SUB} mb-3`}>{cefr.p1}</p>
                  <p className={`${SUB} mb-6`}>{cefr.p2}</p>
                  <ul className="space-y-2 mb-6">
                    {cefr.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#EE7203] to-[#FF3816]" />
                        <span className={TEXT}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href={cefr.blogHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#EE7203] to-[#FF3816] hover:gap-3 transition-all"
                    whileHover={{ x: 4 }}
                  >
                    {cefr.blogLabel} <span>↗</span>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          {testimonials.length > 0 && (
            <section className="relative py-24">
              <div className={SHELL}>
                <motion.h2
                  className={`${TITLE} text-4xl sm:text-5xl text-center mb-16`}
                  variants={itemFade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  Client <span className={GRAD_TEXT}>Success Stories</span>
                </motion.h2>

                <motion.div
                  className="grid gap-8 md:grid-cols-2"
                  variants={containerStagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {testimonials.map((t, i) => (
                    <motion.blockquote
                      key={i}
                      variants={itemScale}
                      className={`${CARD} ${CARD_HOVER} p-8 relative group`}
                      whileHover={{ y: -6 }}
                    >
                      <div className="absolute -top-2 left-8 h-1 w-20 bg-gradient-to-r from-[#EE7203] to-[#FF3816] rounded-full" />
                      <p
                        className={`${TEXT} text-lg leading-relaxed italic mb-6`}
                      >
                        "{t?.quote}"
                      </p>
                      <footer className="border-t border-white/10 pt-4">
                        {t?.name && (
                          <div className="font-bold text-white text-lg">
                            {t.name}
                          </div>
                        )}
                        {t?.role && (
                          <div className="text-sm text-white/60 mt-1">
                            {t.role}
                          </div>
                        )}
                      </footer>
                    </motion.blockquote>
                  ))}
                </motion.div>
              </div>
            </section>
          )}

          {/* CONTACT */}
          <section
            id="contacto"
            className={`${BG_ALT} backdrop-blur-xl border-t border-white/10 py-24`}
          >
            <div className={SHELL}>
              <motion.div
                variants={itemFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <h2
                  className={`${TITLE} text-4xl sm:text-5xl text-center mb-4`}
                >
                  Get in <span className={GRAD_TEXT}>Touch</span>
                </h2>
                <p className={`${SUB} text-center mb-12`}>
                  Ready to elevate your team's language skills? Let's discuss
                  your needs.
                </p>

                <motion.form
                  onSubmit={onSubmit}
                  noValidate
                  className={`${CARD} ${CARD_HOVER} p-8 space-y-6`}
                  variants={itemScale}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-white/80"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={onChange}
                        className="w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#FF3816]/60 focus:border-white/30 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-white/80"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        className="w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#FF3816]/60 focus:border-white/30 transition-all"
                        placeholder={forms.emailPH}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-white/80"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange}
                      className="w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#FF3816]/60 focus:border-white/30 transition-all"
                      placeholder="+54 11 5555 5555"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-white/80"
                      >
                        Message *
                      </label>
                      <span
                        className="text-xs text-white/50"
                        aria-live="polite"
                      >
                        {form.message.length} / 500
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      maxLength={500}
                      value={form.message}
                      onChange={onChange}
                      className="w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#FF3816]/60 focus:border-white/30 transition-all resize-none"
                      placeholder="Tell us about your team's language training needs..."
                      required
                    />
                  </div>

                  {status.state === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                      className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                    >
                      {status.error}
                    </motion.p>
                  )}
                  {status.state === "ok" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="status"
                      className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2"
                    >
                      {forms.thanks}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    className={`${LINK} ${GRAD} text-white font-semibold shadow-2xl shadow-orange-500/30 w-full justify-center text-lg`}
                    disabled={status.state === "sending"}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status.state === "sending" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          ◌
                        </motion.span>
                        {forms.sending}
                      </>
                    ) : (
                      <>
                        {forms.ctaSend}
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>
            </div>
          </section>

          {/* FOOTER CTA */}
          <section className="relative py-20">
            <div className={SHELL}>
              <motion.div
                className={`${CARD} ${GRAD} p-12 text-center overflow-hidden relative`}
                variants={itemScale}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 opacity-20" aria-hidden>
                  <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                  <h2 className={`${TITLE} text-3xl sm:text-4xl mb-4`}>
                    Ready to Transform Your Team?
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    Join leading organizations worldwide that trust our
                    corporate language solutions.
                  </p>
                  <motion.a
                    href="#contacto"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#0C212D] font-bold text-lg hover:bg-white/90 transition-all shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Your Journey
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </MotionConfig>
    </>
  );
}

/* ==============================
   i18n (Pages Router)
   ============================== */
export async function getStaticProps({ locale }) {
  let messages = null;
  try {
    messages = await loadMessages(locale);
  } catch (e) {}
  if (!messages && locale !== "es") {
    messages = await loadMessages("es");
  }
  return { props: { messages } };
}
