import React from 'react';
import { Volume2, VolumeX, Sparkles, RefreshCw } from 'lucide-react';

interface VoiceAssistantBannerProps {
  isSpeaking: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  lastSpokenText?: string;
  onRepeatLast: () => void;
}

export const VoiceAssistantBanner: React.FC<VoiceAssistantBannerProps> = ({
  isSpeaking,
  isMuted,
  onToggleMute,
  lastSpokenText,
  onRepeatLast,
}) => {
  return (
    <div
      id="voice-assistant-banner"
      className={`w-full max-w-xl mx-auto px-4 py-2.5 my-3 transition-all duration-300 rounded-2xl glass-wine border ${
        isSpeaking
          ? 'border-[#e5be6b]/60 shadow-[0_0_20px_rgba(201,151,56,0.22)] bg-gradient-to-r from-[#2a0a12]/90 via-[#3b0d19]/80 to-[#2a0a12]/90'
          : 'border-[#e5be6b]/20 bg-[#1a060b]/75'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Avatar + Voice Indicator & Status */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                isSpeaking
                  ? 'bg-[#571424] border-[#e5be6b] shadow-[0_0_12px_rgba(201,151,56,0.45)]'
                  : 'bg-[#2a0a12] border-[#e5be6b]/30'
              }`}
            >
              <Sparkles
                className={`w-4 h-4 ${
                  isSpeaking ? 'text-[#e5be6b] animate-spin' : 'text-[#c99738]'
                }`}
                style={{ animationDuration: '6s' }}
              />
            </div>
            {isSpeaking && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#120407] rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-[#e5be6b] flex items-center gap-1.5">
                {isSpeaking ? (
                  <>
                    <span className="text-amber-300">🔊</span> Bela está falando…
                  </>
                ) : (
                  <>
                    <span>✨</span> Bela está pronta para ajudar
                  </>
                )}
              </span>

              {/* Animated Equalizer Waveform */}
              {isSpeaking ? (
                <div className="flex items-end gap-[3px] h-4 px-1" title="Equalizador de áudio">
                  <span className="w-1 bg-[#e5be6b] rounded-full animate-eq-1" />
                  <span className="w-1 bg-[#e5be6b] rounded-full animate-eq-2" />
                  <span className="w-1 bg-[#f5d48b] rounded-full animate-eq-3" />
                  <span className="w-1 bg-[#c99738] rounded-full animate-eq-4" />
                  <span className="w-1 bg-[#e5be6b] rounded-full animate-eq-5" />
                </div>
              ) : (
                <span className="text-[10px] text-stone-300 tracking-wider">
                  ● ▂ ▃ ▂
                </span>
              )}
            </div>

            {/* Subtitle / context phrase */}
            <p className="text-xs text-stone-200 truncate font-light mt-0.5">
              {isSpeaking
                ? (lastSpokenText ? `“${lastSpokenText}”` : 'Reproduzindo áudio...')
                : 'Como posso ajudar você hoje?'}
            </p>
          </div>
        </div>

        {/* Right Side: Repeat speech & Mute toggles */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {!isSpeaking && lastSpokenText && !isMuted && (
            <button
              id="btn-repetir-fala"
              onClick={onRepeatLast}
              title="Repetir fala da Bela"
              className="p-1.5 rounded-lg text-stone-300 hover:text-[#e5be6b] hover:bg-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            id="btn-banner-som-toggle"
            onClick={onToggleMute}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
              isMuted
                ? 'bg-stone-900/90 text-stone-300 border-stone-800 hover:bg-stone-800'
                : 'bg-[#571424]/60 text-[#e5be6b] border-[#c99738]/40 hover:bg-[#571424]'
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Ativar voz</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#e5be6b]" />
                <span>Desativar voz</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
