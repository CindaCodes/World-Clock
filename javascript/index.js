let is12HourFormat = false;

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

setInterval(clockTick, 1000);

let citiesSelectElement = document.querySelector("#city-selector");
citiesSelectElement.addEventListener("change", function (event) {
  setInterval(updateCity, 1000);

  function updateCity(event) {
    let cityTimeZone = citiesSelectElement.value;
    if (cityTimeZone === "current") {
      cityTimeZone = moment.tz.guess();
    }

    // Check if timezone is valid
    if (!moment.tz.zone(cityTimeZone)) {
      console.error(`Invalid timezone: ${cityTimeZone}`);
      return false;
    }

    let cityTime = moment().tz(cityTimeZone);
    let cityName = cityTimeZone.replace("_", " ").split("/")[1] || cityTimeZone;
    let citiesElement = document.querySelector("#cities");

    if (!citiesElement) {
      console.error("Cities element not found");
      return false;
    }

    citiesElement.innerHTML = `
    <div class="dropdown-container">
      <h2 class="dropdown-city">${cityName}</h2>
      <div class="dropdown-date">${cityTime.format("ddd, MMM Do YYYY")}</div>
      <div class="dropdown-time">${cityTime.format(
        is12HourFormat ? "h:mm:ss [<small>]A[</small>]" : "HH:mm:ss"
      )}</div>
    </div>
    <a href="/"><button class="home-button">Go to Homepage</button></a>
  `;

    return true;
  }
});

//button to switch between 12 and 24 hour format
document.querySelector("#hours-button").addEventListener("click", function () {
  is12HourFormat = !is12HourFormat;
  this.textContent = is12HourFormat ? "24-Hour Format" : "12-Hour Format";

  updateTime();

  const selectedCity = document.querySelector("#city").value;
  if (selectedCity) {
    updateCity({ target: { value: selectedCity } });
  }
});

function updateTime() {
  // Hawaii Time
  let honoluluElement = document.querySelector("#honolulu");
  if (honoluluElement) {
    let honoluluDateElement = honoluluElement.querySelector(".date");
    let honoluluTimeElement = honoluluElement.querySelector(".time");
    if (honoluluDateElement && honoluluTimeElement) {
      let honoluluTime = moment().tz("Pacific/Honolulu");
      honoluluDateElement.innerHTML = honoluluTime.format("ddd, MMM Do YYYY");
      honoluluTimeElement.innerHTML = honoluluTime.format(
        is12HourFormat ? "h:mm:ss [<small>]A[</small>]" : "HH:mm:ss"
      );
    }
  }

  // Oslo Time
  let osloElement = document.querySelector("#oslo");
  if (osloElement) {
    let osloDateElement = osloElement.querySelector(".date");
    let osloTimeElement = osloElement.querySelector(".time");
    if (osloDateElement && osloTimeElement) {
      let osloTime = moment().tz("Europe/Oslo");
      osloDateElement.innerHTML = osloTime.format("ddd, MMM Do YYYY");
      osloTimeElement.innerHTML = osloTime.format(
        is12HourFormat ? "h:mm:ss [<small>]A[</small>]" : "HH:mm:ss"
      );
    }
  }

  // Hong Kong Time
  let hongKongElement = document.querySelector("#hongKong");
  if (hongKongElement) {
    let hongKongDateElement = hongKongElement.querySelector(".date");
    let hongKongTimeElement = hongKongElement.querySelector(".time");
    if (hongKongDateElement && hongKongTimeElement) {
      let hongKongTime = moment().tz("Asia/Hong_Kong");
      hongKongDateElement.innerHTML = hongKongTime.format("ddd, MMM Do YYYY");
      hongKongTimeElement.innerHTML = hongKongTime.format(
        is12HourFormat ? "h:mm:ss [<small>]A[</small>]" : "HH:mm:ss"
      );
    }
  }
}

updateTime();
setInterval(updateTime, 1000);
