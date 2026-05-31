import React from "react";
import { Sparkles, Music, FastForward, User, Languages, HelpCircle } from "lucide-react";
import { MUSIC_PRESETS, GENRE_OPTIONS, BPM_OPTIONS, VOCAL_OPTIONS, LANGUAGE_OPTIONS } from "../templates";
import { SongPreset } from "../types";

interface MusicFormProps {
  userTheme: string;
  setUserTheme: (val: string) => void;
  customDirections: string;
  setCustomDirections: (val: string) => void;
  selectedGenre: string;
  setSelectedGenre: (val: string) => void;
  bpm: string;
  setBpm: (val: string) => void;
  vocalType: string;
  setVocalType: (val: string) => void;
  language: string;
  setLanguage: (val: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onApplyPreset: (preset: SongPreset) => void;
}

export default function MusicForm({
  userTheme,
  setUserTheme,
  customDirections,
  setCustomDirections,
  selectedGenre,
  setSelectedGenre,
  bpm,
  setBpm,
  vocalType,
  setVocalType,
  language,
  setLanguage,
  isLoading,
  onSubmit,
  onApplyPreset,
}: MusicFormProps) {
  const directionChips = [
    { label: "이별 이야기", text: "가슴 저미는 이별 이야기였으면 좋겠음" },
    { label: "후렴 중독성", text: "후렴구 중독성이 매우 강했으면 좋겠음" },
    { label: "정갈한 랩", text: "욕설이나 비속어 없는 정갈하고 시적 느낌의 랩 추가" },
    { label: "희망/응원", text: "희망차고 가슴이 따뜻해지는 응원 무드" },
    { label: "사실적 가사", text: "구체적인 시간과 장소가 나오는 사실적인 대화 스타일 가사" },
    { label: "남자 보컬", text: "남자 솔로 보컬의 애절한 미성 느낌 제안" },
    { label: "여성 인디", text: "여성 인디 어쿠스틱 특유의 읊조리는 쓸쓸한 감성" },
    { label: "라임 강조", text: "가사에 자연스러운 연상 단어와 라임을 쫀득하게 매칭" },
    { label: "틱톡/숏폼 훅", text: "틱톡이나 숏폼 릴스에서 쓰기 좋은 15초 중독적인 킬링 파트 훅" },
  ];

  const handleChipClick = (text: string) => {
    if (customDirections.includes(text)) {
      // Remove it
      setCustomDirections(
        customDirections
          .replace(text, "")
          .replace(/,\s*,/g, ",")
          .replace(/^,\s*/, "")
          .replace(/,\s*$/, "")
          .trim()
      );
    } else {
      // Add it
      setCustomDirections(customDirections ? `${customDirections}, ${text}` : text);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6" id="music-director-form">
      {/* 1. Quick Presets */}
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3 flex items-center justify-between">
          <span>인기 프리셋 퀵로드</span>
          <span className="text-[10px] text-purple-400 lowercase font-normal">원클릭 자동 설정</span>
        </label>
        <div className="grid grid-cols-2 gap-2" id="preset-grid">
          {MUSIC_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="flex items-start gap-2.5 p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 text-left hover:border-purple-500/50 hover:bg-zinc-900/90 transition-all cursor-pointer group"
              title={preset.themeKOR}
            >
              <span className="text-lg shrink-0 group-hover:scale-110 transition-transform">{preset.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-200 truncate group-hover:text-purple-400 transition-colors">
                  {preset.titleKOR}
                </p>
                <p className="text-[10px] text-zinc-500 truncate mt-0.5">{preset.genre}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Topic/Story/Theme Input (기본 입력 - 필수) */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
            <span>곡의 주제 및 분위기 스토리 (기본 입력)</span>
            <span className="text-rose-500">*</span>
          </label>
          <span className="text-[10px] text-zinc-500">({userTheme.length}/400자)</span>
        </div>
        <textarea
          value={userTheme}
          onChange={(e) => setUserTheme(e.target.value.slice(0, 400))}
          required
          rows={3}
          maxLength={400}
          placeholder="예: 초여름 푸른 한강 둔치에 흘로 누워 느껴지는 시원한 바람과 아련함 (짧은 키워드만 적거나 한 줄만 적어도 AI가 정교하게 크로스 헤드하여 가공합니다.)"
          className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl p-3.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all resize-none leading-relaxed"
          id="user-theme-input"
        ></textarea>
      </div>

      {/* 2-B. Selective Lyric / Vibe option inputs (선택 입력 - 옵션) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
            <span>추가 가사 방향 및 작사 요구 (선택 옵션)</span>
          </label>
          <span className="text-[10px] text-zinc-500">({customDirections.length}/300자)</span>
        </div>
        
        {/* Quick select chips container */}
        <div className="flex flex-wrap gap-1.5 mb-2" id="lyric-direction-chips">
          {directionChips.map((chip, idx) => {
            const isSelected = customDirections.includes(chip.text);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(chip.text)}
                className={`text-[10px] rounded-lg px-2.5 py-1.5 border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-purple-900/30 border-purple-500 text-purple-200"
                    : "bg-zinc-950/60 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-300"
                }`}
              >
                {chip.label} {isSelected && "✓"}
              </button>
            );
          })}
        </div>

        <textarea
          value={customDirections}
          onChange={(e) => setCustomDirections(e.target.value.slice(0, 300))}
          rows={2}
          maxLength={300}
          placeholder="예: 후렴구 중독성 강하게, 이별 이야기, 감성적인 영어 랩 한 구절 포함 등"
          className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-all resize-none leading-relaxed"
          id="custom-directions-input"
        ></textarea>
      </div>

      {/* 3. Dropdowns Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Genre Modifier */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
            <Music className="w-3.5 h-3.5 text-zinc-500" />
            <span>장르 힌트</span>
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-xl p-2.5 outline-none focus:border-purple-500 transition-all cursor-pointer"
          >
            {GENRE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* BPM Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
            <FastForward className="w-3.5 h-3.5 text-zinc-500" />
            <span>BPM 느낌</span>
          </label>
          <select
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-xl p-2.5 outline-none focus:border-purple-500 transition-all cursor-pointer"
          >
            {BPM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Vocal Preferences */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-zinc-500" />
            <span>추천 보컬 스타일</span>
          </label>
          <select
            value={vocalType}
            onChange={(e) => setVocalType(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-xl p-2.5 outline-none focus:border-purple-500 transition-all cursor-pointer"
          >
            {VOCAL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Language choices */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-zinc-500" />
            <span>가사 생성 언어</span>
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-xl p-2.5 outline-none focus:border-purple-500 transition-all cursor-pointer"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Safety Notice Infobox */}
      <div className="p-3.5 bg-zinc-950/40 border border-zinc-800/60 rounded-xl text-xs text-zinc-400 space-y-1">
        <p className="font-semibold text-zinc-300">💡 저작권 및 우회 생성 안심 보호</p>
        <p className="leading-relaxed">
          본 도구는 특정 가수(예: 아이유, 방탄소년단, 뉴진스)의 음성을 복제하지 않으며, 저작권 필터를 회피하도록 순수 사운드 모델링 장르 및 악기 태그로 영문 프롬프트를 번역/작품화합니다.
        </p>
      </div>

      {/* Submit button with fancy style */}
      <button
        type="submit"
        disabled={isLoading || !userTheme.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl py-3 px-4 font-semibold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-purple-500/10 group cursor-pointer transition-all"
        id="submit-director-btn"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            <span>음악 디렉션 설계 중...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform" />
            <span>AI 음악 디렉션 & 가사 생성하기</span>
          </>
        )}
      </button>
    </form>
  );
}
