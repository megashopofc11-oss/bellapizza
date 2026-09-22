/**
 * Bela Pizza - Biosite Premium com Atendimento por Voz
 * Implements real speech audio via Web Speech API (SpeechSynthesis),
 * mobile-first cinematic design, interactive voice assistant,
 * and seamless WhatsApp ordering.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { VoiceAssistantBanner } from './components/VoiceAssistantBanner';
import { InteractiveCards } from './components/InteractiveCards';
import { PromoSection } from './components/PromoSection';
import { MenuSection } from './components/MenuSection';
import { DrinksSection } from './components/DrinksSection';
import { OrderSection } from './components/OrderSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import { FloatingAssistant } from './components/FloatingAssistant';
import { CartDrawer } from './components/CartDrawer';
import { speechService } from './utils/speechService';
import { MenuItem, CartItem, ActiveSection } from './types';
import { PROMO_COMBO } from './data/menuData';

const GREETING_TEXT =
  'Olá! Seja muito bem-vindo à Bela Pizza. É um prazer ter você por aqui. Me conta, o que você gostaria de fazer hoje?';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(speechService.getIsMuted());
  const [lastSpokenText, setLastSpokenText] = useState<string>('');
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState<boolean>(false);

  // Sync with speechService state changes
  useEffect(() => {
    const unsubscribe = speechService.subscribe(() => {
      setIsSpeaking(speechService.getIsSpeaking());
      setIsMuted(speechService.getIsMuted());
    });
    return () => unsubscribe();
  }, []);

  // Central speak trigger ensuring voice + visual banner synchronization
  const triggerSpeech = useCallback(
    (text: string, onEndCallback?: () => void) => {
      setLastSpokenText(text);
      speechService.speak(text, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => {
          setIsSpeaking(false);
          onEndCallback?.();
        },
      });
    },
    []
  );

  // User gesture handler: Unlocks audio and triggers the initial greeting speech
  const handleEnterExperience = () => {
    speechService.unlockAudio();
    speechService.playChime();
    setHasEntered(true);

    // Speak initial greeting as requested in specification
    setTimeout(() => {
      triggerSpeech(GREETING_TEXT);
    }, 450);
  };

  // Sound toggle without restarting presentation
  const handleToggleMute = () => {
    const newMute = speechService.toggleMute();
    setIsMuted(newMute);
  };

  // Interactive Card Selection (Item 6 in user requirements)
  const handleSelectOption = (section: ActiveSection, speechText: string) => {
    setActiveSection(section);

    // Trigger exact speech line required
    triggerSpeech(speechText);

    // Smooth scroll to the corresponding section
    setTimeout(() => {
      let targetId = '';
      if (section === 'menu') targetId = 'secao-cardapio';
      else if (section === 'drinks') targetId = 'secao-bebidas';
      else if (section === 'promo') targetId = 'secao-promocoes';
      else if (section === 'order') targetId = 'secao-fazer-pedido';

      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 250);
  };

  // Repeat presentation speech (Item 9)
  const handleRepeatGreeting = () => {
    setActiveSection(null);
    triggerSpeech(GREETING_TEXT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddItem = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    speechService.playChime();
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectCombo = () => {
    handleAddItem(PROMO_COMBO);
    handleSelectOption(
      'order',
      'Excelente escolha! Adicionei o Combo Bela ao seu pedido. Vamos finalizar pelo WhatsApp.'
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#120407] text-[#f6efe2] relative selection:bg-[#c99738] selection:text-[#120407]">
      {/* Background cinematic ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-radial from-[#571424]/30 via-[#2a0a12]/15 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#c99738]/10 rounded-full blur-3xl animate-ambient" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#3b0d19]/35 rounded-full blur-3xl" />
      </div>

      {/* Screen 1: Welcome Overlay (Audio unlock gateway) */}
      <AnimatePresence>
        {!hasEntered && <WelcomeScreen onEnter={handleEnterExperience} />}
      </AnimatePresence>

      {/* Screen 2: Main Biosite Experience */}
      {hasEntered && (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Sticky Header with sound controls */}
          <Header
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAssistant={() => setIsAssistantModalOpen(true)}
            isSpeaking={isSpeaking}
          />

          {/* Assistant Voice Status Banner */}
          <VoiceAssistantBanner
            isSpeaking={isSpeaking}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            lastSpokenText={lastSpokenText}
            onRepeatLast={() => lastSpokenText && triggerSpeech(lastSpokenText)}
          />

          {/* Interactive Menu Cards (Ver Cardápio, Bebidas, Promoções, Fazer Pedido) */}
          <InteractiveCards
            onSelectOption={handleSelectOption}
            activeSection={activeSection}
          />

          {/* Main Sections */}
          <main className="flex-1">
            {/* Promoção Destaque (Combo Bela) */}
            <PromoSection onSelectCombo={handleSelectCombo} />

            {/* Pizzas Artesanais */}
            <MenuSection
              onSelectItem={handleAddItem}
              selectedIds={cart.map((c) => c.item.id)}
            />

            {/* Bebidas & Harmonização */}
            <DrinksSection
              onSelectItem={handleAddItem}
              selectedIds={cart.map((c) => c.item.id)}
            />

            {/* Por que escolher a Bela Pizza? */}
            <WhyChooseUs />

            {/* Fazer Pedido (WhatsApp) */}
            <OrderSection
              cart={cart}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          </main>

          {/* Footer */}
          <Footer
            onScrollToOrder={() => {
              const el = document.getElementById('secao-fazer-pedido');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Floating Assistant Button */}
          <FloatingAssistant
            isSpeaking={isSpeaking}
            onSelectOption={handleSelectOption}
            onRepeatGreeting={handleRepeatGreeting}
          />

          {/* Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onProceedToOrder={() => {
              const el = document.getElementById('secao-fazer-pedido');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      )}
    </div>
  );
}
