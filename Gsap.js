gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Hero ketikan biasa
gsap.to('.hero p', {
  duration: 2,
  delay: 2,
  text: 'Akan dilaksanakan dalam: ',
});

// Isi cerita
const isiCerita = [
  "Jodoh adalah cerminan diri. Alangkah beruntungnya mereka yg saling melengkapi dan mencintai karena Allah",
  "Seorang suami dan istri adalah pakaian bagi masing-masing. Oleh karena itu mereka harus saling menutupi kekurangan masing-masing dan tidak boleh menampakkan kekurangan di antara mereka pada orang lain, siapapun itu",
  "Seorang istri dan anak adalah prioritas utama bagi suami dalam hal kasih sayang dan nafkah. Namun dalam hal berbakti, seorang suami tetap memprioritaskan kedua orang tuanya"
];

// Ambil semua <p> target
const timeLineHeadingLists = document.querySelectorAll('.timeline-quote-heading p');

// Efek ketikan + wrapping span per huruf
timeLineHeadingLists.forEach((el, i) => {
  const text = isiCerita[i];
  el.textContent = '';

  // Ketikkan karakter demi karakter
  ScrollTrigger.create({
    trigger: el,
    start: "top 60%",
    once: true,
    onEnter: () => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          const span = document.createElement('span');
          span.textContent = text[index];
          el.appendChild(span);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 1000 / text.length); // total durasi 1s
    }
  });

  // Efek buyar saat elemen sampai 85% atas viewport
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    end: "top 50%",
    onEnter: () => {
      const spans = el.querySelectorAll('span');
      spans.forEach(span => {
        gsap.to(span, {
          x: (Math.random() - 0.5) * 300,
          y: (Math.random() - 0.5) * 200,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out"
        });
      });
    },
    onEnterBack: () => {
      const spans = el.querySelectorAll('span');
      spans.forEach(span => {
        gsap.to(span, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out"
        });
      });
    }
  });
});
