import React from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROMO_COMBO } from '../data/menuData';

interface PromoSectionProps {
  onSelectCombo: () => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({ onSelectCombo }) => {
  return (
    <section id="secao-promocoes" className="w-full max-w-xl mx-auto px-4 my-6 scroll-mt-20">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-950/70 text-red-400 border border-red-500/30">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-cinzel text-base sm:text-lg font-bold text-gold-gradient tracking-wide">
              Oferta Especial de Hoje
            </h2>
            <p className="text-xs text-stone-300">Seleção exclusiva com valor promocional</p>
          </div>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-900/60 text-red-200 border border-red-500/40 animate-pulse">
          Limitada
        </span>
      </div>

      {/* Featured Luxury Promo Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl glass-wine-card border-2 border-[#e5be6b]/40 shadow-2xl p-5"
      >
        {/* Ambient glow inside card */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#c99738]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-red-900/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#571424] text-[#e5be6b] text-xs font-semibold border border-[#e5be6b]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#e5be6b]" />
            <span>DESTAQUE DA NOITE</span>
          </div>
          <span className="text-xs font-medium text-emerald-400">Economize R$ 16,90</span>
        </div>

        {/* Product Visual & Details */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-5 relative">
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#e5be6b]/30 shadow-lg relative group">
              <img
                src={PROMO_COMBO.image}
                alt="Combo Bela Pizza"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160408]/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[11px] text-white px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
                <span>Pizza Grande</span>
                <span>+ Refri 2L</span>
              </div>
            </div>
          </div>

          <div className="sm:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="font-cinzel text-2xl font-black tracking-wider text-[#fdfbf7]">
                {PROMO_COMBO.name}
              </h3>

              <div className="mt-2 space-y-1.5 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e5be6b] flex-shrink-0" />
                  <span className="font-medium text-stone-200">1 Pizza Grande Artesanal</span>
                </div>
                <div className="text-[11px] text-stone-400 pl-5.5">
                  (Bela Especial, Calabresa, Frango Cremoso ou 4 Queijos)
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e5be6b] flex-shrink-0" />
                  <span className="font-medium text-stone-200">1 Refrigerante 2 Litros Gelado</span>
                </div>
                <div className="text-[11px] text-stone-400 pl-5.5">
                  (Coca-Cola, Guaraná Antarctica ou Fanta)
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-5 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-stone-400 line-through">De R$ 86,80</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-[#e5be6b] font-medium">Por</span>
                  <span className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#fdfbf7]">
                    R$ 69,90
                  </span>
                </div>
              </div>

              <button
                id="btn-quero-esse-combo"
                onClick={onSelectCombo}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#c99738] via-[#e5be6b] to-[#f5d48b] text-[#160408] font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(201,151,56,0.35)] hover:shadow-[0_6px_25px_rgba(201,151,56,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer font-cinzel"
              >
                <span>QUERO ESSE COMBO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
