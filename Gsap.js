gsap.registerPlugin(ScrollTrigger);

// Fungsi pecah teks menjadi span huruf-huruf
function splitTextToSpans(element) {
  const text = element.textContent;
  element.innerHTML = ''; // Kosongkan isi asli

  text.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === " " ? "\u00A0" : char; // Gunakan non-breaking space
    span.style.display = 'inline-block';
    span.style.opacity = 1;
    element.appendChild(span);
  });
} 

// Ambil semua elemen dengan class explode
const targets = document.querySelectorAll('.typing-explode');

targets.forEach(el => {
  splitTextToSpans(el); // Pisahkan huruf ke span
  const spans = el.querySelectorAll('span');
  const wrapper = el.closest('.box') || el; // Gunakan pembungkus jika ada

  // Set posisi awal
  gsap.set(spans, { x: 0, y: 0, rotate: 0, opacity: 1 });

  // ScrollTrigger
  ScrollTrigger.create({
    trigger: wrapper,
    start: "bottom 50%",         // Efek dimulai saat pembungkus masuk 60% viewport
    end: "top 0%",
    markers: true,
    toggleActions: "play reverse play reverse",
    
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

/*

  gsap.registerPlugin(ScrollTrigger);

  const element = document.querySelector('.typing-explode');
  const originalText = element.textContent;
  const duration = 4000;
  const interval = duration / originalText.length;

  element.textContent = ''; // Kosongkan untuk efek ketik

  // Efek ketikan saat scroll
  ScrollTrigger.create({
    trigger: element,
    start: "bottom 50%",
    once: false,
    onEnter: () => {
      let index = 0;
      const typing = setInterval(() => {
        if (index < originalText.length) {
          element.textContent += originalText[index];
          index++;
        } else {
          clearInterval(typing);
          setTimeout(() => {
            explodeInit(); // Jalankan efek meledak
          }, 200);
        }
      }, interval);
    }
  });

  // Fungsi pecah teks menjadi span huruf
  function splitTextToSpans(el) {
    const rawText = el.textContent;
    el.innerHTML = '';
    rawText.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = 1;
      el.appendChild(span);
    });
  }

  // Efek huruf meledak saat scroll
  function explodeInit() {
    splitTextToSpans(element);
    const spans = element.querySelectorAll('span');
    const wrapper = element.closest('.box') || element;

    gsap.set(spans, { x: 0, y: 0, rotate: 0, opacity: 1 });

    ScrollTrigger.create({
      trigger: wrapper,
      start: "bottom 50%",
      end: "top 60%",
      toggleActions: "play reverse play reverse",
      markers: true, // aktifkan jika mau lihat garis pemicu

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
  }
*/
