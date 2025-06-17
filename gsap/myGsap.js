gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".typing-text").forEach((el) => {
    const paragraph = el.querySelector("p");
    const originalText = paragraph.innerHTML;
    paragraph.innerHTML = "";

    let hasTyped = false;

    ScrollTrigger.create({
      trigger: el,
      start: "top 40%",
      end: "bottom center",
      once: false, // hanya sekali
      markers: true,
      toggleActions: "play none none reverse",
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

 // Efek scroll reveal
  gsap.utils.toArray(".reveal").forEach((elem) => {
    gsap.fromTo(
      elem,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elem,
          start: "center center",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
