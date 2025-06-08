AOS.init();


//snow 
const snowContainer = document.getElementById("snow-block");

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄";
    snowflake.style.left = Math.random() * 100 + "%";
    snowflake.style.fontSize = 10 + Math.random() * 20 + "px";
    snowflake.style.animationDuration = 3 + Math.random() * 2 + "s";
    snowContainer.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 6000);
  }

  setInterval(createSnowflake, 300);
