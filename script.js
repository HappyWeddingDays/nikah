AOS.init();

document.addEventListener("DOMContentLoaded", function () {
    const observers = [];

    // Fungsi untuk mulai mengetik
    function startTyping(element) {
        const paragraph = element.querySelector("p");
        const text = paragraph.innerHTML;
        paragraph.innerHTML = "";
        let i = 0;

        function typeChar() {
            if (i < text.length) {
                paragraph.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeChar, 25);
            }
        }

        typeChar();
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bounding = entry.boundingClientRect;
                const viewportCenter = window.innerHeight / 2;

                // Cek apakah elemen berada di sekitar tengah viewport
                if (bounding.top < viewportCenter && bounding.bottom > viewportCenter) {
                    if (!entry.target.classList.contains("typed")) {
                        startTyping(entry.target);
                        entry.target.classList.add("typed"); // supaya tidak diulang
                        obs.unobserve(entry.target); // hentikan observer untuk elemen ini
                    }
                }
            }
        });
    }, {
        threshold: 0.5 // dapat disesuaikan
    });

    // Mendaftar semua elemen .typing-text
    document.querySelectorAll(".typing-text").forEach(el => {
        observer.observe(el);
    });
});
