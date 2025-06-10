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

const timeLineHeadingLists = document.querySelectorAll('.timeline-quote-heading p');

for (let i = 0; i < timeLineHeadingLists.length; i++) {
    const el = timeLineHeadingLists[i];
    const text = isiCerita[i];
    let originalText = text;
    el.textContent = '';

    // Efek Ketik
    ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        once: true,
        onEnter: () => {
            let index = 0;
            const duration = 4000;
            const interval = duration / text.length;

            const typing = setInterval(() => {
                if (index < text.length) {
                    el.textContent += text[index];
                    index++;
                } else {
                    clearInterval(typing);
                }
            }, interval);
        }
    });

    // Efek Buyar Acak
    function shuffleText(text) {
        let chars = text.split('');
        for (let i = chars.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        return chars.join('');
    }

    ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        onEnter: () => {
            el.textContent = shuffleText(originalText);
            gsap.to(el, {
                duration: 0.3,
                opacity: 0.4,
                filter: "blur(2px)",
                rotate: 5,
                x: 20,
            });
        },
        onLeave: () => {
            el.textContent = originalText;
            gsap.to(el, {
                duration: 0.3,
                opacity: 1,
                filter: "blur(0)",
                rotate: 0,
                x: 0,
            });
        },
        onEnterBack: () => {
            el.textContent = originalText;
            gsap.to(el, {
                duration: 0.3,
                opacity: 1,
                filter: "blur(0)",
                rotate: 0,
                x: 0,
            });
        },
        onLeaveBack: () => {
            el.textContent = shuffleText(originalText);
            gsap.to(el, {
                duration: 0.3,
                opacity: 0.4,
                filter: "blur(2px)",
                rotate: -5,
                x: -20,
            });
        }
    });
}
