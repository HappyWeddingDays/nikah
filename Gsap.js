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
    el.textContent = '';

    // Efek KETIKAN
    ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        once: true,
        onEnter: () => {
            let index = 0;
            const totalDuration = 4000;
            const intervalTime = totalDuration / text.length;

            const interval = setInterval(() => {
                if (index < text.length) {
                    el.textContent += text[index];
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, intervalTime);
        }
    });

    // Efek BUYAR & PULIH
    ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        onEnter: () => {
            gsap.to(el, {
                duration: 0.5,
                letterSpacing: "0.4em",
                rotate: 10,
                x: 30,
                opacity: 0.3,
                filter: "blur(2px)",
            });
        },
        onLeave: () => {
            gsap.to(el, {
                duration: 0.5,
                letterSpacing: "0em",
                rotate: 0,
                x: 0,
                opacity: 1,
                filter: "blur(0)",
            });
        },
        onEnterBack: () => {
            gsap.to(el, {
                duration: 0.5,
                letterSpacing: "0em",
                rotate: 0,
                x: 0,
                opacity: 1,
                filter: "blur(0)",
            });
        },
        onLeaveBack: () => {
            gsap.to(el, {
                duration: 0.5,
                letterSpacing: "0.4em",
                rotate: -10,
                x: -30,
                opacity: 0.3,
                filter: "blur(2px)",
            });
        }
    });
}
