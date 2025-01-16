const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".minute-hand");
const hourHand = document.querySelector(".hour-hand");

function clockTick() {
  const now = new Date();
  const seconds = now.getSeconds() / 60;
  const minutes = (seconds + now.getMinutes()) / 60;
  const hours = (minutes + now.getHours()) / 12;

  rotateClockHand(secondHand, seconds);
  rotateClockHand(minuteHand, minutes);
  rotateClockHand(hourHand, hours);
}
function rotateClockHand(element, rotation) {
  element.style.setProperty(`--rotate`, rotation * 360);
}

function updateTime() {
  // Hawaii Time
  let honoluluElement = document.querySelector("#honolulu");
  let honoluluDateElement = honoluluElement.querySelector(".date");
  let honoluluTimeElement = honoluluElement.querySelector(".time");
  let honoluluTime = moment().tz("Pacific/Honolulu");

  honoluluDateElement.innerHTML = honoluluTime.format("MMMM   Do YYYY");
  honoluluTimeElement.innerHTML = honoluluTime.format("H:mm:ss");

  // Caracas Time
  let caracasElement = document.querySelector("#caracas");
  let caracasDateElement = caracasElement.querySelector(".date");
  let caracasTimeElement = caracasElement.querySelector(".time");
  let caracasTime = moment().tz("America/Caracas");

  caracasDateElement.innerHTML = caracasTime.format("MMMM Do YYYY");
  caracasTimeElement.innerHTML = caracasTime.format("HH:mm:ss");

  // Cairo Time
  let cairoElement = document.querySelector("#cairo");
  let cairoDateElement = cairoElement.querySelector(".date");
  let cairoTimeElement = cairoElement.querySelector(".time");
  let cairoTime = moment().tz("Africa/Cairo");

  cairoDateElement.innerHTML = cairoTime.format("MMMM   Do YYYY");
  cairoTimeElement.innerHTML = cairoTime.format("HH:mm:ss");
}


let citiesSelectElement = document.querySelector("#city-selector");
citiesSelectElement.addEventListener("change", function (event) {
  setInterval(updateCity, 1000);

  function updateCity() {
    let cityTimeZone = citiesSelectElement.value;
    if (cityTimeZone === "current") {
      cityTimeZone = moment.tz.guess();
    }
    let cityTime = moment().tz(cityTimeZone);
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = `
    <div class="city-container">
      <div class="stack">
        <h2 class="city">${cityName}</h2>
      </div>
      <div class="stack">
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        <div class="time">${cityTime.format("HH:mm:ss")}</div>
    </div>
    </div>
        
       <a href="/"><button>Go to Homepage</button></a>
       
  `;
  }
});

setInterval(clockTick, 1000);

updateTime();
setInterval(updateTime, 1000);
