gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.to('.hero p', {
    duration: 2,
    delay: 2,
    text: 'Akan dilaksanakan dalam: ',
});

const isiCerita = [
    "Jodoh adalah cerminan diri. Alangkah beruntungnya mereka yg saling melengkapi dan mencintai karena Allah.",
    "Seorang suami dan istri adalah pakaian bagi masing-masing. Oleh karena itu mereka harus saling menutupi kekurangan masing-masing dan tidak boleh menampakkan kekurangan di antara mereka pada orang lain, siapapun itu.",
    "Seorang istri dan anak adalah prioritas utama bagi suami dalam hal kasih sayang dan nafkah. Namun dalam hal berbakti, seorang suami tetap memprioritaskan kedua orang tuanya."
];

// Pilih semua elemen <p> di dalam .timeline-heading
const timeLineHeadingLists = document.querySelectorAll('.timeline-quote-heading p');



// Bersihkan isi teks di awal agar ketikannya tampak nyata
timeLineHeadingLists.forEach(p => p.textContent = '');

for (let i = 0; i < timeLineHeadingLists.length; i++) {
    const el = timeLineHeadingLists[i];
    const text = isiCerita[i];
    
    // ScrollTrigger untuk setiap <p>
    ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        once: true,
        onEnter: () => {
            let currentIndex = 0;
            const totalDuration = 4000; // 4 detik total
            const intervalTime = totalDuration / text.length;

            const typingInterval = setInterval(() => {
                if (currentIndex < text.length) {
                    el.textContent += text[currentIndex];
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, intervalTime);
        }
    });
}

// Efek Buyar saat scroll
ScrollTrigger.create({
  trigger: el,
  start: "top 85%",
  end: "top 50%",
  onEnter: () => {
    gsap.to(el, { rotate: 5, x: 30, opacity: 0.4 });
  },
  onLeave: () => {
    gsap.to(el, { rotate: 0, x: 0, opacity: 1 });
  },
  onEnterBack: () => {
    gsap.to(el, { rotate: 0, x: 0, opacity: 1 });
  },
  onLeaveBack: () => {
    gsap.to(el, { rotate: 5, x: 30, opacity: 0.4 });
  }
});

