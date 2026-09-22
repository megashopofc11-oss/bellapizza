import React from 'react';
import { motion } from 'motion/react';
import { Pizza, Wine, Flame, MessageCircle, Volume2 } from 'lucide-react';
import { ActiveSection } from '../types';

interface InteractiveCardsProps {
  onSelectOption: (section: ActiveSection, speechText: string) => void;
  activeSection: ActiveSection;
}

export const InteractiveCards: React.FC<InteractiveCardsProps> = ({
  onSelectOption,
  activeSection,
}) => {
  const cards = [
    {
      id: 'menu' as ActiveSection,
      title: 'VER CARDÁPIO',
      subtitle: 'Pizzas artesanais e exclusivas',
      icon: Pizza,
      speech:
        'Ótima escolha! Separei algumas das pizzas mais pedidas da Bela Pizza para você. Dá uma olhadinha.',
      accent: 'from-[#571424] via-[#3b0d19] to-[#25070f]',
      glowColor: 'rgba(201,151,56,0.3)',
      iconColor: 'text-[#e5be6b]',
      badge: 'Destaques',
    },
    {
      id: 'drinks' as ActiveSection,
      title: 'BEBIDAS',
      subtitle: 'Vinhos nobres, cervejas & sodas',
      icon: Wine,
      speech:
        'Uma boa pizza merece uma bebida bem gelada. Veja algumas opções.',
      accent: 'from-[#3b0d19] via-[#2a0a12] to-[#1c050a]',
      glowColor: 'rgba(168,85,247,0.25)',
      iconColor: 'text-[#f5d48b]',
      badge: 'Harmonização',
    },
    {
      id: 'promo' as ActiveSection,
      title: 'PROMOÇÕES',
      subtitle: 'Combo Bela com preço especial',
      icon: Flame,
      speech:
        'Olha só o que eu encontrei para você. Temos ofertas especiais disponíveis hoje.',
      accent: 'from-[#5a1820] via-[#420f18] to-[#25070f]',
      glowColor: 'rgba(239,68,68,0.3)',
      iconColor: 'text-amber-400',
      badge: 'Imperdível',
    },
    {
      id: 'order' as ActiveSection,
      title: 'FAZER PEDIDO',
      subtitle: 'Atendimento direto via WhatsApp',
      icon: MessageCircle,
      speech:
        'Perfeito! Vou te levar para o nosso atendimento. É só mandar sua mensagem e a equipe da Bela Pizza continua seu pedido.',
      accent: 'from-[#143522] via-[#0d2317] to-[#160408]',
      glowColor: 'rgba(34,197,94,0.3)',
      iconColor: 'text-emerald-400',
      badge: 'Rápido',
    },
  ];

  return (
    <section className="w-full max-w-xl mx-auto px-4 my-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#e5be6b] font-semibold flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-[#e5be6b]" />
          <span>Menu Interativo por Voz</span>
        </h2>
        <span className="text-[11px] text-stone-300">Toque para ouvir a Bela</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isSelected = activeSection === card.id;

          return (
            <motion.button
              key={card.title}
              id={`card-menu-${card.id}`}
              onClick={() => onSelectOption(card.id, card.speech)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative overflow-hidden p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[125px] ${
                isSelected
                  ? 'border-[#e5be6b] shadow-[0_0_24px_rgba(201,151,56,0.35)] ring-1 ring-[#e5be6b]'
                  : 'border-[#e5be6b]/20 hover:border-[#e5be6b]/50 shadow-lg'
              } bg-gradient-to-br ${card.accent}`}
            >
              {/* Subtle top badge */}
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl glass-wine flex items-center justify-center border border-white/10 ${card.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/40 text-stone-300 border border-white/5">
                  {card.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#fdfbf7] tracking-wide leading-tight flex items-center justify-between">
                  <span>{card.title}</span>
                </h3>
                <p className="text-[11px] text-stone-300 leading-snug mt-1 font-light line-clamp-1">
                  {card.subtitle}
                </p>
              </div>

              {/* Audio feedback indicator cue */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#e5be6b]/90 font-medium">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-[#e5be6b]" />
                  <span>Ouvir</span>
                </span>
                <span className="text-stone-300">→</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
