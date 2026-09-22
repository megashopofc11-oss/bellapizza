export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  category: 'pizza' | 'bebida' | 'promo';
  ingredients?: string[];
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export type ActiveSection = 'menu' | 'drinks' | 'promo' | 'order' | null;

export interface SpeechState {
  isSpeaking: boolean;
  isMuted: boolean;
  currentText: string;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoiceName: string;
}
