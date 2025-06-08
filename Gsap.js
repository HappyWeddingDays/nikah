gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.to('.hero p', {
    duration: 2,
    delay: 2,
    text: 'Akan dilaksanakan dalam: ',
});

const isiCerita = [
    "Jodoh adalah cerminan diri. Alangkah beruntungnya mereka yg saling melengkapi dan mencintai karena Allah.",
    "Tidak ada yg kebetulan di dunia ini, semua sudah tersusun rapih oleh sang Maha Kuasa. Alhamdulillah yg telah mempertemukan kami dgn orang yg kami saling mencintainya hingga menempuh jalan yg diridhoinya.",
    "Katanya Cinta dapat tumbuh dgn kebersamaan. Seiring berjalannya waktu, kami semakin dekat. Lalu kami berkomitmen pada tahun 2023 seakan terus berkonspirasi utk menyatukan kami berdua.",
    "Menuntut kami pada sebuah pertemuan yg tak pernah disangka. Hingga akhirnya membawa kami pada sebua ikatan suci yg diridhoi-Nya. Kami melangsungkan acara lamaran pada 27 Oktober 2024."
];

// Pilih semua elemen <p> di dalam .timeline-heading
const timeLineHeadingLists = document.querySelectorAll('.timeline-heading p');

// Loop pertama untuk animasi GSAP
for (let i = 0; i < timeLineHeadingLists.length; i++) {
    gsap.to(timeLineHeadingLists[i], {
        duration: 4,
        delay: 3,
        text: isiCerita[i],
        scrollTrigger: {
            start: "20% bottom",
            end: "60% top",
            trigger: timeLineHeadingLists[i],
            scrub: true,
        },
    });
}

// Loop kedua untuk mengisi teks di elemen <p>
for (let i = 0; i < timeLineHeadingLists.length; i++) {
    const paragraph = timeLineHeadingLists[i];
    if (paragraph) {
        paragraph.textContent = isiCerita[i] || `teks ${i + 1}`; // Menggunakan textContent untuk menghilangkan <br>
    }
}

