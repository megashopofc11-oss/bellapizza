import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToOrder,
}) => {
  const total = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    onProceedToOrder();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md h-full bg-[#160408] border-l border-[#e5be6b]/30 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between glass-wine">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#e5be6b]" />
                <h3 className="font-cinzel text-lg font-bold text-gold-gradient">
                  Sua Seleção
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-stone-400 hover:text-white bg-white/5 cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                  <p className="font-cinzel text-sm text-stone-300">
                    Sua sacola está vazia
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Adicione pizzas artesanais ou bebidas do cardápio.
                  </p>
                </div>
              ) : (
                cart.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="p-3 rounded-2xl glass-wine-card border border-[#e5be6b]/20 flex gap-3 items-center"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-cinzel text-sm font-bold text-[#fdfbf7] truncate">
                        {cartItem.item.name}
                      </h4>
                      <p className="text-xs text-[#e5be6b] font-semibold mt-0.5">
                        R$ {(cartItem.item.price * cartItem.quantity).toFixed(2).replace('.', ',')}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                          className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                          className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => onRemoveItem(cartItem.item.id)}
                          className="ml-auto text-stone-400 hover:text-rose-400 p-1 cursor-pointer"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-white/10 glass-wine space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-stone-300">Total:</span>
                  <span className="font-cinzel text-xl font-bold text-emerald-400">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-cinzel font-bold text-sm tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>IR PARA O ATENDIMENTO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
