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