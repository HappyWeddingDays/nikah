AOS.init();


//snow 
  const snowContainer = document.querySelector("snow-block");

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄";

    // Posisi acak
    snowflake.style.left = Math.random() * 100 + "%";
    snowflake.style.animationDuration = 2 + Math.random() * 3 + "s";
    snowflake.style.fontSize = 10 + Math.random() * 20 + "px";

    snowContainer.appendChild(snowflake);

    // Hapus setelah selesai jatuh
    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }

  setInterval(createSnowflake, 300);
