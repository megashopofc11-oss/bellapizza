import React from 'react';
import { Volume2, VolumeX, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
  isSpeaking: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  cartCount,
  onOpenCart,
  onOpenAssistant,
  isSpeaking,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-wine border-b border-[#e5be6b]/20 shadow-lg">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c99738] to-[#571424] p-[1px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#160408] flex items-center justify-center">
              <span className="font-cinzel font-bold text-xs text-[#e5be6b]">BP</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-gold-gradient leading-none">
                {RESTAURANT_INFO.name}
              </h1>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Aberto agora" />
            </div>
            <p className="text-[10px] text-stone-300 tracking-wider uppercase font-medium">
              ALTA GASTRONOMIA
            </p>
          </div>
        </div>

        {/* Quick actions: Sound toggle, Assistant trigger, WhatsApp, Cart */}
        <div className="flex items-center gap-2">
          {/* Sound Mute Toggle (Item 13 in user specs) */}
          <button
            id="btn-header-som"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Ativar voz' : 'Desativar voz'}
            title={isMuted ? 'Ativar voz' : 'Desativar voz'}
            className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center border cursor-pointer ${
              isMuted
                ? 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-white'
                : 'bg-[#571424]/40 text-[#e5be6b] border-[#c99738]/40 shadow-[0_0_10px_rgba(201,151,56,0.2)]'
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <div className="relative">
                <Volume2 className="w-4 h-4 text-[#e5be6b]" />
                {isSpeaking && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#e5be6b] animate-ping" />
                )}
              </div>
            )}
          </button>

          {/* Assistant Voice Status indicator shortcut */}
          <button
            id="btn-header-assistente"
            onClick={onOpenAssistant}
            className="p-2 rounded-xl glass-wine border border-[#e5be6b]/30 text-[#e5be6b] hover:bg-[#3b0d19]/60 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-medium"
            title="Assistente Bela"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e5be6b]" />
            <span className="hidden xs:inline text-[11px]">Bela</span>
          </button>

          {/* Direct WhatsApp link */}
          <a
            id="btn-header-whatsapp"
            href={`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido na Bela Pizza.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/50 transition-all flex items-center justify-center cursor-pointer"
            title="WhatsApp Bela Pizza"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Cart button if items added */}
          {cartCount > 0 && (
            <button
              id="btn-header-sacola"
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-gradient-to-r from-[#c99738] to-[#e5be6b] text-[#160408] font-bold shadow-md cursor-pointer transition-transform hover:scale-105"
              title="Ver pedido"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#571424] text-[#f6efe2] text-[10px] font-bold flex items-center justify-center border border-[#e5be6b]">
                {cartCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
