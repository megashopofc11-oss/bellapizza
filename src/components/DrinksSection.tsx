import React from 'react';
import { motion } from 'motion/react';
import { Wine, Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { DRINKS } from '../data/menuData';

interface DrinksSectionProps {
  onSelectItem: (item: MenuItem) => void;
  selectedIds: string[];
}

export const DrinksSection: React.FC<DrinksSectionProps> = ({
  onSelectItem,
  selectedIds,
}) => {
  return (
    <section id="secao-bebidas" className="w-full max-w-xl mx-auto px-4 my-6 scroll-mt-20">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#3b0d19] text-[#f5d48b] border border-[#e5be6b]/30">
            <Wine className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient tracking-wide">
              Bebidas & Harmonização
            </h2>
            <p className="text-xs text-stone-300">Vinhos finos, cervejas artesanais e sodas geladas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DRINKS.map((drink, index) => {
          const isAdded = selectedIds.includes(drink.id);

          return (
            <motion.div
              key={drink.id}
              id={`item-bebida-${drink.id}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group overflow-hidden rounded-2xl glass-wine-card border border-[#e5be6b]/20 hover:border-[#e5be6b]/40 transition-all p-3 flex flex-col justify-between"
            >
              <div className="flex gap-3 items-center">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 relative">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {drink.badge && (
                    <span className="absolute top-1 left-1 text-[8px] font-bold uppercase px-1 py-0.2 rounded bg-black/80 text-[#e5be6b]">
                      {drink.badge}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-cinzel text-sm font-bold text-[#fdfbf7] truncate">
                    {drink.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5 leading-snug">
                    {drink.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                <span className="font-cinzel text-sm font-bold text-[#e5be6b]">
                  R$ {drink.price.toFixed(2).replace('.', ',')}
                </span>

                <button
                  id={`btn-adicionar-${drink.id}`}
                  onClick={() => onSelectItem(drink)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                    isAdded
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                      : 'bg-[#2a0a12] hover:bg-[#3b0d19] text-[#f6efe2] border border-[#e5be6b]/25'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Adicionado</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-[#e5be6b]" />
                      <span>Adicionar</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
