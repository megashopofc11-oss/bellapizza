import React from 'react';
import { motion } from 'motion/react';
import { Volume2, Sparkles, ChefHat, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  return (
    <motion.div
      id="welcome-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between px-5 py-8 sm:py-12 bg-[#120407] text-[#f6efe2] overflow-y-auto"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(95, 20, 38, 0.65) 0%, transparent 65%),
          radial-gradient(circle at 10% 80%, rgba(55, 12, 23, 0.45) 0%, transparent 50%),
          radial-gradient(circle at 90% 85%, rgba(201, 151, 56, 0.12) 0%, transparent 50%),
          linear-gradient(180deg, #160408 0%, #0d0205 100%)
        `,
      }}
    >
      {/* Ambient glowing dust / lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#c99738]/10 rounded-full blur-3xl animate-ambient" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#571424]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#3b0d19]/50 rounded-full blur-3xl" />
      </div>

      {/* Top Header info */}
      <header className="relative z-10 w-full max-w-md flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-wine text-xs text-[#e5be6b] font-medium tracking-wide">
          <ChefHat className="w-3.5 h-3.5 text-[#e5be6b]" />
          <span>ALTA GASTRONOMIA</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-wine text-xs text-[#f6efe2]">
          <Star className="w-3.5 h-3.5 fill-[#e5be6b] text-[#e5be6b]" />
          <span className="font-semibold text-white">4.9</span>
          <span className="text-stone-400">(480+ avaliações)</span>
        </div>
      </header>

      {/* Hero Visual Presentation */}
      <main className="relative z-10 w-full max-w-md flex flex-col items-center text-center my-auto py-6">
        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#e5be6b] mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiência Sensorial Imersiva</span>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-cinzel text-4xl sm:text-5xl font-extrabold tracking-wider text-gold-gradient mb-2 drop-shadow-md"
        >
          {RESTAURANT_INFO.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-serif-luxury italic text-stone-300 text-base sm:text-lg max-w-xs mb-6 leading-snug"
        >
          “{RESTAURANT_INFO.tagline}”
        </motion.p>

        {/* Realistic Pizza Photography Spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 flex items-center justify-center"
        >
          {/* Circular Glowing Ring */}
          <div className="absolute inset-0 rounded-full border border-[#e5be6b]/25 shadow-[0_0_40px_rgba(201,151,56,0.22)] animate-pulse" />
          <div className="absolute -inset-2 rounded-full border border-dashed border-[#e5be6b]/15 animate-[spin_60s_linear_infinite]" />

          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=85"
            alt="Pizza artesanal da Bela Pizza saindo do forno a lenha"
            className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-2 border-[#e5be6b]/30 transform transition-transform duration-700 hover:scale-105"
            loading="eager"
          />

          {/* Floating badge */}
          <div className="absolute bottom-1 right-2 glass-wine px-3 py-1.5 rounded-full text-xs text-[#e5be6b] border border-[#e5be6b]/30 shadow-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium">Forno a lenha 450°C</span>
          </div>
        </motion.div>

        {/* Enter CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="w-full mt-6 space-y-3"
        >
          <button
            id="btn-entrar-bela-pizza"
            onClick={onEnter}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#9e7223] via-[#c99738] to-[#e5be6b] text-[#160408] font-bold text-base sm:text-lg tracking-wide shadow-[0_12px_32px_rgba(201,151,56,0.38)] hover:shadow-[0_14px_40px_rgba(201,151,56,0.55)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span className="p-1.5 rounded-full bg-[#160408]/15 group-hover:scale-110 transition-transform">
              <Volume2 className="w-5 h-5 text-[#160408]" />
            </span>
            <span className="uppercase font-cinzel font-extrabold tracking-wider">
              ENTRAR NA BELA PIZZA
            </span>
          </button>

          <p className="text-xs text-stone-300 font-light flex items-center justify-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e5be6b]" />
            Uma experiência com áudio espera por você.
          </p>
        </motion.div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full max-w-md text-center text-[11px] text-stone-400/80 pt-2 border-t border-white/5">
        <p>{RESTAURANT_INFO.address}</p>
        <p className="text-[#e5be6b]/75 mt-0.5">{RESTAURANT_INFO.hours}</p>
      </footer>
    </motion.div>
  );
};
