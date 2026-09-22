import React from 'react';
import { MessageCircle, Instagram, ShoppingBag, MapPin, Clock, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  onScrollToOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToOrder }) => {
  return (
    <footer className="w-full max-w-xl mx-auto px-4 pt-8 pb-24 border-t border-[#e5be6b]/20 mt-12 text-center relative z-10">
      {/* Decorative seal */}
      <div className="w-12 h-12 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#c99738] to-[#571424] p-[1px] shadow-lg flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-[#160408] flex items-center justify-center">
          <span className="font-cinzel font-bold text-sm text-[#e5be6b]">BP</span>
        </div>
      </div>

      <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-widest text-gold-gradient mb-2">
        {RESTAURANT_INFO.name}
      </h2>

      <p className="font-serif-luxury italic text-stone-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
        “{RESTAURANT_INFO.footerQuote}”
      </p>

      {/* Action Buttons: PEDIR AGORA, INSTAGRAM, WHATSAPP (Specified in Item 14) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mb-8">
        <button
          id="btn-footer-pedir-agora"
          onClick={onScrollToOrder}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c99738] to-[#e5be6b] text-[#160408] font-cinzel font-bold text-xs tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>PEDIR AGORA</span>
        </button>

        <a
          id="btn-footer-whatsapp"
          href={`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido na Bela Pizza.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-xs tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WHATSAPP</span>
        </a>

        <a
          id="btn-footer-instagram"
          href={`https://instagram.com/${RESTAURANT_INFO.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-700 to-pink-600 hover:from-fuchsia-600 hover:to-pink-500 text-white font-cinzel font-bold text-xs tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Instagram className="w-4 h-4" />
          <span>INSTAGRAM</span>
        </a>
      </div>

      {/* Info details */}
      <div className="space-y-2 text-xs text-stone-300 max-w-sm mx-auto pt-4 border-t border-white/5">
        <div className="flex items-center justify-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#e5be6b] flex-shrink-0" />
          <span>{RESTAURANT_INFO.address}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#e5be6b] flex-shrink-0" />
          <span>{RESTAURANT_INFO.hours}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-stone-300">
          <Instagram className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
          <span>{RESTAURANT_INFO.instagram}</span>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-stone-400 flex items-center justify-center gap-1">
        <span>Bela Pizza © {new Date().getFullYear()} • Feito com</span>
        <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
        <span>e paixão italiana</span>
      </div>
    </footer>
  );
};
