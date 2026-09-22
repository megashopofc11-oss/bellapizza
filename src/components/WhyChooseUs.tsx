import React from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, Clock, ShieldCheck, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Ingredientes Selecionados',
      description:
        'Molho de tomate San Marzano D.O.P., queijos nobres de pequenos produtores artesanais e azeite extravirgem premium.',
      color: 'text-[#e5be6b]',
      bg: 'bg-[#571424]/40',
    },
    {
      icon: Clock,
      title: 'Massa Artesanal 48h',
      description:
        'Fermentação natural lenta e hidratada que resulta em uma massa leve, extremamente digestiva e com bordas aeradas.',
      color: 'text-amber-300',
      bg: 'bg-[#3b0d19]/40',
    },
    {
      icon: Flame,
      title: 'Forno Napolitano 450°C',
      description:
        'Calor intenso e homogêneo que assa a pizza em apenas 90 segundos, preservando a umidade do recheio e o frescor.',
      color: 'text-orange-400',
      bg: 'bg-red-950/40',
    },
    {
      icon: ShieldCheck,
      title: 'Entrega Térmica Rápida',
      description:
        'Caixa rígida com respiro controlado e lacre de segurança. A sua pizza chega fumegante e crocante como no salão.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40',
    },
  ];

  return (
    <section className="w-full max-w-xl mx-auto px-4 my-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#e5be6b] font-semibold block mb-1">
          Nossa Tradição & Excelência
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-gold-gradient">
          Por que escolher a Bela Pizza?
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#e5be6b] to-transparent mx-auto mt-2" />
      </div>

      {/* Grid of 4 pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-4 rounded-2xl glass-wine-card border border-[#e5be6b]/20 hover:border-[#e5be6b]/40 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-xl ${pillar.bg} ${pillar.color} border border-white/10 flex-shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm font-bold text-[#fdfbf7] leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-light mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Customer Rating Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-4 p-4 rounded-2xl glass-wine border border-[#e5be6b]/30 flex items-center justify-between shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[#e5be6b] text-[#e5be6b]"
              />
            ))}
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm text-white">
                {RESTAURANT_INFO.rating} de 5.0
              </span>
              <span className="text-[11px] text-stone-400">
                ({RESTAURANT_INFO.reviewsCount} avaliações)
              </span>
            </div>
            <p className="text-[11px] text-stone-300">
              Eleita entre as melhores pizzarias artesanais da cidade
            </p>
          </div>
        </div>
        <div className="hidden xs:block text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#e5be6b] px-2 py-0.5 rounded-full bg-[#571424]/60 border border-[#e5be6b]/30">
            Top 1%
          </span>
        </div>
      </motion.div>
    </section>
  );
};
