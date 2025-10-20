// src/componentes/home/Testimonials.jsx
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Testimonials({
  wrapperClass = "py-20 lg:py-28 bg-gray-50",
  containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
}) {
  const t = useTranslations();

  // Obtenemos el array de testimonios desde el JSON
  const testimonials = t.raw("home.testimonials.items");

  return (
    <section id="testimonials" className={wrapperClass}>
      <div className={containerClass}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t("home.testimonials.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("home.testimonials.subtitle")}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-8"
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#EE7203]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  “{item.quote}”
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="font-bold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600">{item.role}</div>
                <div className="text-sm text-[#EE7203] font-medium">
                  {item.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
