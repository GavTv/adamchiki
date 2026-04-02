import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Sun, Scissors, Palette, Droplet, Sparkles, Eye, Heart, Zap, Hand } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ServiceItem {
  name: string;
  price: string;
}

interface PriceSectionProps {
  title: string;
  items: ServiceItem[];
  icon: LucideIcon;
}

const PriceSection = ({ title, items, icon: Icon }: PriceSectionProps) => (
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
          key={item.name}
          className="flex justify-between items-center px-6 py-3 border-b border-border/20 last:border-0 group cursor-default"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.03 }}
          whileHover={{ backgroundColor: "hsl(var(--accent) / 0.3)" }}
        >
          <span className="text-foreground/80 text-sm group-hover:text-foreground transition-colors">
            {item.name}
          </span>
          <motion.span 
            className="text-primary font-semibold text-sm whitespace-nowrap ml-4"
            whileHover={{ scale: 1.05 }}
          >
            {item.price}
          </motion.span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// ========== СОЛЯРИЙ ==========
const solariumAccessories = [
  { name: "Крем для загара", price: "200 ₽" },
  { name: "Шапочка", price: "20 ₽" },
  { name: "Очки (наклейки)", price: "20 ₽" },
];

const solariumSubscriptions = [
  { name: "1 минута", price: "50 ₽" },
  { name: "50 минут", price: "1500 ₽" },
  { name: "100 минут", price: "2500 ₽" },
];

// ========== ПАРИКМАХЕРСКИЕ УСЛУГИ ==========
const haircutServices = [
  { name: "Мужские стрижки", price: "от 950 ₽" },
  { name: "Женские стрижки", price: "от 1400 ₽" },
  { name: "Укладки волос", price: "от 1500 ₽" },
  { name: "Стрижка челки", price: "от 500 ₽" },
  { name: "Прически/Косы", price: "от 2500 ₽" },
];

const coloringServices = [
  { name: "Окрашивание волос", price: "от 2000 ₽" },
  { name: "Тонирование", price: "от 2500 ₽" },
  { name: "Блондирование", price: "от 2500 ₽" },
  { name: "Мелирование", price: "от 3500 ₽" },
  { name: "Сложное окрашивание (ambre, baloyash, airtouch)", price: "от 5500 ₽" },
];

const hairCareServices = [
  { name: "Абсолютное счастье для волос от Lebel (Япония)", price: "от 5000 ₽" },
  { name: "Ботокс волос (HONMA TOKIO)", price: "от 6500 ₽" },
  { name: "Кератиновое выпрямление Nano Brazil", price: "от 6500 ₽" },
  { name: "Ламинирование Constant Delight", price: "от 2500 ₽" },
  { name: "Коллаген для волос Nano Brazil", price: "от 3000 ₽" },
];

// ========== КОСМЕТОЛОГИЯ ==========
const eyebrows = [
  { name: "Коррекция бровей", price: "500 ₽" },
  { name: "Коррекция бровей (воск)", price: "700 ₽" },
  { name: "Окрашивание бровей/ресниц (краской)", price: "500 ₽" },
  { name: "Окрашивание бровей хной", price: "700 ₽" },
  { name: "Ламинирование бровей", price: "2500 ₽" },
];

const facePeelings = [
  { name: "Миндальный", price: "2000 ₽" },
  { name: "Кислотный", price: "2500 ₽" },
  { name: "Джесснер", price: "3000 ₽" },
  { name: "BioRePeel, PRX", price: "4000 ₽" },
];


const waxEpilation = [
  { name: "Усики", price: "200 ₽" },
  { name: "Нос", price: "200 ₽" },
  { name: "Губа", price: "200 ₽" },
  { name: "Подбородок", price: "200 ₽" },
  { name: "Лицо", price: "500 ₽" },
  { name: "Подмышки", price: "600 ₽" },
  { name: "Руки", price: "600 / 1000 ₽" },
  { name: "Живот", price: "400 ₽" },
  { name: "Спина", price: "800 ₽" },
  { name: "Ноги", price: "600 / 1200 ₽" },
  { name: "Зона бикини", price: "1200 ₽" },
  { name: "Глубокое бикини", price: "2000 ₽" },
];

const faceCare = [
  { name: "Узи чистка", price: "от 2500 ₽" },
  { name: "Комбинированная чистка", price: "от 3500 ₽" },
  { name: "Механическая чистка", price: "4000 ₽" },
  { name: "Аква Пилинг", price: "от 3500 ₽" },
  { name: "Карбокситерапия", price: "от 3500 ₽" },
  { name: "Уход лица Angiopharm", price: "3500 ₽" },
  { name: "Уход ULTRACEUTICALS", price: "5500 ₽" },
  { name: "Массаж лица", price: "от 2500 ₽" },
];

