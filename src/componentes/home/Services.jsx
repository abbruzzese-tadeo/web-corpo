// src/componentes/home/Services.jsx
import { motion } from "framer-motion";
import {
  FiUsers,
  FiAward,
  FiBookOpen,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function Services({
  wrapperClass = "py-20 lg:py-28 bg-gray-50",
  containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
}) {
  const t = useTranslations();

  const CARD =
    "rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-8";

  // Íconos asociados por índice a cada card del JSON
  const ICONS = [FiUsers, FiAward, FiBookOpen, FiGlobe];

  // Construimos las 4 tarjetas desde el JSON:
  const services = Array.from({ length: 4 }, (_, i) => {
    const Icon = ICONS[i];
    return {
      Icon,
      title: t(`home.services.cards.${i}.title`),
      description: t(`home.services.cards.${i}.description`),
      features: [
        t(`home.services.cards.${i}.features.0`),
        t(`home.services.cards.${i}.features.1`),
        t(`home.services.cards.${i}.features.2`),
        t(`home.services.cards.${i}.features.3`),
      ],
    };
  });

  return (
    <section id="services" className={wrapperClass}>
      <div className={containerClass}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t("home.services.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("home.services.intro")}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={CARD}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#EE7203] to-[#FF3816] flex items-center justify-center mb-6">
                <service.Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EE7203]" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="text-[#EE7203] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                {t("common.cta.learnMore")} <FiArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
