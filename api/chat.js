import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// OpenAIインスタンスを作成（Vercelの環境変数からAPIキーを読み込む）
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// POSTリクエストに対応
export async function POST(req) {
  try {
    const { userInput } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたは日本語で会話をする感情豊かな女性アシスタントです。各返答は以下の形式で出力してください：\n\n感情: [喜/怒/哀/楽]\n応答: [返答本文]"
        },
        {
          role: "user",
          content: userInput
        }
      ]
    });

    const reply = response.choices[0].message;
    return NextResponse.json(reply);
  } catch (error) {
    console.error("APIエラー:", error);
    return NextResponse.json({ content: "エラーが発生しました。" }, { status: 500 });
  }
}
