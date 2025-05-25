chatSend.addEventListener('click', async () => {
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'user-message';
  const userBubble = document.createElement('div');
  userBubble.className = 'message-bubble user-bubble';
  userBubble.textContent = userInput;
  userMsg.appendChild(userBubble);
  chatLog.appendChild(userMsg);
  chatInput.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput })
    });

    const data = await response.json();
    if (data && data.content) {
      const parsed = parseGPTResponse(data.content);
      addBotMessage(parsed.reply, parsed.emotion);
    } else {
      addBotMessage("申し訳ありません、応答できませんでした。", "哀");
    }
  } catch (error) {
    addBotMessage("エラーが発生しました。しばらくしてからお試しください。", "哀");
  }
});
