import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

import AnimatedSection from "@/components/AnimatedSection";
import HeroIcon from "@/components/HeroIcon";
import { Sun, Sparkles, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

const mainPrice = [
  { name: "1 минута", price: "50 ₽" },
];

const subscriptions = [
  { name: "50 минут", price: "1500 ₽" },
  { name: "100 минут", price: "2500 ₽" },
];

const accessories = [
  { name: "Крем для загара", price: "200 ₽" },
  { name: "Шапочка", price: "20 ₽" },
  { name: "Очки (наклейки)", price: "20 ₽" },
];

const features = [
  { icon: Sparkles, title: "Современное оборудование", description: "Новейшие солярии с равномерным загаром" },
  { icon: Clock, title: "Быстрый результат", description: "Красивый загар уже после первого сеанса" },
  { icon: Shield, title: "Безопасность", description: "Профессиональный подбор времени и типа" },
];

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Солярий"
        description="Солярий в салоне Novobeauty на Новослободской. Современное оборудование, безопасный загар, доступные цены от 50 ₽/мин. Запись онлайн."
        keywords="солярий москва, солярий Новослободская, загар, солярий цены, студия загара"
      />
      <div className="container py-12 md:py-20">
        {/* Hero Section */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
          <HeroIcon icon={Sun} />
          
          <motion.h1 
            className="section-title mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Солярий
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground leading-relaxed mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Профессиональные солярии для красивого и равномерного загара. 
            Современное оборудование и индивидуальный подход к каждому клиенту.
          </motion.p>
          
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection delay={0.2} className="mb-16">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.3)" }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="font-heading text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Солярий — основная цена */}
        <AnimatedSection delay={0.3} className="max-w-lg mx-auto">
          <h2 className="font-heading text-xl md:text-2xl text-foreground text-center mb-6">
            Солярий
          </h2>
          <motion.div 
            className="overflow-hidden rounded-2xl bg-card border border-border/30"
            whileHover={{ boxShadow: "0 12px 40px -12px hsl(var(--soft-brown) / 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            {mainPrice.map((item, index) => (
              <motion.div
                key={item.name}
                className="flex justify-between items-center px-6 py-5 group cursor-default"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ backgroundColor: "hsl(var(--accent) / 0.3)" }}
              >
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <motion.span className="text-primary font-semibold text-right" whileHover={{ scale: 1.05 }}>
                  {item.price}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Абонементы */}
        <AnimatedSection delay={0.4} className="max-w-lg mx-auto mt-12">
          <h2 className="font-heading text-xl md:text-2xl text-foreground text-center mb-6">
            Абонементы
          </h2>
          <motion.div 
            className="overflow-hidden rounded-2xl bg-card border border-border/30"
            whileHover={{ boxShadow: "0 12px 40px -12px hsl(var(--soft-brown) / 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            {subscriptions.map((sub, index) => (
              <motion.div
                key={sub.name}
                className="flex justify-between items-center px-6 py-5 border-b border-border/20 last:border-0 group cursor-default"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ backgroundColor: "hsl(var(--accent) / 0.3)" }}
              >
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {sub.name}
                </span>
                <motion.span className="text-primary font-semibold text-right" whileHover={{ scale: 1.05 }}>
                  {sub.price}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-sm text-muted-foreground text-center mt-3">
            Срок действия абонемента — 1 месяц
          </p>
        </AnimatedSection>

        {/* Сопутствующие товары */}
        <AnimatedSection delay={0.5} className="max-w-lg mx-auto mt-12">
          <h2 className="font-heading text-xl md:text-2xl text-foreground text-center mb-6">
            Сопутствующие товары
          </h2>
          <motion.div 
            className="overflow-hidden rounded-2xl bg-card border border-border/30"
            whileHover={{ boxShadow: "0 12px 40px -12px hsl(var(--soft-brown) / 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            {accessories.map((item, index) => (
              <motion.div
                key={item.name}
                className="flex justify-between items-center px-6 py-5 border-b border-border/20 last:border-0 group cursor-default"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ backgroundColor: "hsl(var(--accent) / 0.3)" }}
              >
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <motion.span className="text-primary font-semibold text-right" whileHover={{ scale: 1.05 }}>
                  {item.price}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Info */}
        <AnimatedSection delay={0.4} className="max-w-xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground bg-secondary/30 rounded-xl p-4 border border-border/20">
            💡 Перед первым посещением рекомендуем проконсультироваться с нашими специалистами 
            для подбора оптимального времени и типа загара.
          </p>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Index;
