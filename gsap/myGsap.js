gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".typing-text").forEach((el) => {
    const paragraph = el.querySelector("p");
    const originalText = paragraph.innerHTML;
    paragraph.innerHTML = "";

    let hasTyped = false;

    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      once: false, // hanya sekali
      markers: false,
      onEnter: () => {
        if (hasTyped) return;
        hasTyped = true;

        let i = 0;
        function typeChar() {
          if (i < originalText.length) {
            paragraph.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeChar, 10); // atur kecepatan ketik
          }
        }

        typeChar();
      },
    });
  });
});
