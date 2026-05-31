export interface SongPreset {
  id: string;
  emoji: string;
  titleKOR: string;
  themeKOR: string;
  genre: string;
  bpm: string;
  vocalType: string;
  language: string;
}

export interface LyricsStyleGuide {
  direction: string;
  coreEmotion: string;
  recommendedThemes: string[];
  recommendedExpressionStyles: string[];
}

export interface GeneratedSongResponse {
  songTitle: string;
  genre: string;
  coreGenre: string;
  subGenres: string[];
  recommendedBPM: string;
  emotionalCurve: string;
  emotions: string[];
  atmosphere: string;
  instruments: string[];
  vocalStyle: string;
  sunoKeywords: string[];
  sunoPrompt: string;
  lyricsStyleGuide: LyricsStyleGuide;
  lyrics: string;
  optionalAdvancedPrompt: string;
}
