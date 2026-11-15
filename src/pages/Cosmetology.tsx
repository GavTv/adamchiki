import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import BookButton from "@/components/BookButton";
import AnimatedSection from "@/components/AnimatedSection";
import HeroIcon from "@/components/HeroIcon";
import InteractiveServiceCard from "@/components/InteractiveServiceCard";
import { serviceCatalog } from "@/data/serviceCatalog";
import { Sparkles, Eye, Scissors, Heart } from "lucide-react";
import { motion } from "framer-motion";

const eyebrows = serviceCatalog.cosmetology.groups.brows.items;
const facePeelings = serviceCatalog.cosmetology.groups.peels.items;
const waxEpilation = serviceCatalog.cosmetology.groups.waxing.items;
const faceCare = serviceCatalog.cosmetology.groups.faceCare.items;
const smasLifting = serviceCatalog.cosmetology.groups.smas.items;

const Cosmetology = () => {
  return (
    <Layout>
      <SEO
        title="Косметология"
        description="Косметологические услуги в Новобьюти: пилинги, чистка лица, мезотерапия, биоревитализация, уходы Ultraceuticals. Запись к косметологу."
        keywords="косметолог москва, пилинг, чистка лица, мезотерапия, биоревитализация, BioRePeel, уход за лицом, Новослободская"
      />
      <div className="container py-12 md:py-20">
        {/* Hero */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-12">
          <HeroIcon icon={Sparkles} />
          
          <motion.h1 
            className="section-title mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Косметология
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Современные косметологические процедуры для красоты и здоровья вашей кожи. 
            Индивидуальный подход и профессиональный уход.
          </motion.p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatedSection delay={0.1}>
            <InteractiveServiceCard title="Брови" items={eyebrows} icon={Eye} />
          </AnimatedSection>
          
          <AnimatedSection delay={0.15}>
            <InteractiveServiceCard title="Пилинги для лица" items={facePeelings} icon={Sparkles} />
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <InteractiveServiceCard title="Восковая эпиляция" items={waxEpilation} icon={Scissors} />
          </AnimatedSection>
          
          <AnimatedSection delay={0.25}>
            <InteractiveServiceCard title="Уход за лицом" items={faceCare} icon={Heart} />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <InteractiveServiceCard title="SMAS-лифтинг" items={smasLifting} icon={Sparkles} />
          </AnimatedSection>
        </div>

        {/* Info */}
        <AnimatedSection delay={0.4} className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground bg-secondary/30 rounded-xl p-4 border border-border/20 mb-8">
            ⚕️ Перед процедурами необходима консультация косметолога. 
            Все процедуры выполняются сертифицированными специалистами с использованием 
            качественных препаратов.
          </p>
          <BookButton />
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Cosmetology;
