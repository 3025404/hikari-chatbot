// api/gemini.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ message: 'GEMINI_API_KEY is not set.' });
  }

  const { userInput } = req.body;

  const prompt = `次の形式で返答してください：

感情: [喜/怒/哀/楽]
応答: [返答本文]

ユーザーの発言: ${userInput}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=
      ${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    console.log(data);
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || "応答の取得に失敗しました。";

    res.status(200).json({ content });
  } catch (error) {
    console.error("Gemini APIエラー:", error);
    res.status(500).json({ content: "サーバーエラーが発生しました。" });
  }
}
