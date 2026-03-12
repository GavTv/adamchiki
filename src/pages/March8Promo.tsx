import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import HeroIcon from "@/components/HeroIcon";
import { Flower2, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Sparkles,
    title: "Архитектура бровей",
    description: "Идеальная форма для весны",
  },
  {
    icon: Sparkles,
    title: "Чистка лица (ультразвук)",
    description: "Сияющая кожа без покраснений",
  },
  {
    icon: Sparkles,
    title: "Абсолютное счастье для волос",
    description: "Блеск и восстановление Lebel",
  },
  {
    icon: Sparkles,
    title: "Маникюр + педикюр (комплекс)",
    description: "Идеальный образ к теплу",
  },
];

const March8Promo = () => {
  return (
    <Layout>
      <SEO
        title="Акция 8 марта — скидка 500 ₽"
        description="Специальное предложение к 8 марта! Скидка 500 руб на популярные процедуры до 31 марта. Бонус — бесплатный урок вокала!"
        keywords="акция 8 марта, скидка салон красоты, скидка косметология, акция март, москва"
      />
      <div className="container py-12 md:py-20">
        {/* Hero */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-14">
          <div className="flex items-center justify-center gap-4">
            <HeroIcon icon={Flower2} />
            <motion.h1
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Акция 8 марта! 🌸
            </motion.h1>
            <HeroIcon icon={Flower2} />
          </div>

          <motion.p
            className="text-muted-foreground leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Специальное предложение до 31 марта!
          </motion.p>

          <motion.div
            className="mt-4 inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-heading text-lg border border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Скидка 500 ₽ на каждую процедуру
          </motion.div>
        </AnimatedSection>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/30 p-6"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bonus block */}
        <AnimatedSection delay={0.5} className="max-w-2xl mx-auto">
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading text-2xl text-foreground mb-3">
              🎁 Супер-бонус
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Бесплатный первый урок</strong>{" "}
              вокала в школе музыки{" "}
              <a
                href="https://zvschool.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Звук Вокруг
              </a>
              !
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              Попробуй себя в роли певицы — раскрой талант вместе с красотой!
            </p>

            <div className="inline-block bg-card border border-border/40 rounded-xl px-6 py-4">
              <p className="text-xs text-muted-foreground mb-1">
                Промокод для урока
              </p>
              <p className="font-heading text-2xl text-primary tracking-widest">
                BEAUTYSOUND
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Запишись по ссылке и назови код администратору
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Note */}
        <AnimatedSection delay={0.6} className="max-w-xl mx-auto mt-10 text-center">
          <p className="text-xs text-muted-foreground bg-secondary/30 rounded-xl p-4 border border-border/20">
            * Предложение действительно до 31 марта 2026 г. Акции не суммируются.
          </p>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default March8Promo;
