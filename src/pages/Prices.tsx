import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Hand, Scissors, Sparkles, Sun, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceItem } from "@/data/serviceCatalog";
import { serviceCatalog } from "@/data/serviceCatalog";

const pageIcons: Record<string, LucideIcon> = {
  solarium: Sun,
  hairdressing: Scissors,
  cosmetology: Sparkles,
  lpg: Zap,
  manicure: Hand,
};

const PriceSection = ({ title, items, icon: Icon }: { title: string; items: ServiceItem[]; icon: LucideIcon }) => (
  <motion.div
    className="overflow-hidden rounded-2xl bg-card border border-border/30"
    whileHover={{ boxShadow: "0 12px 40px -12px hsl(var(--soft-brown) / 0.2)" }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/30">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
        <Icon className="w-4 h-4" />
      </div>
      <span className="font-heading text-lg text-foreground">{title}</span>
    </div>
    <div>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="flex justify-between items-center gap-4 px-6 py-3 border-b border-border/20 last:border-0 group cursor-default"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.02 }}
          whileHover={{ backgroundColor: "hsl(var(--accent) / 0.3)" }}
        >
          <span className="text-foreground/80 text-sm group-hover:text-foreground transition-colors">
            {item.name}
            {item.duration && <span className="block mt-1 text-xs text-muted-foreground">{item.duration}</span>}
          </span>
          <span className="text-primary font-semibold text-sm whitespace-nowrap">{item.price}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Prices = () => (
  <Layout>
    <SEO
      title="Цены"
      description="Актуальные цены на услуги салона Новобьюти. Позиции онлайн-записи сверены с DIKIDI; раздел солярия сохранён из прайса сайта."
      keywords="цены салон красоты, прайс-лист, стоимость услуг, стрижка цена, косметология цены, москва"
    />
    <div className="container py-12 md:py-20">
      <AnimatedSection className="max-w-2xl mx-auto text-center mb-12">
        <motion.h1 className="section-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          Цены на услуги
        </motion.h1>
        <motion.p className="text-muted-foreground leading-relaxed text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          Цены и названия онлайн-записываемых услуг сверены с DIKIDI. Информация о солярии приведена отдельно.
        </motion.p>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto space-y-12">
        {Object.values(serviceCatalog).map((page, pageIndex) => {
          const groups = Object.values(page.groups).filter((group) => group.items.length > 0);
          if (groups.length === 0) return null;
          const Icon = pageIcons[page.id] ?? Sparkles;
          return (
            <AnimatedSection key={page.id} delay={Math.min(pageIndex * 0.08, 0.32)}>
              <h2 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-3">
                <Icon className="w-6 h-6 text-primary" />
                {page.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {groups.map((group) => <PriceSection key={group.id} title={group.title} items={group.items} icon={Icon} />)}
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection delay={0.5} className="max-w-2xl mx-auto mt-12 text-center">
        <p className="text-sm text-muted-foreground bg-secondary/30 rounded-xl p-4 border border-border/20">
          Для услуг с ценой «от» итоговая стоимость зависит от выбранного варианта и уточняется у мастера.
        </p>
      </AnimatedSection>
    </div>
  </Layout>
);

export default Prices;
