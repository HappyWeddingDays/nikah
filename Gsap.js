gsap.registerPlugin(ScrollTrigger);

// Fungsi pecah teks jadi huruf span
function splitTextToSpans(element) {
  const text = element.textContent;
  element.innerHTML = '';
  text.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.opacity = 1;
    element.appendChild(span);
  });
}

const targets = document.querySelectorAll('.explode');

targets.forEach(el => {
  splitTextToSpans(el);
  const spans = el.querySelectorAll('span');

  // Simpan posisi awal
  spans.forEach(span => {
    gsap.set(span, { x: 0, y: 0, rotate: 0, opacity: 1 });
  });

  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    end: "top 50%",
    toggleActions: "play reverse play reverse", // agar bisa balik saat scroll naik
    onEnter: () => {
      spans.forEach(span => {
        gsap.to(span, {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-150, -300),
          rotate: gsap.utils.random(-360, 360),
          opacity: 0,
          duration: 1.2,
          ease: "power4.out"
        });
      });
    },
    onLeaveBack: () => {
      spans.forEach(span => {
        gsap.to(span, {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut"
        });
      });
    }
  });
});
