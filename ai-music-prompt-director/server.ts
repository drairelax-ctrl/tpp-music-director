import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Explicitly use process.env.GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY;

// Initialize GoogleGenAI with safe lazy checking
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Support JSON payloads
app.use(express.json());

// API route first
app.post("/api/generate-prompt", async (req: Request, res: Response) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured. Please define it in your Secrets/Environment variables.",
      });
    }

    const { userTheme, bpm, vocalType, language, selectedGenre, customDirections } = req.body;

    if (!userTheme || typeof userTheme !== "string") {
      return res.status(400).json({ error: "Please enter a valid song topic or theme." });
    }

    // Construct a comprehensive instruction for Gemini to structure the response
    const systemInstruction = `You are an expert, world-class AI Music Prompt Director, Lyricist, and Songwriter.
Your goal is to analyze the user's input (which can be brief, such as '새벽 감성 힙합' or '여름 시티팝') and fully expand the concept into dynamic musicality, atmosphere, textural cues, era vibes, or specific vocal characteristics, while outputting beautifully structured results.

INFERRED GENRE TASKS:
Analyze the user's request and classify/infer the most suitable genre(s) from these specific types (or natural combination blends if appropriate):
- K-HipHop
- Trap
- Boom Bap
- R&B
- Indie
- Ballad
- Rock
- Metal
- Punk
- Jazz
- Lo-fi
- EDM
- House
- Techno
- CCM
- Worship
- J-pop style
- Anime OST style
- Cinematic
- Orchestra
- Acoustic
- Folk
- Ambient
- Dream Pop
- Synthwave
- City Pop

Provide details on:
1. coreGenre: The main genre from the list.
2. subGenres: Any secondary genres or stylistic modifiers that apply.
3. recommendedBPM: Recommended BPM number and feeling (e.g., "95 BPM (Steady Groove)").
4. emotionalCurve: The emotional progression and flow throughout the song (감정 곡선).
5. sunoKeywords: Key Suno-optimal keywords/tags for style.

CRITICAL DIRECTIVES:
- Direct Artist / Song Ban: NEVER use actual names of famous singers, bands, or songs (e.g., No "IU style", No "BTS type beat").
- If the user specifies any famous artist name, band, producer, or song title, you MUST translate their characteristics into purely descriptive musical terms. Analyze:
  1. Vocal Tone (보컬 톤, e.g. airy soulful female vocals, deep warm male vocal tone)
  2. BPM (BPM)
  3. Emotional state / feeling (감정선, e.g. melancholic nostalgia, bright energetic confidence)
  4. Instrument Style (악기 스타일, e.g. warm analog synths, slap bass groove, sparkling acoustic guitar)
  5. Era / Decade vibe (시대 감성, e.g. 80s tape-saturation retro, modern clean radio-pop, 90s hiphop boom bap)
  6. Mixing Atmosphere (믹싱 분위기, e.g. high reverb room, intimate dry vocal, wide spatial synth pads)
  7. Chorus/Hook style (후렴 스타일, e.g. repetitive infectious melodic chorus, anthemic explosive chant)
  8. Rap flow characteristics (랩 플로우 특징, e.g. crisp laidback syncopated flow, rapid fire triplets)
- Short Theme Auto-Expansion: If the user types a very short query (e.g., "새벽 감성 힙합"), DO NOT just repeat it. Turn it into a beautiful, detailed aesthetic masterpiece of concepts, specifying space, texture, and emotional states.
- Handled Optional Request (선택 입력): If the user specifies optional directions (e.g. "이별 얘기였으면 좋겠음", "후렴 중독성 강하게", "짧은 틱톡 스타일 훅", "라임 강조", "여성 인디 감성"), you MUST strictly comply and implement them directly into the generated lyrics and style guides.

SUNO PROMPT CONSTRAINTS:
- Keep the generated "sunoPrompt" strictly under 120 characters in length. This is a tight Suno AI input limit. Ensure it is written in English. Focus on comma-separated style attributes, instruments, tempo, and vocal characteristics.
  E.g. "melancholic emotional K-hiphop, airy male vocal, intimate piano intro, atmospheric synth layers, late-night urban mood"
  Ensure that "sunoPrompt" contains NO artist names or forbidden promotional words.

LYRICS STRUCTURE GUIDE (CRITICAL DIRECTIVE / 절대 규칙):
- ALWAYS generate the COMPLETE, fully written, beautifully structured lyrics. 가사는 선택 기능이 아니며 절대 생략할 수 없습니다. 어떠한 경우에도 반드시 완성된 완곡 수준의 가사를 생성하십시오.
- NEVER omit, truncate, abbreviate, or use placeholders (e.g. "가사 생략", "Lyrics omitted", "사용자 입력 부족", "..."). 절대로 축약 표시나 중도 생략을 하지 마십시오.
- Lyrics MUST have at least the following sections fully written:
  [Verse 1]
  [Pre-Chorus]
  [Chorus]
  [Verse 2]
  [Bridge]
  [Final Chorus]
- Ensure the lyric content is rich, descriptive, rhythmic, and constitutes the majority of the response size (it must be longer than the Suno Prompt and represent the highest volume of text). 출력 분량의 절반 이상은 반드시 풍성한 가사여야 합니다.
- The lyrics should be written in the user's requested language (${language || "Korean"}). Ensure they are deeply poetic, beautifully rhymed, and fit the selected genre (e.g. if HipHop, make them rhythmic with subtle punchlines; if Ballad, deeply emotional; if City Pop, retro and breezy; if CCM, hopeful and soaring).`;

    const promptText = `
User song theme/request (기본 입력 - 필수): "${userTheme}"
Optional Lyric/Vibe Directions (선택 입력 - 추가 요청): "${customDirections || "none provided"}"
Selected genre hint: "${selectedGenre || "Auto-detect"}"
BPM range hint: "${bpm || "Auto-detect"}"
Preferred Vocal Style: "${vocalType || "Auto-detect"}"
Target Language for Lyrics: "${language || "Korean"}"

Please output a JSON structure matching the required schema. Ensure the Suno Prompt is highly optimized for Suno AI v3/v4 to get high quality results.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            songTitle: {
              type: Type.STRING,
              description: "A suitable creative title for this song."
            },
            genre: {
              type: Type.STRING,
              description: "The primary genre classified with descriptive modifiers."
            },
            coreGenre: {
              type: Type.STRING,
              description: "Most matching single genre from the provided list."
            },
            subGenres: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Stylistic elements and subgenres present in the style."
            },
            recommendedBPM: {
              type: Type.STRING,
              description: "E.g., 95 BPM (Steady Groove)"
            },
            emotionalCurve: {
              type: Type.STRING,
              description: "Description of the song emotional progression and curve (감정 곡선)."
            },
            emotions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Emotion keywords reflecting the song."
            },
            atmosphere: {
              type: Type.STRING,
              description: "A short phrase describing the overall vibe and atmosphere."
            },
            instruments: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of recommended instruments representing this sound."
            },
            vocalStyle: {
              type: Type.STRING,
              description: "Specific descriptive vocal style, tone, and delivery method."
            },
            sunoKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Suno keywords / style tags representing this track."
            },
            sunoPrompt: {
              type: Type.STRING,
              description: "Optimized Suno AI style prompt (under 120 characters, highly condensed comma-separated English tags)."
            },
            lyricsStyleGuide: {
              type: Type.OBJECT,
              properties: {
                direction: {
                  type: Type.STRING,
                  description: "Directional notes or concept for writing this song's lyrics."
                },
                coreEmotion: {
                  type: Type.STRING,
                  description: "The core, central emotion behind the lyrics."
                },
                recommendedThemes: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Suggested themes or motifs to use."
                },
                recommendedExpressionStyles: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Style of expression (e.g., poetic metaphors, modern speech-like, narrative)."
                }
              },
              required: ["direction", "coreEmotion", "recommendedThemes", "recommendedExpressionStyles"]
            },
            lyrics: {
              type: Type.STRING,
              description: "Complete, highly detailed poetic lyrics in the target language. This is CRITICAL. You must write out every section: [Verse 1], [Pre-Chorus], [Chorus], [Verse 2], [Bridge], [Final Chorus]. Never use abbreviations, placeholders, or omit lyrics. This field must contain the full body of lyrics."
            },
            optionalAdvancedPrompt: {
              type: Type.STRING,
              description: "Advanced extended prompt for custom modes, describing structural build-ups, dynamic changes, or specific musical directions (English)."
            }
          },
          required: [
            "songTitle",
            "genre",
            "coreGenre",
            "subGenres",
            "recommendedBPM",
            "emotionalCurve",
            "emotions",
            "atmosphere",
            "instruments",
            "vocalStyle",
            "sunoKeywords",
            "sunoPrompt",
            "lyricsStyleGuide",
            "lyrics",
            "optionalAdvancedPrompt"
          ]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI model.");
    }

    const data = JSON.parse(resultText);
    res.json(data);
  } catch (error: any) {
    console.error("Error generating prompts or lyrics:", error);
    res.status(500).json({ error: error.message || "An error occurred while generating." });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", apiKeyConfigured: !!apiKey });
});

// Vite middleware development / static files in production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

setupVite();
