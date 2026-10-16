import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import HeroIcon from "@/components/HeroIcon";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";

import promoFaceCleaning from "@/assets/promo-face-cleaning.png";
import promoLpg from "@/assets/promo-lpg.png";
import promoBrows from "@/assets/promo-brows.png";
import promoStudents from "@/assets/promo-students.png";
import promoMassageStone from "@/assets/promo-massage-stone-clean.jpg";
import promoMassageManual from "@/assets/promo-massage-manual-clean.jpg";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Section = { heading: string; items: string[] };
type Promo = {
  id: number;
  image: string;
  title: string;
  description: string;
  badge: string;
  price?: string;
  intro?: string;
  sections?: Section[];
  note?: string;
};

const promotions: Promo[] = [
  {
    id: 5,
    image: promoMassageStone,
    title: "Авторский ручной массаж + стоун-терапия",
    price: "3500 ₽",
    description: "Глубокое расслабление, восстановление и гармония тела. Снижает уровень стресса, расслабляет мышцы, улучшает кровообращение.",
    badge: "Массаж",
    intro:
      "Это сочетание двух техник в одном сеансе: бережный ручной массаж, который мастер подбирает под ваше состояние, и стоун-терапия — работа гладкими нагретыми камнями. Тепло камней мягко проникает в мышцы, помогает им расслабиться глубже, а руки мастера снимают напряжение там, где оно накопилось сильнее всего.",
    sections: [
      {
        heading: "Как проходит процедура",
        items: [
          "Короткая беседа: мастер уточняет ваше самочувствие и зоны, которые беспокоят",
          "Разогрев мышц мягкими ручными техниками",
          "Работа нагретыми камнями вдоль спины и по напряжённым зонам",
          "Завершающий расслабляющий массаж и спокойный отдых после сеанса",
        ],
      },
      {
        heading: "Что вы почувствуете",
        items: [
          "Снижение уровня стресса и внутреннего напряжения",
          "Расслабление зажатых мышц спины, шеи и плеч",
          "Улучшение кровообращения и ощущение тепла во всём теле",
          "Лёгкость, спокойствие и более глубокий сон",
        ],
      },
      {
        heading: "Кому особенно подойдёт",
        items: [
          "Тем, кто много работает за компьютером или сидя",
          "При хронической усталости и постоянном стрессе",
          "Тем, кто хочет подарить себе время полного отдыха",
        ],
      },
    ],
    note: "Перед записью сообщите администратору о беременности, хронических заболеваниях или противопоказаниях к тепловым процедурам.",
  },
  {
    id: 6,
    image: promoMassageManual,
    title: "Ручной массаж",
    price: "2500 ₽",
    description: "Специальная цена до конца месяца! Успейте записаться на ручной массаж по выгодной цене.",
    badge: "Спец цена",
    intro:
      "Классический ручной массаж — проверенный способ вернуть телу лёгкость. Мастер работает только руками, чувствует каждую мышцу и регулирует интенсивность под вас: от мягкого расслабляющего до более глубокого проработочного.",
    sections: [
      {
        heading: "Что даёт массаж",
        items: [
          "Снимает мышечное напряжение и скованность",
          "Улучшает кровообращение и обмен веществ",
          "Помогает восстановиться после нагрузок и долгого рабочего дня",
          "Улучшает настроение и качество сна",
        ],
      },
      {
        heading: "Почему стоит прийти сейчас",
        items: [
          "Специальная цена 2500 ₽ действует только до конца месяца",
          "Отличная возможность попробовать массаж у нас впервые",
          "Можно записаться для себя или подарить близкому человеку",
        ],
      },
    ],
    note: "Количество мест по акционной цене ограничено — уточняйте свободное время у администратора.",
  },
  {
    id: 1,
    image: promoFaceCleaning,
    title: "Чистка лица + пилинг в подарок",
    description: "Чистка лица за 3500 ₽ — пилинг стоимостью 2000 ₽ в подарок!",
    badge: "Подарок",
  },
  {
    id: 2,
    image: promoLpg,
    title: "LPG массаж 30 мин",
    description: "Всего 1000 ₽ вместо 1500 ₽! Эффективная коррекция фигуры по специальной цене.",
    badge: "Выгодно",
  },
  {
    id: 3,
    image: promoBrows,
    title: "Ламинирование бровей",
    description: "Всего 2000 ₽ вместо 2500 ₽! Идеальные брови по выгодной цене.",
    badge: "Скидка",
  },
  {
    id: 4,
    image: promoStudents,
    title: "Акция для студентов — скидка 15%",
    description: "Коррекция бровей 500 ₽ • Окрашивание бровей 500 ₽ • Ламинирование бровей 2500 ₽ • Стрижка волос от 1400 ₽",
    badge: "Студентам",
  },
];

const Promotions = () => {
  const [active, setActive] = useState<Promo | null>(null);
  return (
    <Layout>
      <SEO
        title="Акции"
        description="Акции и скидки салона красоты Новобьюти. Специальные предложения на косметологию, LPG массаж, парикмахерские услуги."
        keywords="акции салон красоты, скидки косметология, акции LPG массаж, скидки парикмахерская, москва"
      />
      <div className="container py-12 md:py-20">
        {/* Hero */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-12">
          <HeroIcon icon={Gift} />
          
          <motion.h1 
            className="section-title mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Акции
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Специальные предложения и выгодные акции для наших клиентов.
          </motion.p>
        </AnimatedSection>

        {/* Promo Grid */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {promotions.map((promo, index) => (
            <AnimatedSection key={promo.id} delay={index * 0.1}>
              <motion.button
                type="button"
                onClick={() => setActive(promo)}
                className="group relative w-full text-left overflow-hidden rounded-2xl bg-card border border-border/30 cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <motion.img
                    src={promo.image}
                    alt={promo.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                    {promo.badge}
                  </span>
                  {promo.price && (
                    <span className="absolute bottom-4 right-4 px-4 py-2 text-lg font-heading font-semibold rounded-full bg-background/80 backdrop-blur-sm text-foreground">
                      {promo.price}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {promo.description}
                  </p>
                  <span className="inline-block mt-3 text-sm text-primary">Подробнее →</span>
                </div>
              </motion.button>
            </AnimatedSection>
          ))}
        </div>

        <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
          <DialogContent className="max-w-lg p-0 max-h-[90vh] overflow-y-auto">
            {active && (
              <>
                <img src={active.image} alt={active.title} className="w-full aspect-square object-cover" />
                <div className="p-6 space-y-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                    {active.badge}
                  </span>
                  <DialogTitle className="font-heading text-2xl">{active.title}</DialogTitle>
                  {active.price && <p className="text-xl font-semibold text-primary">{active.price}</p>}
                  <DialogDescription className="text-muted-foreground leading-relaxed">
                    {active.intro ?? active.description}
                  </DialogDescription>
                  {active.sections?.map((s) => (
                    <div key={s.heading} className="pt-2">
                      <h4 className="font-heading text-base text-foreground mb-2">{s.heading}</h4>
                      <ul className="space-y-1.5">
                        {s.items.map((it) => (
                          <li key={it} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                            <span className="text-primary">•</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {active.note && (
                    <p className="text-xs text-muted-foreground bg-secondary/40 rounded-xl p-3 border border-border/20">
                      {active.note}
                    </p>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Note */}
        <AnimatedSection delay={0.5} className="max-w-xl mx-auto mt-12 text-center">
          <p className="text-xs text-muted-foreground bg-secondary/30 rounded-xl p-4 border border-border/20">
            * Акции не суммируются. Подробности уточняйте у администратора.
          </p>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Promotions;
