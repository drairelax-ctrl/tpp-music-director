import React from "react";
import { GeneratedSongResponse } from "../types";
import { History, Eye, Trash2, Calendar } from "lucide-react";

interface SongHistoryProps {
  history: Array<{ timestamp: string; data: GeneratedSongResponse }>;
  onSelectSong: (data: GeneratedSongResponse) => void;
  onDeleteSong: (idx: number, e: React.MouseEvent) => void;
  onClearAll: () => void;
  currentSongTitle?: string;
}

export default function SongHistory({
  history,
  onSelectSong,
  onDeleteSong,
  onClearAll,
  currentSongTitle,
}: SongHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="p-5 text-center text-zinc-500 text-xs bg-zinc-900/30 border border-zinc-900/60 rounded-xl" id="empty-history-visual">
        <History className="w-4 h-4 mx-auto mb-2 text-zinc-600 animate-pulse" />
        생성 기록이 없습니다. 새로운 곡을 조합해 보세요!
      </div>
    );
  }

  return (
    <div className="space-y-3.5" id="history-container">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-zinc-500" />
          <span>최근 디렉션 저장소 ({history.length}개)</span>
        </h3>
        <button
          onClick={onClearAll}
          className="text-[10px] text-zinc-500 hover:text-zinc-300 underline cursor-pointer"
        >
          기록 전체 삭제
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1" id="history-list">
        {history.map((record, index) => {
          const isCurrent = record.data.songTitle === currentSongTitle;
          const formattedDate = new Date(record.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={index}
              onClick={() => onSelectSong(record.data)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-zinc-900/80 cursor-pointer group select-none text-left ${
                isCurrent 
                  ? "bg-purple-950/20 border-purple-500/50" 
                  : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              <div className="min-w-0 pr-2">
                <p className="text-xs font-semibold text-zinc-200 truncate group-hover:text-purple-400 transition-colors">
                  {record.data.songTitle}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-zinc-500 font-mono italic">{record.data.genre.split("/")[0]}</span>
                  <span className="text-[9px] text-zinc-600">•</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  title="자세히 보기"
                  className="p-1 px-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors text-xs"
                >
                  <Eye className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  title="삭제"
                  onClick={(e) => onDeleteSong(index, e)}
                  className="p-1 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
