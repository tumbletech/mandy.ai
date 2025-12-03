const WEBHOOK_URL = "https://your-n8n-url/webhook/mandy-agent";

export async function sendToAgent(text) {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await res.json();
  return data.reply ?? "No response from agent.";
}
