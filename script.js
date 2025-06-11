AOS.init();


document.addEventListener("DOMContentLoaded", function () {
    const typingElements = document.querySelectorAll(".typing-text p");

    typingElements.forEach((element, index) => {
        const text = element.innerHTML;
        element.innerHTML = "";
        let i = 0;

        function typeChar() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeChar, 25); // atur kecepatan ketik di sini
            }
        }

        // Menunda ketik sesuai urutan agar tidak bareng semua
        setTimeout(typeChar, index * 1000);
    });
});
