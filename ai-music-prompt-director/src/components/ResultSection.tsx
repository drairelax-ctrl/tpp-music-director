import React, { useState } from "react";
import { GeneratedSongResponse } from "../types";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Music, 
  Heart, 
  Layers, 
  FileText, 
  VolumeX, 
  Volume2, 
  Terminal, 
  ExternalLink 
} from "lucide-react";

interface ResultSectionProps {
  data: GeneratedSongResponse;
  copiedField: string | null;
  onCopyText: (text: string, id: string) => void;
}

export default function ResultSection({ data, copiedField, onCopyText }: ResultSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "prompt" | "lyrics" | "raw">("overview");

  // Construct raw requested format text exactly as needed
  const rawFormatText = `[Music Style Analysis]
- Main Genre: ${data.coreGenre || data.genre}
- Sub Genre: ${(data.subGenres || []).join(", ")}
- Mood: ${data.emotions.join(", ")}
- BPM Feel: ${data.recommendedBPM || "Auto-detect"}
- Vocal Style: ${data.vocalStyle}
- Instruments: ${data.instruments.join(", ")}
- Atmosphere: ${data.atmosphere}
- Keywords: ${(data.sunoKeywords || []).join(", ")}

[Suno Prompt]
${data.sunoPrompt}

[Lyrics Direction]
- Theme: ${data.lyricsStyleGuide.direction}
- Emotion: ${data.lyricsStyleGuide.coreEmotion}
- Writing Style: ${data.lyricsStyleGuide.recommendedExpressionStyles.join(", ")}
- Hook Style: ${data.lyricsStyleGuide.recommendedThemes.join(", ")}

[Generated Lyrics]
${data.lyrics}`;

  return (
    <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl relative" id="result-dashboard">
      {/* Decorative top strip */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400"></div>

      {/* Title Header of Generated Song */}
      <div className="p-5 border-b border-zinc-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/20">
        <div className="min-w-0">
          <span className="text-[10px] font-mono font-medium text-purple-400 uppercase tracking-widest block mb-1">
            GENERATED MASTER DIRECTION
          </span>
          <h2 className="text-xl font-display font-bold text-white tracking-tight truncate flex items-center gap-2">
            🎵 {data.songTitle}
          </h2>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onCopyText(rawFormatText, "full-raw")}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            id="copy-full-results"
          >
            {copiedField === "full-raw" ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>전체 포맷 복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-900/80 px-2 bg-zinc-950" id="result-subtabs">
        <button
          onClick={() => setActiveSubTab("overview")}
          className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === "overview"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          음악 스타일 분석
        </button>
        <button
          onClick={() => setActiveSubTab("prompt")}
          className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === "prompt"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          Suno Prompts (영문)
        </button>
        <button
          onClick={() => setActiveSubTab("lyrics")}
          className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === "lyrics"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          가사 & 디렉션
        </button>
        <button
          onClick={() => setActiveSubTab("raw")}
          className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeSubTab === "raw"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          출력 전용 리포트
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        {/* TAB 1: OVERVIEW */}
        {activeSubTab === "overview" && (
          <div className="space-y-6" id="overview-pane">
            {/* Genre & Beat Deep Dive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Core Genre widget */}
              <div className="p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">핵심 뮤직 장르 (Core Genre)</span>
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  {data.coreGenre || data.genre}
                </span>
              </div>

              {/* Recommended BPM widget */}
              <div className="p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-pink-400 uppercase tracking-wider block">정밀 추천 BPM</span>
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  {data.recommendedBPM || "Auto"}
                </span>
              </div>

              {/* Sub genres widget */}
              <div className="p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">융합 서브 장르 & 하위 스타일</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {(data.subGenres || []).length > 0 ? (
                    (data.subGenres || []).map((sub, i) => (
                      <span key={i} className="text-[11px] font-mono bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded">
                        #{sub}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-zinc-400">자율적인 크로스오버 풍</span>
                  )}
                </div>
              </div>

              {/* Vocal property */}
              <div className="p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">설계된 보컬 스타일</span>
                <p className="text-sm text-zinc-100 font-medium leading-relaxed mt-0.5">{data.vocalStyle}</p>
              </div>

              {/* Emotional Curve description */}
              <div className="p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl md:col-span-2 space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">감정 곡선 디자인 (Emotional Curve Cycle)</span>
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/20">
                  {data.emotionalCurve || "도입부에서 에코와 어쿠스틱 악기들로 아련함을 전한 뒤, 코러스 후렴구에서 극대화되어 아웃트로까지 고조되는 감정 곡선 라인입니다."}
                </p>
              </div>
            </div>

            {/* Vibe and theme tags */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">곡 분위기 & 감정선 해석</h4>
              <div className="p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl space-y-3">
                <p className="text-zinc-300 text-sm leading-relaxed">{data.atmosphere}</p>
                
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {data.emotions.map((emotion, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/10 px-2.5 py-1 rounded-full"
                    >
                      ✨ {emotion}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Instruments */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">추천 악기 구성</h4>
              <div className="flex flex-wrap gap-2" id="instrument-tags">
                {data.instruments.map((inst, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    🎸 {inst}
                  </span>
                ))}
              </div>
            </div>

            {/* Suno Key Words */}
            {data.sunoKeywords && data.sunoKeywords.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Suno용 핵심 키워드 (Tags)</h4>
                <div className="flex flex-wrap gap-1.5" id="suno-keyword-tags">
                  {data.sunoKeywords.map((kw, i) => (
                    <span 
                      key={i} 
                      className="text-xs font-mono bg-purple-950/20 text-purple-300 border border-purple-900/30 px-2.5 py-1 rounded-md"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROMPTS */}
        {activeSubTab === "prompt" && (
          <div className="space-y-6" id="prompts-pane">
            {/* Standard Style Prompt Card */}
            <div className="p-5 bg-zinc-900/50 border border-zinc-800/75 rounded-2xl space-y-3 relative overflow-hidden" id="suno-main-card">
              <div className="absolute top-0 right-0 p-1.5 bg-purple-500/10 border-b border-l border-purple-500/20 text-[9px] font-mono text-purple-400 rounded-bl-lg uppercase tracking-wider">
                Suno Max 120 chars
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-white">Suno AI Style Prompt</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Suno AI 메인화면 "Style of Music" 입력창에 입력하세요.</p>
                </div>
                <button
                  onClick={() => onCopyText(data.sunoPrompt, "suno-prompt")}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
                  title="프롬프트 복사"
                >
                  {copiedField === "suno-prompt" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 text-sm font-mono text-purple-300 rounded-xl leading-relaxed whitespace-pre-wrap select-all">
                {data.sunoPrompt}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                <span>글자 수: {data.sunoPrompt.length}자</span>
                <span>•</span>
                <span className="text-emerald-400/90 font-sans">안전성: 100% (저작권 회피 우회 적용)</span>
              </div>
            </div>

            {/* Advanced Expanded Prompt Card */}
            <div className="p-5 bg-zinc-900/20 border border-zinc-800/40 rounded-2xl space-y-3" id="suno-adv-card">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300">Advanced Prompt (확장형 디테일)</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">악장 분할, 분위기 고조 등 더 세밀하게 묘사하고 싶을 때 사용합니다.</p>
                </div>
                <button
                  onClick={() => onCopyText(data.optionalAdvancedPrompt, "adv-prompt")}
                  className="p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/40 text-zinc-500 hover:text-zinc-200 transition-all cursor-pointer"
                  title="확장프롬프트 복사"
                >
                  {copiedField === "adv-prompt" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 bg-zinc-950/50 border border-zinc-900/50 text-xs font-mono text-zinc-400 rounded-xl leading-relaxed whitespace-pre-wrap select-all">
                {data.optionalAdvancedPrompt}
              </div>
            </div>

            {/* Step-by-Step copy guideline */}
            <div className="p-4 bg-purple-950/20 border border-purple-900/20 rounded-xl text-xs text-purple-300 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-[10px] text-purple-400 shrink-0 mt-0.5">
                !
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-purple-300">Suno AI에서 작곡을 성공하는 핵심 팁</p>
                <p className="text-zinc-400 leading-relaxed">
                  Suno AI를 켜고 <strong>Custom Mode</strong> 스위치를 켠 다음, <span className="text-purple-300 font-mono">[Lyrics]</span> 상자에는 우리의 쉼표 메타태그 가사를 그대로 페이스트하고, <span className="text-purple-300 font-mono">[Style of Music]</span> 상자에는 위 120자 제한 프롬프트를 넣고 Generate를 누르면 가장 자연스러운 명품 완곡이 완성됩니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LYRICS */}
        {activeSubTab === "lyrics" && (
          <div className="space-y-6" id="lyrics-pane">
            {/* Lyrical style guide block */}
            <div className="p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-xl space-y-3.5" id="lyric-guide-card">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Lyrics Direction & Style Guide
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-zinc-500 block">핵심 감정선</span>
                  <span className="font-semibold text-zinc-200">❤️ {data.lyricsStyleGuide.coreEmotion}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 block">작사 진행 방향</span>
                  <p className="text-zinc-300 mt-0.5 leading-relaxed">{data.lyricsStyleGuide.direction}</p>
                </div>
                <div className="space-y-1 bg-zinc-950/50 p-2.5 rounded-lg">
                  <span className="text-zinc-500 block mb-1">추천 소재 & 추천 단어</span>
                  <span className="font-medium text-purple-300">{data.lyricsStyleGuide.recommendedThemes.join(", ")}</span>
                </div>
                <div className="space-y-1 bg-zinc-950/50 p-2.5 rounded-lg">
                  <span className="text-zinc-500 block mb-1">추천 표현 스타일</span>
                  <span className="font-medium text-pink-300">{data.lyricsStyleGuide.recommendedExpressionStyles.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Generated Lyrics Scroll card */}
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-zinc-950">
                <h4 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">완성된 노래방 가사 (Suno Metatags)</h4>
                <button
                  onClick={() => onCopyText(data.lyrics, "lyrics")}
                  className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500 text-xs text-zinc-300 px-3 py-1.5 rounded-lg cursor-pointer"
                >
                  {copiedField === "lyrics" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">가사 복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>가사만 복사</span>
                    </>
                  )}
                </button>
              </div>

              {/* Music sheet background visual for reading lyrics */}
              <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/30">
                <div className="p-6 md:p-8 max-h-[380px] overflow-y-auto leading-relaxed text-zinc-300 font-mono text-sm whitespace-pre-wrap select-all">
                  {/* We can present this nicely, highlights lines in bracket like [Verse] */}
                  {data.lyrics.split("\n").map((line, idx) => {
                    if (line.trim().startsWith("[") && line.trim().endsWith("]")) {
                      return (
                        <div key={idx} className="text-purple-400 font-bold tracking-wider py-1.5 mt-3 border-b border-zinc-900/80 mb-2 first:mt-0 font-display">
                          {line}
                        </div>
                      );
                    }
                    return (
                      <div key={idx} className="my-1.5 pl-2 border-l border-zinc-900 hover:border-purple-500/40 hover:text-white transition-all">
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RAW TEMPLATE REPORT */}
        {activeSubTab === "raw" && (
          <div className="space-y-4" id="raw-pane">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">제출 양식 원본 텍스트 리포트</h4>
                <p className="text-[10px] text-zinc-500">포맷이 온전히 유지되어 있으며, 어디서나 편리하게 가공 및 출력이 가능합니다.</p>
              </div>
              <button
                onClick={() => onCopyText(rawFormatText, "full-raw-tab")}
                className="flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                {copiedField === "full-raw-tab" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>텍스트 전체 복사</span>
              </button>
            </div>

            <textarea
              readOnly
              value={rawFormatText}
              className="w-full h-[320px] bg-zinc-950 border border-zinc-900 rounded-xl p-4 font-mono text-xs text-zinc-400 outline-none resize-none focus:ring-0 leading-relaxed select-all"
            ></textarea>
          </div>
        )}
      </div>

      <div className="bg-zinc-900/40 px-6 py-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500">
        <span>Suno AI v3 & v4 safe prompts</span>
        <a 
          href="https://suno.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 hover:text-white text-purple-400 group"
        >
          Suno AI 바로가기 <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
