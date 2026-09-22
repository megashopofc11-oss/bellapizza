import React from 'react';
import { motion } from 'motion/react';
import { Pizza, Plus, Sparkles, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { PIZZAS } from '../data/menuData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  selectedIds: string[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  selectedIds,
}) => {
  return (
    <section id="secao-cardapio" className="w-full max-w-xl mx-auto px-4 my-6 scroll-mt-20">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#571424] text-[#e5be6b] border border-[#e5be6b]/30">
            <Pizza className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient tracking-wide">
              Pizzas Artesanais
            </h2>
            <p className="text-xs text-stone-300">
              Fermentação natural 48h e forno a lenha napolitano
            </p>
          </div>
        </div>
        <span className="text-xs text-[#e5be6b] font-medium hidden sm:inline">
          Tamanho Grande (8 fatias)
        </span>
      </div>

      <div className="space-y-4">
        {PIZZAS.map((pizza, index) => {
          const isAdded = selectedIds.includes(pizza.id);

          return (
            <motion.div
              key={pizza.id}
              id={`item-pizza-${pizza.id}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group overflow-hidden rounded-2xl glass-wine-card border border-[#e5be6b]/20 hover:border-[#e5be6b]/40 transition-all duration-300 shadow-xl p-3.5 sm:p-4"
            >
              <div className="flex gap-3.5 sm:gap-4 items-start">
                {/* Realistic Pizza Photography */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-md">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  {pizza.badge && (
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#160408]/90 text-[#e5be6b] border border-[#e5be6b]/30">
                      {pizza.badge}
                    </span>
                  )}
                </div>

                {/* Info & Ingredients */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#fdfbf7] tracking-wide leading-tight">
                        {pizza.name}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-300 font-light mt-1 line-clamp-2 leading-relaxed">
                      {pizza.description}
                    </p>

                    {pizza.ingredients && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pizza.ingredients.slice(0, 3).map((ing) => (
                          <span
                            key={ing}
                            className="text-[10px] text-stone-300 px-1.5 py-0.5 rounded bg-white/5 border border-white/5"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price and Add button */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <span className="font-cinzel text-base sm:text-lg font-bold text-[#e5be6b]">
                      R$ {pizza.price.toFixed(2).replace('.', ',')}
                    </span>

                    <button
                      id={`btn-adicionar-${pizza.id}`}
                      onClick={() => onSelectItem(pizza)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                        isAdded
                          ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                          : 'bg-[#3b0d19] hover:bg-[#571424] text-[#f6efe2] border border-[#e5be6b]/30 hover:border-[#e5be6b]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Adicionado</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#e5be6b]" />
                          <span>Pedir Pizza</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
