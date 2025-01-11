const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

function clockTick() {
  const now = new Date();
  const seconds = now.getSeconds()/60;
  const minutes = (seconds + now.getMinutes())/60;
    const hours = (minutes + now.getHours())/12;

    rotateClockHand(secondHand, seconds);
    rotateClockHand(minuteHand, minutes);
    rotateClockHand(hourHand, hours);   
}
function rotateClockHand(hand, rotation) {
  hand.style.transform = `rotate(${rotation * 360}deg)`;
}
setInterval( clockTick, 1000); // 1000 milliseconds = 1 second