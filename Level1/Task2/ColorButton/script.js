document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('colorButton');

  function random255() { return Math.floor(Math.random() * 256); }

  function setButtonColor(r, g, b) {
    const rgb = `rgb(${r}, ${g}, ${b})`;
    btn.style.backgroundColor = rgb;

    // Auto-contrast for text (simple luminance check)
    const luminance = 0.2126*r + 0.7152*g + 0.0722*b;
    btn.style.color = luminance > 140 ? '#0f0f10' : '#ffffff';
  }

  btn.addEventListener('click', () => {
    setButtonColor(random255(), random255(), random255());
  });

  // Set an initial pleasant color
  setButtonColor(255, 255, 255);
});