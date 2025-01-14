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


function updateTime() {

  // Hawaii Time
  let honoluluElement = document.querySelector("#honolulu");
  if (honoluluElement) {
    let honoluluDateElement = honoluluElement.querySelector(".date");
    let honoluluTimeElement = honoluluElement.querySelector(".time");
    let honoluluTime = moment().tz("Pacific/Honolulu");

    honoluluDateElement.innerHTML = honoluluTime.format("MMMM   Do YYYY");
    honoluluTimeElement.innerHTML = honoluluTime.format("H:mm:ss");
  }

  // Caracas Time
  let caracasElement = document.querySelector("#caracas");
  if (caracasElement) {
    let caracasDateElement = caracasElement.querySelector(".date");
    let caracasTimeElement = caracasElement.querySelector(".time");
    let caracasTime = moment().tz("America/Caracas");

    caracasDateElement.innerHTML = caracasTime.format("MMMM Do YYYY");
    caracasTimeElement.innerHTML = caracasTime.format("H:mm:ss");
  }

  // Cairo Time
  let cairoElement = document.querySelector("#cairo");
  if (cairoElement) {
    let cairoDateElement = cairoElement.querySelector(".date");
    let cairoTimeElement = cairoElement.querySelector(".time");
    let cairoTime = moment().tz("Africa/Cairo");

    cairoDateElement.innerHTML = cairoTime.format("MMMM   Do YYYY");
    cairoTimeElement.innerHTML = cairoTime.format("H:mm:ss");
  }

  // Hong Kong Time
  let hongKongElement = document.querySelector("#hong-kong");
  if (hongKongElement) {
    let hongKongDateElement = hongKongElement.querySelector(".date");
    let hongKongTimeElement = hongKongElement.querySelector(".time");
    let hongKongTime = moment().tz("Asia/Hong_Kong");

    hongKongDateElement.innerHTML = hongKongTime.format("MMMM Do YYYY");
    hongKongTimeElement.innerHTML = hongKongTime.format("H:mm:ss");
  }
}

updateTime();
setInterval(updateTime, 1000);
