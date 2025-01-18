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

  function updateCity() {
    let cityTimeZone = citiesSelectElement.value;
    if (cityTimeZone === "current") {
      cityTimeZone = moment.tz.guess();
    }
    let cityTime = moment().tz(cityTimeZone);
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = `
    <div class="dropdown-container">
        <h2 class="dropdown-city">${cityName}</h2>
        <div class="dropdown-date">${cityTime.format("ddd, MMM Do YYYY")}</div>
      <div class="dropdown-time">${cityTime.format(
        is12HourFormat
          ? "h:mm:ss [<small>]A[</small>]"
          : is12HourFormat
          ? "h:mm:ss [<small>]A[</small>]"
          : "HH:mm:ss"
      )}
      </div>
    
    </div>
        
       <a href="/"><button class = "home-button">Go to Homepage</button></a>
       
  `;
  }
});

//button to switch between 12 and 24 hour format
document.querySelector("#hours-button").addEventListener("click", function () {
  is12HourFormat = !is12HourFormat;
  this.textContent = is12HourFormat ? "24-Hour Format" : "12-Hour Format";

  OsloClock();

  const selectedCity = document.querySelector("#city").value;
  if (selectedCity) {
    updateCity({ target: { value: selectedCity } });
  }
});

function updateTime() {
  // Hawaii Time
  let honoluluElement = document.querySelector("#honolulu");
  let honoluluDateElement = honoluluElement.querySelector(".date");
  let honoluluTimeElement = honoluluElement.querySelector(".time");
  let honoluluTime = moment().tz("Pacific/Honolulu");

  honoluluDateElement.innerHTML = honoluluTime.format("ddd, MMM Do YYYY");
  honoluluTimeElement.innerHTML = honoluluTime.format(
    is12HourFormat
      ? "h:mm:ss [<small>]A[</small>]"
      : is12HourFormat
      ? "h:mm:ss [<small>]A[</small>]"
      : "HH:mm:ss"
  );

  // Oslo Time
  let osloElement = document.querySelector("#oslo");
  let osloDateElement = osloElement.querySelector(".date");
  let osloTimeElement = osloElement.querySelector(".time");
  let osloTime = moment().tz("Europe/Oslo");

  osloDateElement.innerHTML = osloTime.format("ddd, MMM Do YYYY");
  osloTimeElement.innerHTML = osloTime.format(
    is12HourFormat
      ? "h:mm:ss [<small>]A[</small>]"
      : is12HourFormat
      ? "h:mm:ss [<small>]A[</small>]"
      : "HH:mm:ss"
  );

  // Hong Kong Time
  let hongKongElement = document.querySelector("#hongKong");
  let hongKongDateElement = hongKongElement.querySelector(".date");
  let hongKongTimeElement = hongKongElement.querySelector(".time");
  let hongKongTime = moment().tz("Asia/Hong_Kong");

  hongKongDateElement.innerHTML = hongKongTime.format("ddd, MMM Do YYYY");
  hongKongTimeElement.innerHTML = hongKongTime.format(
    is12HourFormat
      ? "h:mm:ss [<small>]A[</small>]"
      : is12HourFormat
      ? "h:mm:ss [<small>]A[</small>]"
      : "HH:mm:ss"
  );


}

updateTime();
setInterval(updateTime, 1000);
