/**
 * Speech Service for Bela Pizza
 * Implements Web Speech API with Brazilian Portuguese prioritization,
 * garbage collection protection, mobile autoplay gesture unlocking,
 * audio chime feedback, and mute state persistence.
 */

type Listener = () => void;

class SpeechService {
  private isMuted: boolean = false;
  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<Listener> = new Set();
  private audioContext: AudioContext | null = null;
  private unlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMute = sessionStorage.getItem('bela_pizza_muted');
      if (storedMute !== null) {
        this.isMuted = storedMute === 'true';
      }

      this.initVoices();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
        };
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();
    this.selectBestBrazilianVoice();
    this.notify();
  }

  private selectBestBrazilianVoice() {
    if (this.voices.length === 0) return;

    // Prioritize natural Brazilian Portuguese voices
    const ptBrVoices = this.voices.filter((v) => {
      const lang = (v.lang || '').replace('_', '-').toLowerCase();
      return lang === 'pt-br';
    });

    // Preferred high-quality voices often found in Android/Chrome/iOS/macOS
    const preferredNames = [
      'luciana',
      'francisca',
      'leticia',
      'letícia',
      'camila',
      'vitoria',
      'vitória',
      'yara',
      'google português do brasil',
      'brasil',
      'brazil',
    ];

    let found: SpeechSynthesisVoice | undefined;

    if (ptBrVoices.length > 0) {
      // Look for preferred names first
      found = ptBrVoices.find((v) =>
        preferredNames.some((name) => v.name.toLowerCase().includes(name))
      );
      // Otherwise take first pt-BR voice
      if (!found) found = ptBrVoices[0];
    } else {
      // Fallback to any Portuguese voice (e.g. pt-PT)
      found = this.voices.find((v) =>
        (v.lang || '').toLowerCase().startsWith('pt')
      );
    }

    this.selectedVoice = found || this.voices[0] || null;
  }

  /**
   * Unlocks Web Audio and SpeechSynthesis on user interaction (mandatory for mobile iOS/Android)
   */
  public unlockAudio() {
    if (this.unlocked) return;
    this.unlocked = true;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        if (!this.audioContext) {
          this.audioContext = new AudioCtx();
        }
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
      }
    } catch {
      // Ignore audio context errors
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
      } catch {
        // Ignore
      }
    }
  }

  /**
   * Plays a subtle, warm, elegant acoustic chime for tactile feedback
   */
  public playChime() {
    if (this.isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;
      // Soft two-tone warm chime (C5 -> E5)
      const osc1 = this.audioContext.createOscillator();
      const gain1 = this.audioContext.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.12, now + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc1.connect(gain1);
      gain1.connect(this.audioContext.destination);

      osc1.start(now);
      osc1.stop(now + 0.56);
    } catch {
      // AudioContext fallback ignored
    }
  }

  /**
   * Central speak function fulfilling user requirement:
   * - cancels previous speech
   * - checks mute state
   * - configures pt-BR, natural voice, rate, pitch
   * - manages speaking state and visual waveform callbacks
   */
  public speak(
    text: string,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
      rate?: number;
      pitch?: number;
    }
  ) {
    if (typeof window === 'undefined') return;

    // Ensure audio engines are unlocked
    this.unlockAudio();

    // Cancel any ongoing speech immediately
    this.cancel();

    if (this.isMuted) {
      // If muted, we don't speak audio, but we can trigger immediate finish
      options?.onEnd?.();
      return;
    }

    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis não é suportado neste navegador.');
      options?.onEnd?.();
      return;
    }

    // Refresh voices if not ready yet
    if (this.voices.length === 0) {
      this.initVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance; // Prevent garbage collection in Chrome/Safari

    utterance.lang = 'pt-BR';
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Natural, refined pacing
    utterance.rate = options?.rate ?? 0.98;
    utterance.pitch = options?.pitch ?? 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.notify();
      options?.onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.notify();
      options?.onEnd?.();
    };

    utterance.onerror = (event) => {
      console.warn('SpeechSynthesis event error:', event);
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.notify();
      options?.onEnd?.();
    };

    try {
      window.speechSynthesis.speak(utterance);
      // Workaround for mobile Safari / Chrome pausing background speech
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      console.error('Erro ao reproduzir voz:', e);
      this.isSpeaking = false;
      this.notify();
      options?.onEnd?.();
    }
  }

  public cancel() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore cancel errors
      }
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.notify();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.cancel();
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('bela_pizza_muted', String(this.isMuted));
    }
    this.notify();
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.isMuted) {
      this.cancel();
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('bela_pizza_muted', String(this.isMuted));
    }
    this.notify();
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getSelectedVoiceName(): string {
    return this.selectedVoice ? `${this.selectedVoice.name} (${this.selectedVoice.lang})` : 'Padrão pt-BR';
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error(err);
      }
    });
  }
}

export const speechService = new SpeechService();
