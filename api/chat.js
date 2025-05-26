/*
// chat.js（修正版）
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { userInput } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは日本語で会話をする感情豊かなアシスタントです。各返答は以下の形式で出力してください：\n\n感情: [喜/怒/哀/楽]\n応答: [返答本文]'
        },
        { role: 'user', content: userInput }
      ]
    });

    res.status(200).json(response.choices[0].message);
  } catch (error) {
    console.error('OpenAIエラー:', error);
    res.status(500).json({ content: 'サーバーエラーが発生しました。' });
  }
}
*/

// api/gemini.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const { userInput } = req.body;

  const prompt = `次の形式で返答してください：

感情: [喜/怒/哀/楽]
応答: [返答本文]

ユーザーの発言: ${userInput}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyAnZpIz3f32l9gS_35vN5fPkm8D6LTNmRo}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || "応答の取得に失敗しました。";

    res.status(200).json({ content });
  } catch (error) {
    console.error("Gemini APIエラー:", error);
    res.status(500).json({ content: "サーバーエラーが発生しました。" });
  }
}
