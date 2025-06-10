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
    // Efek LEDAKAN (huruf beterbangan)
ScrollTrigger.create({
    trigger: el,
    start: "top 120%",
    once: true,
    onEnter: () => {
        const chars = el.textContent.split('');
        el.innerHTML = ''; // Kosongkan teks

        chars.forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            el.appendChild(span);
        });

        const spans = el.querySelectorAll('span');

        spans.forEach((span, i) => {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 100 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const delay = i * 0.01;

            gsap.to(span, {
                duration: 1.5,
                delay: delay,
                x: x,
                y: y,
                opacity: 0,
                rotation: Math.random() * 360,
                ease: "power3.out"
            });
        });
    }
});
}
