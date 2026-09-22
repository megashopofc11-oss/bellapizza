import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Pizza, Flame, MessageCircle, Volume2, Mic } from 'lucide-react';
import { ActiveSection } from '../types';

interface FloatingAssistantProps {
  isSpeaking: boolean;
  onSelectOption: (section: ActiveSection, speechText: string) => void;
  onRepeatGreeting: () => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  isSpeaking,
  onSelectOption,
  onRepeatGreeting,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (callback: () => void) => {
    callback();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          id="btn-assistente-flutuante"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Abrir assistente Bela"
          className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.6)] border transition-all ${
            isSpeaking
              ? 'bg-gradient-to-br from-[#c99738] via-[#e5be6b] to-[#f5d48b] text-[#160408] border-white shadow-[0_0_25px_rgba(201,151,56,0.6)]'
              : 'bg-gradient-to-br from-[#571424] to-[#2a0a12] text-[#e5be6b] border-[#e5be6b]/40 hover:border-[#e5be6b]'
          }`}
        >
          {/* Pulsing ring when speaking or ready */}
          {isSpeaking ? (
            <span className="absolute -inset-1.5 rounded-full border-2 border-[#e5be6b] animate-ping opacity-75 pointer-events-none" />
          ) : (
            <span className="absolute -inset-1 rounded-full border border-[#e5be6b]/20 pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              {isSpeaking ? (
                <div className="flex items-end gap-[2px] h-5 px-1">
                  <span className="w-1 bg-[#160408] rounded-full animate-eq-1" />
                  <span className="w-1 bg-[#160408] rounded-full animate-eq-2" />
                  <span className="w-1 bg-[#160408] rounded-full animate-eq-3" />
                  <span className="w-1 bg-[#160408] rounded-full animate-eq-4" />
                </div>
              ) : (
                <div className="relative">
                  <Mic className="w-6 h-6 text-[#e5be6b]" />
                  <Sparkles className="w-3 h-3 text-[#f5d48b] absolute -top-1 -right-1" />
                </div>
              )}
            </div>
          )}
        </motion.button>
      </div>

      {/* Assistant Modal / Bottom Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm rounded-3xl glass-wine-card border border-[#e5be6b]/40 shadow-2xl p-5 overflow-hidden relative"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white bg-white/5 cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header with avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#c99738] to-[#571424] p-[1.5px] shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#1c060b] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#e5be6b]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-gold-gradient">
                    Assistente Bela
                  </h3>
                  <p className="text-xs text-stone-300">Como posso ajudar?</p>
                </div>
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                <button
                  id="btn-assistente-pizza"
                  onClick={() =>
                    handleAction(() =>
                      onSelectOption(
                        'menu',
                        'Ótima escolha! Separei algumas das pizzas mais pedidas da Bela Pizza para você. Dá uma olhadinha.'
                      )
                    )
                  }
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-[#571424]/40 border border-white/10 hover:border-[#e5be6b]/40 text-left transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🍕</span>
                    <span className="text-xs font-semibold text-stone-200 group-hover:text-white">
                      Quero uma pizza
                    </span>
                  </div>
                  <Volume2 className="w-4 h-4 text-[#e5be6b]/60 group-hover:text-[#e5be6b]" />
                </button>

                <button
                  id="btn-assistente-promocao"
                  onClick={() =>
                    handleAction(() =>
                      onSelectOption(
                        'promo',
                        'Olha só o que eu encontrei para você. Temos ofertas especiais disponíveis hoje.'
                      )
                    )
                  }
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-[#571424]/40 border border-white/10 hover:border-[#e5be6b]/40 text-left transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🔥</span>
                    <span className="text-xs font-semibold text-stone-200 group-hover:text-white">
                      Ver promoção
                    </span>
                  </div>
                  <Volume2 className="w-4 h-4 text-[#e5be6b]/60 group-hover:text-[#e5be6b]" />
                </button>

                <button
                  id="btn-assistente-pedido"
                  onClick={() =>
                    handleAction(() =>
                      onSelectOption(
                        'order',
                        'Perfeito! Vou te levar para o nosso atendimento. É só mandar sua mensagem e a equipe da Bela Pizza continua seu pedido.'
                      )
                    )
                  }
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-[#571424]/40 border border-white/10 hover:border-[#e5be6b]/40 text-left transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">💬</span>
                    <span className="text-xs font-semibold text-stone-200 group-hover:text-white">
                      Fazer pedido
                    </span>
                  </div>
                  <Volume2 className="w-4 h-4 text-[#e5be6b]/60 group-hover:text-[#e5be6b]" />
                </button>

                {/* Repetir Apresentação (Item 9 requirement) */}
                <button
                  id="btn-assistente-repetir"
                  onClick={() => handleAction(onRepeatGreeting)}
                  className="w-full p-3 rounded-xl bg-[#571424]/30 hover:bg-[#571424]/70 border border-[#e5be6b]/30 hover:border-[#e5be6b] text-left transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🔊</span>
                    <div>
                      <span className="text-xs font-bold text-[#e5be6b] block">
                        Repetir apresentação
                      </span>
                      <span className="text-[10px] text-stone-300">
                        Ouvir as boas-vindas novamente
                      </span>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-[#e5be6b]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
