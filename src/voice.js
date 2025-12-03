let recognition;

export function startRecording() {
  return new Promise((resolve) => {
    if (!recognition) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
    }
    recognition.start();
    resolve();
  });
}

export function stopRecording() {
  return new Promise((resolve) => {
    recognition.onresult = (event) => {
      resolve(event.results[0][0].transcript);
    };
    recognition.stop();
  });
}
