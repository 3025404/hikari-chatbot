import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { userInput } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたは日本語で会話をする感情豊かなアシスタントです。感情と応答を含めて返答してください。"
        },
        { role: "user", content: userInput }
      ]
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("APIエラー:", error);
    return NextResponse.json({ content: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
