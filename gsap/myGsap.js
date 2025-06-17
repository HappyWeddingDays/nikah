gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function() {
      // Untuk typing-text1
      document.querySelectorAll(".typing-text1").forEach((el) => {
        const paragraph = el.querySelector("p");
        const originalText = paragraph.innerHTML;
        paragraph.innerHTML = "";

        let hasTyped = false;

        ScrollTrigger.create({
          trigger: "#typing-text-location", // Elemen pemicu
          start: "bottom bottom",
          once: false,
          toggleActions: "play none none reverse",
          //scrub: true,
          markers: true,
          onEnter: () => {
            if (hasTyped) return;
            hasTyped = true;

            let i = 0;
            function typeChar() {
              if (i < originalText.length) {
                paragraph.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeChar, 10); // Kecepatan ketik
              }
            }

            typeChar();
          },
        });
      });

      // Untuk typing-text2
      document.querySelectorAll(".typing-text2").forEach((el) => {
        const paragraph = el.querySelector("p");
        const originalText = paragraph.innerHTML;
        paragraph.innerHTML = "";

        let hasTyped = false;

        ScrollTrigger.create({
          trigger: "#typing-text-akad-nikah", // Elemen pemicu
          start: "bottom bottom",
          once: false,
          toggleActions: "play none none reverse",
          markers: true,
          onEnter: () => {
            if (hasTyped) return;
            hasTyped = true;

            let i = 0;
            function typeChar() {
              if (i < originalText.length) {
                paragraph.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeChar, 10);
              }
            }

            typeChar();
          },
        });
      });

      // Untuk typing-text2
      document.querySelectorAll(".typing-text3").forEach((el) => {
        const paragraph = el.querySelector("p");
        const originalText = paragraph.innerHTML;
        paragraph.innerHTML = "";

        let hasTyped = false;

        ScrollTrigger.create({
          trigger: "#typing-text-resepsi", // Elemen pemicu
          start: "bottom bottom",
          once: false,
          toggleActions: "play none none reverse",
          markers: true,
          onEnter: () => {
            if (hasTyped) return;
            hasTyped = true;

            let i = 0;
            function typeChar() {
              if (i < originalText.length) {
                paragraph.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeChar, 10);
              }
            }

            typeChar();
          },
        });
      });
    },
  });
});

//Efek keluar masukk

ScrollTrigger.matchMedia({
  // Layar besar (misal > 768px)
  "(min-width: 769px)": function() {
    gsap.utils.toArray(".slide-right1").forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 1 },
        {
          x: 300,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: "#resepsi", // 🔹 Trigger eksternal
            start: "bottom bottom",
            toggleActions: "play reverse play reverse",
            //markers: true,
          },
        },
      );
    });

    gsap.utils.toArray(".slide-left1").forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 1 },
        {
          x: -300,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: "#pakaian",
            start: "bottom bottom",
            toggleActions: "play reverse play reverse",
            //markers: true,
          },
        },
      );
    });

    gsap.utils.toArray(".slide-right2").forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 1 },
        {
          x: 300,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: "#cermin",
            start: "bottom bottom",
            toggleActions: "play reverse play reverse",
            // markers: true,
          },
        },
      );
    });
  },

  // Layar kecil (<= 768px)
  "(max-width: 768px)": function() {
    gsap.utils.toArray(".slide-right1").forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 1 },
        {
          x: -300,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: "#prioritas-layar-kecil", // 🔸 Trigger di dalam section sendiri
            start: "bottom bottom",
            toggleActions: "play reverse play reverse",
            //markers: true,
          },
        },
      );
    });

    gsap.utils.toArray(".slide-left1").forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 1 },
        {
          x: 300,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: "#pakaian-layar-kecil",
            start: "bottom bottom",
            toggleActions: "play reverse play reverse",
            //markers: true,
          },
        },
      );
    });

    gsap.utils.toArray(".slide-right2").forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 1 },
        {
          x: -300,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: "#cermin-layar-kecil",
            start: "bottom bottom",
            toggleActions: "play reverse play reverse",
            // markers: true,
          },
        },
      );
    });
  },
});

//efek menjauh ke dalam
/* gsap.to(".deep-in", {
  start: "top top",
  scale: 0.6,
  opacity: 0,
  filter: "blur(5px)",
  duration: 1.2,
  ease: "expo.inOut",
}); */

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
        //markers: true,
      },
    },
  );
});
