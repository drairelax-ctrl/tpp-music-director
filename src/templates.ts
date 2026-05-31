import { SongPreset } from "./types";

export const MUSIC_PRESETS: SongPreset[] = [
  {
    id: "rnb-rainy",
    emoji: "☔",
    titleKOR: "빗소리와 센치한 R&B",
    themeKOR: "외로운 비 오는 밤, 창문을 울리는 빗소리를 들으며 헤어진 연인을 그리워하는 차분하고 감성적인 노래",
    genre: "R&B / Soul Ballad",
    bpm: "Slow (around 75 BPM)",
    vocalType: "Soft & Airy Female Vocal",
    language: "Korean"
  },
  {
    id: "synthwave-midnight",
    emoji: "🚗",
    titleKOR: "새벽 2시 도시 질주",
    themeKOR: "도심의 네온사인 아래를 끝없이 달리는 해방감과 고독. 아날로그 신디사이저가 주도하는 복고풍 사운드",
    genre: "Retro Synthwave / Outrun",
    bpm: "Upbeat & Fast (115-120 BPM)",
    vocalType: "Whispering Male Vocal with Chorus Effect",
    language: "Korean"
  },
  {
    id: "acoustic-spring",
    emoji: "🌸",
    titleKOR: "봄 고백 송",
    themeKOR: "따스한 햇살 아래 수줍게 건네는 첫사랑 고백. 통기타 선율과 맑은 벨소리가 어우러진 음악",
    genre: "Acoustic Pop / Indie Folk",
    bpm: "Warm Medium (around 90 BPM)",
    vocalType: "Sweet & Clear Duet / Warm Acoustic Male",
    language: "Korean"
  },
  {
    id: "dreampop-space",
    emoji: "🌌",
    titleKOR: "우주를 유영하는 드림팝",
    themeKOR: "차가운 중력을 벗어나 미지의 은하수를 흘러가는 신비로움. 넓은 공간감과 딜레이 가득한 일렉기타 사운드",
    genre: "Shoegaze / Dream Pop",
    bpm: "Moderate (around 85 BPM)",
    vocalType: "Ethereal & Reverb-drenched Female Vocals",
    language: "English"
  },
  {
    id: "citypop-night",
    emoji: "🌃",
    titleKOR: "레트로 시티팝",
    themeKOR: "화려한 도심 속 쓸쓸함을 숨기고 춤추는 트렌디함. 세련된 베이스 라인과 미디엄 템포 그루브",
    genre: "80s City Pop / Retro Pop",
    bpm: "Warm Medium (around 110 BPM)",
    vocalType: "Upbeat & Breezy Female Vocal",
    language: "Korean"
  },
  {
    id: "rock-punk",
    emoji: "⚡",
    titleKOR: "청춘 하이틴 락",
    themeKOR: "세상의 시선을 벗어나 주저하지 않는 질주. 폭발적인 드럼과 디스토션 기타가 만드는 경쾌하고 시원한 펑크",
    genre: "Pop Punk / J-Rock Style",
    bpm: "High Energy (above 135 BPM)",
    vocalType: "Bright & Passionate Female Vocal",
    language: "Korean"
  }
];

export const GENRE_OPTIONS = [
  "Auto-detect",
  "Pop Ballad",
  "R&B / Soul",
  "Indie Folk / Acoustic",
  "Retro Synthwave",
  "City Pop",
  "Pop Punk / Rock",
  "Hip-Hop / Chill Trap",
  "Lo-Fi / Chillhop",
  "EDM / Future Bass",
  "Cinematic / Orchestral"
];

export const BPM_OPTIONS = [
  "Auto-detect",
  "Slow & Deep (60-80 BPM)",
  "Warm Medium (85-105 BPM)",
  "Upbeat & Fast (110-125 BPM)",
  "High Energy (130+ BPM)"
];

export const VOCAL_OPTIONS = [
  "Auto-detect",
  "Soft & Airy Female Vocals",
  "Clear & High-tone Female Vocals",
  "Deep & Warm Male Vocals",
  "Husky & Soulful Male Vocals",
  "Melodic Duet (Male & Female)",
  "Ethereal Shimmering Choir / Backing Vocals",
  "No Vocals (Instrumental)"
];

export const LANGUAGE_OPTIONS = [
  "Korean",
  "English",
  "Japanese",
  "Spanish",
  "Korean & English Mixed"
];
