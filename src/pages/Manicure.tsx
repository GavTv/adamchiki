import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import BookButton from "@/components/BookButton";
import AnimatedSection from "@/components/AnimatedSection";
import HeroIcon from "@/components/HeroIcon";
import InteractiveServiceCard from "@/components/InteractiveServiceCard";
import { Sparkles, Hand } from "lucide-react";
import { motion } from "framer-motion";

const manicureServices = [
  { name: "Маникюр без покрытия или с лечебным лаком (снятие не включено)", price: "1 000 ₽" },
  { name: "Маникюр + выравнивание + покрытие гель-лаком (снятие входит)", price: "2 000 ₽" },
  { name: "Маникюр + укрепление цветным камуфлирующим гелем (снятие входит)", price: "2 500 ₽" },
  { name: "Маникюр + укрепление гелем + покрытие гель-лаком (снятие входит)", price: "3 000 ₽" },
];

const pedicureServices = [
  { name: "Смарт-педикюр без покрытия (снятие входит)", price: "2 000 ₽" },
  { name: "Смарт-педикюр с покрытием гель-лаком (снятие входит)", price: "2 900 ₽" },
];

const extensionServices = [
  { name: "Наращивание ногтей цветным гелем + маникюр", price: "3 900 ₽" },
  { name: "Наращивание ногтей + маникюр + покрытие гель-лаком", price: "4 300 ₽" },
  { name: "Коррекция нарощенных ногтей (цветной гель) + маникюр", price: "3 500 ₽" },
  { name: "Коррекция нарощенных ногтей + маникюр + покрытие гель-лаком", price: "3 900 ₽" },
  { name: "Снятие нарощенных ногтей", price: "500 ₽" },
  { name: "Дизайн (слайдер, втирка, кошачий глаз, стразы)", price: "от 50 ₽" },
];

const Manicure = () => {
  return (
    <Layout>
      <SEO
        title="Маникюр и педикюр"
        description="Маникюр и педикюр в Новобьюти: классический маникюр, покрытие гель-лаком, наращивание ногтей, смарт-педикюр. Качественные материалы, опытные мастера."
        keywords="маникюр москва, педикюр, гель-лак, наращивание ногтей, смарт-педикюр, Новослободская"
      />
      <div className="container py-12 md:py-20">
        {/* Hero */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-12">
          <HeroIcon icon={Hand} />

          <motion.h1
            className="section-title mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Маникюр и педикюр
          </motion.h1>

          <motion.p
            className="text-muted-foreground leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Ухоженные руки — ваша визитная карточка.
            Профессиональный уход и качественные материалы.
          </motion.p>
        </AnimatedSection>

        {/* Маникюр */}
        <div className="max-w-2xl mx-auto mb-8">
          <AnimatedSection delay={0.1}>
            <InteractiveServiceCard
              title="Маникюр"
              items={manicureServices}
              icon={Sparkles}
            />
          </AnimatedSection>
        </div>

        {/* Педикюр */}
        <div className="max-w-2xl mx-auto mb-8">
          <AnimatedSection delay={0.2}>
            <InteractiveServiceCard
              title="Педикюр"
              items={pedicureServices}
              icon={Hand}
            />
          </AnimatedSection>
        </div>

        {/* Наращивание и дизайн */}
        <div className="max-w-2xl mx-auto">
          <AnimatedSection delay={0.3}>
            <InteractiveServiceCard
              title="Наращивание и дизайн"
              items={extensionServices}
              icon={Sparkles}
            />
          </AnimatedSection>
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.5} className="text-center mt-12">
          <BookButton />
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Manicure;