// ========== LPG МАССАЖ ==========
const lpgServices = [
  { name: "LPG массаж 45 минут", price: "2000 ₽" },
  { name: "LPG массаж 30 минут", price: "1500 ₽" },
];

const bodyServices = [
  { name: "Кавитация 20 мин (1 зона)", price: "3500 ₽" },
  { name: "RF массаж 15 мин (1 зона)", price: "2500 ₽" },
  { name: "Миостимуляция 30 мин (1 зона)", price: "3000 ₽" },
  { name: "СМАС лифтинг по телу (1 зона)", price: "9000 ₽" },
  { name: "Механическая чистка", price: "4000 ₽" },
];

const packages = [
  { name: "5 LPG + 5 RF на пробл. зоны или 5 кавитаций", price: "10000 ₽" },
  { name: "10 сеансов LPG тело 45 минут", price: "15000 ₽" },
  { name: "10 сеансов LPG тела (30 мин)", price: "10000 ₽" },
  { name: "10 сеансов LPG (30 мин) + 5 Кавитация", price: "15000 ₽" },
];

// ========== МАНИКЮР И ПЕДИКЮР ==========
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

const Prices = () => {
  return (
    <Layout>
      <SEO
        title="Цены"
        description="Цены на все услуги салона Новобьюти: солярий, стрижки, окрашивание, косметология, LPG массаж. Полный прайс-лист."
        keywords="цены салон красоты, прайс-лист, стоимость услуг, солярий цены, стрижка цена, косметология цены, москва"
      />
      <div className="container py-12 md:py-20">
        {/* Hero */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-12">
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Цены на услуги
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Полный прайс-лист на все услуги салона красоты НОВОБЬЮТИ
          </motion.p>
        </AnimatedSection>

        {/* Солярий */}
        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-3">
            <Sun className="w-6 h-6 text-primary" />
            Солярий
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <PriceSection title="Абонементы" items={solariumSubscriptions} icon={Sun} />
            <PriceSection title="Сопутствующие товары" items={solariumAccessories} icon={Sun} />
          </div>
        </AnimatedSection>

        {/* Парикмахерские услуги */}
        <AnimatedSection delay={0.2} className="max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-3">
            <Scissors className="w-6 h-6 text-primary" />
            Парикмахерские услуги
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <PriceSection title="Стрижки и укладки" items={haircutServices} icon={Scissors} />
            <PriceSection title="Окрашивание волос" items={coloringServices} icon={Palette} />
          </div>
          <PriceSection title="Уход за волосами" items={hairCareServices} icon={Droplet} />
        </AnimatedSection>

        {/* Косметология */}
        <AnimatedSection delay={0.3} className="max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            Косметология
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <PriceSection title="Брови" items={eyebrows} icon={Eye} />
            <PriceSection title="Пилинги для лица" items={facePeelings} icon={Sparkles} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <PriceSection title="Восковая эпиляция" items={waxEpilation} icon={Scissors} />
            <PriceSection title="Уход за лицом" items={faceCare} icon={Heart} />
          </div>
        </AnimatedSection>

        {/* LPG Массаж */}
        <AnimatedSection delay={0.4} className="max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            LPG массаж и аппаратные процедуры
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <PriceSection title="LPG массаж" items={lpgServices} icon={Zap} />
            <PriceSection title="Аппаратные процедуры" items={bodyServices} icon={Zap} />
          </div>
          <PriceSection title="Абонементы и комплексы" items={packages} icon={Zap} />
        </AnimatedSection>

        {/* Маникюр и педикюр */}
        <AnimatedSection delay={0.45} className="max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-2xl text-foreground mb-6 flex items-center gap-3">
            <Hand className="w-6 h-6 text-primary" />
            Маникюр и педикюр
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <PriceSection title="Маникюр" items={manicureServices} icon={Sparkles} />
            <PriceSection title="Педикюр" items={pedicureServices} icon={Hand} />
          </div>
          <PriceSection title="Наращивание и дизайн" items={extensionServices} icon={Sparkles} />
        </AnimatedSection>

        {/* Info */}
        <AnimatedSection delay={0.5} className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground bg-secondary/30 rounded-xl p-4 border border-border/20">
            💡 Цены могут варьироваться в зависимости от сложности работы и используемых материалов. 
            Для точной стоимости рекомендуем записаться на консультацию.
          </p>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Prices;
