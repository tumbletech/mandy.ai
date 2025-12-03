import { startRecording, stopRecording } from "./voice.js";
import { sendToAgent } from "./api.js";

const micBtn = document.getElementById("micBtn");
const resetBtn = document.getElementById("resetBtn");
const chat = document.getElementById("chat");
const status = document.getElementById("status");
const wave = document.getElementById("wave");

let isRecording = false;

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

micBtn.onmousedown = async () => {
  isRecording = true;
  status.textContent = "Listening";
  status.className = "status listening";
  wave.classList.remove("hidden");
  await startRecording();
};

micBtn.onmouseup = async () => {
  if (!isRecording) return;
  isRecording = false;

  status.textContent = "Thinking...";
  wave.classList.add("hidden");

  const transcript = await stopRecording();
  addMessage(transcript, "user");

  const reply = await sendToAgent(transcript);
  addMessage(reply, "agent");

  // agent TTS
  const utter = new SpeechSynthesisUtterance(reply);
  speechSynthesis.speak(utter);

  status.textContent = "Online";
  status.className = "status online";
};

resetBtn.onclick = () => {
  chat.innerHTML = "";
};
