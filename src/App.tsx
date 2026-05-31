import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MusicForm from "./components/MusicForm";
import ResultSection from "./components/ResultSection";
import AwaitingState from "./components/AwaitingState";
import { SongPreset, GeneratedSongResponse } from "./types";
import { Sparkles, Trash2, Library, Disc, ArrowRight, Zap, Check, AlertCircle } from "lucide-react";

// Local storage key for history
const STORAGE_KEY = "ai_music_prompt_history_v2";

export default function App() {
  // Input states
  const [userTheme, setUserTheme] = useState<string>("");
  const [customDirections, setCustomDirections] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("Auto-detect");
  const [bpm, setBpm] = useState<string>("Auto-detect");
  const [vocalType, setVocalType] = useState<string>("Auto-detect");
  const [language, setLanguage] = useState<string>("Korean");

  // App running states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GeneratedSongResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Connection checking status
  const [apiConnected, setApiConnected] = useState<boolean>(true);
  const [checkingApi, setCheckingApi] = useState<boolean>(false);

  // History states
  const [history, setHistory] = useState<GeneratedSongResponse[]>([]);

  // Check backend server connection on mount
  useEffect(() => {
    setCheckingApi(true);
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("Offline");
        return res.json();
      })
      .then((data) => {
        setApiConnected(data.apiKeyConfigured);
      })
      .catch((err) => {
        console.error("Health check failed:", err);
        setApiConnected(false);
      })
      .finally(() => {
        setCheckingApi(false);
      });

    // Load history from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read history from localStorage:", e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (item: GeneratedSongResponse) => {
    // Prevent duplicates by title
    const filtered = history.filter((h) => h.songTitle.toLowerCase() !== item.songTitle.toLowerCase());
    const updated = [item, ...filtered].slice(0, 15); // Limit to 15 items
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear history:", e);
    }
  };

  // Handler to apply preset
  const handleApplyPreset = (preset: SongPreset) => {
    setUserTheme(preset.themeKOR);
    setSelectedGenre(preset.genre);
    setBpm(preset.bpm);
    setVocalType(preset.vocalType);
    setLanguage(preset.language);
  };

  // Copy helper
  const handleCopyText = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTheme.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userTheme,
          customDirections,
          selectedGenre,
          bpm,
          vocalType,
          language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "프롬프트 생성 오류가 발생했습니다.");
      }

      const data: GeneratedSongResponse = await response.json();
      setResult(data);
      saveToHistory(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "서버 통신 중 장애가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset helper
  const handleReset = () => {
    setUserTheme("");
    setCustomDirections("");
    setSelectedGenre("Auto-detect");
    setBpm("Auto-detect");
    setVocalType("Auto-detect");
    setLanguage("Korean");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 flex flex-col selection:bg-purple-600/30 selection:text-white" id="main-app-container">
      {/* Header */}
      <Header 
        onReset={handleReset} 
        apiConnected={apiConnected} 
        checkingApi={checkingApi} 
      />

      {/* Main Layout Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Setup Panel (5 Cols) */}
        <section className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 md:p-6 space-y-6" id="setup-panel">
          <div className="border-b border-zinc-800 pb-4">
            <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: "3s" }} />
              디렉션 설계 보드
            </h2>
            <p className="text-xs text-zinc-400 mt-1">상상하시는 노래의 무드와 가사 컨셉트를 설정합니다.</p>
          </div>

          <MusicForm
            userTheme={userTheme}
            setUserTheme={setUserTheme}
            customDirections={customDirections}
            setCustomDirections={setCustomDirections}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            bpm={bpm}
            setBpm={setBpm}
            vocalType={vocalType}
            setVocalType={setVocalType}
            language={language}
            setLanguage={setLanguage}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onApplyPreset={handleApplyPreset}
          />
        </section>

        {/* Right Side: Results & Guidance Display Panel (7 Cols) */}
        <section className="lg:col-span-7 space-y-6" id="display-panel">
          {/* Warn if API Key is not set */}
          {!apiConnected && !checkingApi && (
            <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl text-xs text-rose-300 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">Gemini API Key missing or server unreachable</p>
                <p className="text-zinc-400 leading-relaxed">
                  우측 상단 톱니바퀴 ⚙️ (Settings) / Secrets 패널에서 <code className="text-rose-200 font-mono">GEMINI_API_KEY</code>를 등록해야 전송 인가가 가능합니다. 로컬 데모 테스트 시, 지정된 데모 형태로 안내될 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-amber-950/40 border border-amber-900/60 rounded-xl text-xs text-amber-300 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">처리 중 에러 발생</p>
                <p className="text-zinc-400 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-center p-12 bg-zinc-900/20 rounded-2xl border border-zinc-800/80 min-h-[400px]">
              {/* Pulsating Visual Waveform representing audio generation */}
              <div className="flex items-end justify-center gap-1.5 h-12 mb-6" id="loading-waveform">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => {
                  const delay = (bar * 0.15).toFixed(2);
                  const heights = ["h-3", "h-8", "h-12", "h-6", "h-10", "h-4"];
                  const selectedHeight = heights[bar % heights.length];
                  return (
                    <div
                      key={bar}
                      className={`w-1.5 ${selectedHeight} bg-gradient-to-t from-purple-600 to-pink-500 rounded-full animate-bounce`}
                      style={{ animationDelay: `${delay}s`, animationDuration: "1s" }}
                    ></div>
                  );
                })}
              </div>

              <h3 className="font-display font-semibold text-base text-zinc-100 flex items-center gap-2">
                전문 디렉터 AI가 곡의 성격을 분석 중입니다...
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mt-2 leading-relaxed">
                가사의 감정선을 다듬고, 120자 미만의 Suno 전용 프롬프트 및 악기 태그를 정형화하고 있습니다. 약 10초 가량 소요됩니다.
              </p>
            </div>
          ) : result ? (
            <ResultSection 
              data={result} 
              copiedField={copiedField} 
              onCopyText={handleCopyText} 
            />
          ) : (
            <AwaitingState onSelectPreset={(val) => {
              setUserTheme(val);
              setSelectedGenre("Auto-detect");
              setBpm("Auto-detect");
              setVocalType("Auto-detect");
            }} />
          )}

          {/* Quick History List representing professional workflow log */}
          {history.length > 0 && (
            <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-5" id="history-box">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Library className="w-3.5 h-3.5 text-zinc-400" />
                  최근 설계된 음악 목록 ({history.length})
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-zinc-500 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                  title="히스토리 전체 삭제"
                >
                  <Trash2 className="w-3 h-3" />
                  기록 삭제
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1" id="history-items">
                {history.map((hist, i) => (
                  <button
                    key={i}
                    onClick={() => setResult(hist)}
                    className={`flex items-center justify-between p-3 rounded-lg text-left transition-all text-xs border ${
                      result && result.songTitle === hist.songTitle
                        ? "bg-purple-950/30 border-purple-500 text-purple-200"
                        : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900/90 text-zinc-300"
                    }`}
                  >
                    <div className="min-w-0 flex items-center gap-2">
                      <Disc className={`w-3.5 h-3.5 text-purple-400 shrink-0 ${result && result.songTitle === hist.songTitle ? "animate-spin" : ""}`} style={{ animationDuration: "4s" }} />
                      <div className="truncate">
                        <p className="font-semibold truncate text-zinc-200">{hist.songTitle}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{hist.genre}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Decorative footer */}
      <footer className="py-6 px-4 text-center border-t border-zinc-900 mt-auto text-xs text-zinc-600" id="app-footer">
        <p>© 2026 AI Music Prompt Director. Designed for professional songwriters & Suno AI producers.</p>
      </footer>
    </div>
  );
}
