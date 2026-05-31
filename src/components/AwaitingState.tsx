import React from "react";
import { Sparkles, Music4, Key, Copy, HelpCircle } from "lucide-react";

interface AwaitingStateProps {
  onSelectPreset: (theme: string) => void;
}

export default function AwaitingState({ onSelectPreset }: AwaitingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-14 h-full bg-zinc-900/20 rounded-2xl border border-zinc-800/55 relative overflow-hidden" id="awaiting-state">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-600/10 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner ring-1 ring-zinc-800/10" id="awaiting-icon">
        <Music4 className="w-8 h-8 text-purple-400" />
      </div>

      <h3 className="font-display font-semibold text-lg text-white mb-2 flex items-center gap-2">
        음악 디렉션 생성 대기 중 <Sparkles className="w-4 h-4 text-purple-400" />
      </h3>
      <p className="text-zinc-400 text-sm max-w-md mb-8 leading-relaxed">
        왼쪽 패널에 만들고 싶은 곡의 주제나 분위기, 키워드를 적고 생성 버튼을 눌러보세요. AI 디렉터가 Suno AI 프롬프트와 감성적인 양식의 가사를 즉시 코칭해 드립니다.
      </p>

      {/* Quick Interactive Tooltip guide for Suno AI */}
      <div className="w-full max-w-lg bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 text-left mb-6" id="suno-quick-guide">
        <h4 className="text-xs font-mono font-semibold text-purple-300 tracking-wider uppercase mb-3 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          SUNO AI 프롬프트 활용 가이드
        </h4>
        <ul className="space-y-2.5 text-xs text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 py-1.5 rounded-full bg-purple-500 shrink-0"></span>
            <span>
              <strong>Style of Music Prompt</strong>: 생성되는 단문 영문 프롬프트(120자 이내)는 저작권 가수가 우회된 순수 음악 속성입니다. Suno AI의 <code className="text-zinc-200 font-mono px-1 py-0.5 bg-zinc-800 rounded">Style of Music</code> 칸에 붙여넣으세요.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 py-1.5 rounded-full bg-pink-500 shrink-0"></span>
            <span>
              <strong>Custom Lyrics</strong>: 제공되는 가사는 <code className="text-zinc-200 font-mono px-1 py-0.5 bg-zinc-800 rounded">[Verse]</code>, <code className="text-zinc-200 font-mono px-1 py-0.5 bg-zinc-800 rounded">[Chorus]</code> 등의 Suno 인지용 메타태그가 포함되어 있어, 완벽한 구성의 완곡을 손쉽게 뽑아낼 수 있습니다.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 py-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span>
              <strong>Advanced Mode</strong>: 더 세부적인 음향 구성이나 악기 배치를 수동 제어하고 싶을 때 확장형 장문 프롬프트를 참고할 수 있습니다.
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2" id="quick-theme-triggers">
        <span className="text-xs text-zinc-500">추천 테마 클릭해보기:</span>
        <button 
          onClick={() => onSelectPreset("비 오던 날 만나서 차 마시던 우연한 순간의 잔잔하고 애틋한 느낌")}
          className="text-xs bg-zinc-900/80 border border-zinc-800 hover:border-purple-500 text-zinc-300 px-3 py-1.5 rounded-full transition-all cursor-pointer"
        >
          🌧️ 우연한 만남
        </button>
        <button 
          onClick={() => onSelectPreset("네온사인 가득한 도시 한복판에서 차를 타고 고독을 즐기는 일렉트로 신스")}
          className="text-xs bg-zinc-900/80 border border-zinc-800 hover:border-purple-500 text-zinc-300 px-3 py-1.5 rounded-full transition-all cursor-pointer"
        >
          🌃 미드나잇 시티
        </button>
      </div>
    </div>
  );
}
