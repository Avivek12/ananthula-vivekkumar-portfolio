import typingSound from "../assets/sounds/keyboard-typing-sound-effect.mp3";

export function initTyping() {
  const element = document.querySelector(".typing");
  if (!element) return;

 const textArray = [
  "Building scalable full-stack apps with React & Node ",
  "Designing robust APIs & efficient database architectures 💡"
];


  let txtIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = "";

  // Play sound once at start
  const typingAudio = new Audio(typingSound);
  typingAudio.volume = 0.3;

  let hasPlayed = false; // 🔑 ensures sound plays only once

  const typingSpeed = 80;
  const deletingSpeed = 120;
  const delayBetweenTexts = 1000;

  function type() {
    const fullText = textArray[txtIndex];

    if (isDeleting) {
      charIndex--;
      currentText = fullText.substring(0, charIndex);
    } else {
      charIndex++;
      currentText = fullText.substring(0, charIndex);
    }

    element.textContent = currentText;

    // ✅ Play sound only once when typing starts
    if (!hasPlayed) {
      typingAudio.play().catch(() => {});
      hasPlayed = true;
    }

    if (!isDeleting && charIndex === fullText.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, delayBetweenTexts);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      txtIndex = (txtIndex + 1) % textArray.length;
      type();
    } else {
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }
  }

  type();
}
