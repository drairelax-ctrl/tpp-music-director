import React from "react";
import { Music, RefreshCw, Cpu } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
  apiConnected: boolean;
  checkingApi: boolean;
}

export default function Header({ onReset, apiConnected, checkingApi }: HeaderProps) {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50 py-4 px-6" id="app-header">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset} id="logo-container">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-emerald-400 p-[1.5px]">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Music className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
              티피피 프롬프트 디렉터 <span className="text-xs font-mono font-normal text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">V2.5</span>
            </h1>
            <p className="text-xs text-zinc-400">전문 AI 음악 프롬프트 디렉터 및 작사가</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span>티피피 뮤직 스튜디오</span>
            <span className="relative flex h-2 w-2">
              {checkingApi ? (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              ) : apiConnected ? (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              ) : (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              )}
            </span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all cursor-pointer"
            title="초기화"
            id="reset-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">다시 작성</span>
          </button>
        </div>
      </div>
    </header>
  );
}
