/**
 * Speech Service for Bela Pizza
 * Implements Web Speech API with advanced Brazilian Portuguese neural voice ranking,
 * natural prosody/cadence formatting, humanized pacing & pitch calibration,
 * garbage collection protection, mobile autoplay gesture unlocking,
 * audio chime feedback, and mute state persistence.
 */

type Listener = () => void;

export type SpeechPreset = 'natural-calorosa' | 'expressiva' | 'suave';

class SpeechService {
  private isMuted: boolean = false;
  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<Listener> = new Set();
  private audioContext: AudioContext | null = null;
  private unlocked: boolean = false;
  private speechPreset: SpeechPreset = 'natural-calorosa';

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMute = sessionStorage.getItem('bela_pizza_muted');
      if (storedMute !== null) {
        this.isMuted = storedMute === 'true';
      }

      const storedPreset = sessionStorage.getItem('bela_pizza_preset') as SpeechPreset | null;
      if (storedPreset) {
        this.speechPreset = storedPreset;
      }

      this.initVoices();

      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
        };
        // Some browsers take a brief delay to populate voices
        setTimeout(() => this.initVoices(), 250);
        setTimeout(() => this.initVoices(), 800);
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const allVoices = window.speechSynthesis.getVoices();
    if (allVoices.length > 0) {
      this.voices = allVoices;
      this.selectBestBrazilianVoice();
      this.notify();
    }
  }

  /**
   * Scores voices to find the most human, natural, neural Brazilian Portuguese voice available.
   * Prioritizes Microsoft Online (Natural), Apple Enhanced/Premium, and Google neural voices,
   * while filtering out robotic synthesizers like eSpeak or monotone desktop voices.
   */
  private scoreVoice(voice: SpeechSynthesisVoice): number {
    const name = (voice.name || '').toLowerCase();
    const lang = (voice.lang || '').replace('_', '-').toLowerCase();

    // 1. Language matching
    let isPtBr = lang === 'pt-br' || lang === 'pt_br';
    let isPt = lang.startsWith('pt');

    if (!isPt) return -9999; // Non-Portuguese voices disqualified

    let score = isPtBr ? 250 : 60;

    // 2. High-quality neural / natural indicators (highest priority for human-like speech)
    if (name.includes('natural')) score += 350; // Microsoft Edge Azure Natural voices (e.g. Francisca Natural)
    if (name.includes('neural')) score += 300;
    if (name.includes('online')) score += 200;
    if (name.includes('premium')) score += 260; // Apple Studio Premium voices
    if (name.includes('enhanced')) score += 220; // Apple Enhanced voices
    if (name.includes('google') || name.includes('chrome')) score += 180; // Google Brazilian Portuguese neural voice

    // 3. Female / Warm persona preferred for Bela
    const warmFemaleNames = [
      'francisca',
      'thalita',
      'brenda',
      'leticia',
      'letícia',
      'luciana',
      'camila',
      'joana',
      'vitória',
      'vitoria',
      'yara',
      'maria',
      'heloisa',
      'elza',
    ];
    if (warmFemaleNames.some((n) => name.includes(n))) {
      score += 90;
    }

    // 4. Remote / cloud service voices (localService === false means cloud neural synthesis)
    if (voice.localService === false) {
      score += 120;
    }

    // 5. Heavy penalty for known robotic/antiquated voices
    if (
      name.includes('espeak') ||
      name.includes('mbrola') ||
      name.includes('desktop') ||
      name.includes('sapi')
    ) {
      score -= 300;
    }

    return score;
  }

  private selectBestBrazilianVoice() {
    if (this.voices.length === 0) return;

    // Filter to Portuguese voices
    const ptVoices = this.voices.filter((v) => {
      const lang = (v.lang || '').replace('_', '-').toLowerCase();
      return lang.startsWith('pt');
    });

    if (ptVoices.length === 0) {
      this.selectedVoice = this.voices[0] || null;
      return;
    }

    // Rank all Portuguese voices by quality score
    const ranked = [...ptVoices].sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
    this.selectedVoice = ranked[0];
  }

  /**
   * Formats text for human-like natural prosody:
   * Inserts gentle micro-pauses, softer breathing intervals, and lively cadence,
   * avoiding the flat, monotone robotic drop of standard period stops.
   */
  public formatForHumanSpeech(text: string): string {
    return text
      // Convert abrupt exclamation endings to a warm exclamation followed by a slight pause
      .replace(/!\s+/g, '! ... ')
      // Convert abrupt periods to gentle ellipsis pauses for natural breathing
      .replace(/\.\s+/g, '... ')
      // Conversational pauses around questions and transitions
      .replace(/Me conta,\s*/gi, 'Me conta... ')
      .replace(/Dá uma olhadinha\./gi, 'Dá uma olhadinha!')
      // Natural currency expansion if present
      .replace(/R\$\s*([0-9]+)[,\.]([0-9]{2})/g, '$1 reais e $2 centavos')
      .replace(/R\$\s*([0-9]+)/g, '$1 reais')
      .trim();
  }

  /**
   * Unlocks Web Audio and SpeechSynthesis on user interaction (mandatory for mobile iOS/Android)
   */
  public unlockAudio() {
    if (this.unlocked) return;
    this.unlocked = true;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
   * - formats text with natural conversational cadence & micro-pauses
   * - cancels previous speech
   * - checks mute state
   * - configures pt-BR, highest quality neural voice, lively human rate & pitch
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

    // Format text for natural human phrasing
    const humanizedText = this.formatForHumanSpeech(text);

    const utterance = new SpeechSynthesisUtterance(humanizedText);
    this.currentUtterance = utterance; // Prevent garbage collection in Chrome/Safari

    utterance.lang = 'pt-BR';
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Dynamic prosody settings based on preset
    let defaultRate = 1.04;
    let defaultPitch = 1.06;

    if (this.speechPreset === 'expressiva') {
      defaultRate = 1.08;
      defaultPitch = 1.08;
    } else if (this.speechPreset === 'suave') {
      defaultRate = 0.99;
      defaultPitch = 1.03;
    }

    utterance.rate = options?.rate ?? defaultRate;
    utterance.pitch = options?.pitch ?? defaultPitch;
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
      // 'interrupted' or 'canceled' are normal when user clicks another option
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.warn('SpeechSynthesis event error:', event);
      }
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

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }

  public getSelectedVoiceName(): string {
    if (!this.selectedVoice) return 'Padrão pt-BR';
    const cleanName = this.selectedVoice.name
      .replace(/^Microsoft /i, '')
      .replace(/Online \(Natural\) - Portuguese \(Brazil\)/i, '(Natural)')
      .replace(/ - Portuguese \(Brazil\)/i, '')
      .replace(/Portuguese \(Brazil\)/i, 'pt-BR');
    return cleanName;
  }

  public getAvailablePortugueseVoices(): SpeechSynthesisVoice[] {
    return this.voices
      .filter((v) => {
        const lang = (v.lang || '').replace('_', '-').toLowerCase();
        return lang.startsWith('pt');
      })
      .sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
  }

  public setVoiceByName(name: string) {
    const found = this.voices.find((v) => v.name === name);
    if (found) {
      this.selectedVoice = found;
      this.notify();
    }
  }

  public setPreset(preset: SpeechPreset) {
    this.speechPreset = preset;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('bela_pizza_preset', preset);
    }
    this.notify();
  }

  public getPreset(): SpeechPreset {
    return this.speechPreset;
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

