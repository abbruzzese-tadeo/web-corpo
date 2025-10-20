"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations(); // ✅ Traducciones
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 🎥 Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/hero-poster.webp"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradiente Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />

      {/* 🔮 Luces dinámicas */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[10%] w-[25rem] h-[25rem] bg-[radial-gradient(circle_at_center,rgba(255,100,50,0.5),transparent_70%)] blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-[radial-gradient(circle_at_center,rgba(238,114,3,0.4),transparent_70%)] blur-[120px]"
      />

      {/* 🧠 Contenido principal */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 md:px-10 max-w-4xl">
        {/* Badge superior */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md border border-white/20 text-sm font-medium mb-6"
        >
          <span className="text-white/90">{t("home.hero.badge")}</span>
        </motion.div> */}

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
        >
          {t("home.hero.title.prefix")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE7203] via-[#FF3816] to-[#EE7203] animate-gradient">
            {t("home.hero.title.highlight")}
          </span>
        </motion.h1>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          {t("home.hero.description")}
        </motion.p>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#EE7203] to-[#FF3816] hover:shadow-[0_0_40px_rgba(238,114,3,0.5)] transition-all overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              <FiArrowRight className="text-lg" /> {t("common.buttons.requestConsultation")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3816] to-[#EE7203] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white border-2 border-white/20 hover:border-[#EE7203]/50 hover:bg-white/5 backdrop-blur-sm transition-all">
            <FiPlay className="text-lg group-hover:scale-110 transition-transform" />
            {t("common.buttons.watchOverview")}
          </button>
        </motion.div>
      </motion.div>

      <ParallaxGlow />
    </section>
  );
}

/* 🔁 Parallax reactivo */
function ParallaxGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [viewport, setViewport] = useState({ width: 1, height: 1 });

  const rotateX = useTransform(mouseY, [0, viewport.height], [15, -15]);
  const rotateY = useTransform(mouseX, [0, viewport.width], [-15, 15]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("resize", update);
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div style={{ rotateX, rotateY }} className="absolute inset-0 z-0 pointer-events-none">
      <motion.div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_80%)] blur-3xl -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
}

/* ✨ Gradiente animado */
const styles = `
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient {
  background-size: 200% auto;
  animation: gradient 4s ease infinite;
}
`;
