import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Clock, ShieldCheck, MapPin, Send, Trash2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { CartItem } from '../types';

interface OrderSectionProps {
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  cart,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const cartTotal = cart.reduce(
    (acc, curr) => acc + curr.item.price * curr.quantity,
    0
  );

  const buildWhatsAppUrl = () => {
    let message = `*Olá, Bela Pizza! Gostaria de fazer um pedido.*\n\n`;

    if (customerName.trim()) {
      message += `👤 *Nome:* ${customerName.trim()}\n`;
    }

    if (cart.length > 0) {
      message += `📋 *Itens selecionados:*\n`;
      cart.forEach((c) => {
        message += `• ${c.quantity}x ${c.item.name} - R$ ${(c.item.price * c.quantity).toFixed(2).replace('.', ',')}\n`;
      });
      message += `\n💰 *Total:* R$ ${cartTotal.toFixed(2).replace('.', ',')}\n`;
    } else {
      message += `Gostaria de ver o cardápio e fazer o pedido de hoje.\n`;
    }

    if (customerNotes.trim()) {
      message += `📝 *Observação:* ${customerNotes.trim()}\n`;
    }

    message += `\n📍 *Por favor, confirmem o tempo estimado para entrega.*`;

    return `https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="secao-fazer-pedido" className="w-full max-w-xl mx-auto px-4 my-6 scroll-mt-20">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950/70 text-emerald-400 border border-emerald-500/30">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient tracking-wide">
              Atendimento & Pedidos
            </h2>
            <p className="text-xs text-stone-300">Finalização ágil e personalizada via WhatsApp</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl glass-wine-card border border-emerald-500/30 shadow-2xl p-5 space-y-4"
      >
        {/* Cart summary if items exist */}
        {cart.length > 0 ? (
          <div className="bg-[#120407]/70 rounded-2xl p-4 border border-[#e5be6b]/20">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="font-cinzel text-xs uppercase tracking-wider text-[#e5be6b] font-bold">
                Resumo da sua seleção ({cart.reduce((s, i) => s + i.quantity, 0)} itens)
              </span>
              <button
                onClick={onClearCart}
                className="text-[11px] text-stone-300 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Limpar</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cart.map((c) => (
                <div key={c.item.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                    <span className="font-bold text-[#e5be6b]">{c.quantity}x</span>
                    <span className="text-stone-200 truncate">{c.item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-semibold text-white">
                      R$ {(c.item.price * c.quantity).toFixed(2).replace('.', ',')}
                    </span>
                    <button
                      onClick={() => onRemoveItem(c.item.id)}
                      className="text-stone-300 hover:text-rose-400 p-0.5"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-baseline justify-between">
              <span className="text-xs text-stone-300">Total estimado:</span>
              <span className="font-cinzel text-lg font-bold text-emerald-400">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 rounded-2xl p-3.5 text-center border border-white/5">
            <p className="text-xs text-stone-300">
              Você pode tocar em <span className="text-[#e5be6b] font-semibold">Pedir Pizza</span> no cardápio ou enviar uma mensagem direta com o que deseja.
            </p>
          </div>
        )}

        {/* Optional Customer info input */}
        <div className="space-y-2">
          <input
            id="input-customer-name"
            type="text"
            placeholder="Seu nome (opcional)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#140508] border border-white/10 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#e5be6b]/60 transition-colors"
          />
          <input
            id="input-customer-notes"
            type="text"
            placeholder="Observações (ex: sem cebola, borda recheada, etc.)"
            value={customerNotes}
            onChange={(e) => setCustomerNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#140508] border border-white/10 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#e5be6b]/60 transition-colors"
          />
        </div>

        {/* Prominent WhatsApp CTA Button */}
        <a
          id="btn-pedir-whatsapp-principal"
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-cinzel font-bold text-base tracking-wider shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_10px_35px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>PEDIR PELO WHATSAPP</span>
          <Send className="w-4 h-4 ml-1 opacity-80 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Quality Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[11px] text-stone-400 text-center">
          <div className="flex flex-col items-center gap-1 p-1">
            <Clock className="w-3.5 h-3.5 text-[#e5be6b]" />
            <span>35-45 min</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Embalagem Lacre</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Entrega Segura</span>
          </div>
        </div>

        <p className="text-[10px] text-center text-stone-500">
          Atendimento WhatsApp: {RESTAURANT_INFO.phoneDisplay}
        </p>
      </motion.div>
    </section>
  );
};
