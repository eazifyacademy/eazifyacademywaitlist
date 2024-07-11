const day = document.querySelector(".day .numb");
const hour = document.querySelector(".hour .numb");
const min = document.querySelector(".min .numb");
const sec = document.querySelector(".sec .numb");
var timer = setInterval(()=>{
  var currentDate = new Date().getTime();
  var launchDate = new Date('August 13, 2024 12:00:00').getTime();
  var duration = launchDate - currentDate;
  var days = Math.floor(duration / (1000 * 60 * 60 * 24));
  var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((duration % (1000 * 60)) / 1000);
  day.innerHTML = days;
  hour.innerHTML = hours;
  min.innerHTML = minutes;
  sec.innerHTML = seconds;
  if(days < 10){
    day.innerHTML = days;
  }
  if(hours < 10){
    hour.innerHTML =  hours;
  }
  if(minutes < 10){
    min.innerHTML = minutes;
  }
  if(seconds < 10){
    sec.innerHTML = seconds;
  }
  if(duration < 0){
    clearInterval(timer);
  }
}, 1000);

// FOR THE MOVING STARS
let starSpawnInterval;
const stars = [];
let starCounter = 0;
let enginePower = 0;

function increaseEnginePower() {
  enginePower += 1;
  updateStarSpeed(enginePower);
}

//create a button element
const button = document.createElement('button');
button.textContent = 'Increasing Engine Power';
button.style.color = '#fff';
button.style.height = '5vh';
button.style.width= '15vw';
button.style.margin = 'auto';
button.style.padding = '10px';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.fontFamily = 'Poppins, sans-serif';
button.style.backgroundColor = 'rgb(2,0,36)';

// add event listener to the button
button.addEventListener('click', increaseEnginePower);

// Append the button to the body
// document.body.appendChild(button);

function createStar(speed){
  const star = document.createElement('div');
  star.className = 'stars';

  const xPos = Math.random() * window.innerWidth;
  const yPos = -10;

  star.style.left = `${xPos}px`;
  star.style.top = `${yPos}px`;

  const size = Math.random() + 1;

  star.style.width = size + 'px';
  star.style.height = size + 'px';

  const twinklingDelay = Math.random() * 2;

  const randomFactor = Math.random() * 2 + 0.5;
  const newDuration = Math.max(1, 10 / (speed * randomFactor + 1));

  star.style.animation = `moveDown ${newDuration}s 0s linear infinite, twinkle 2s ${twinklingDelay}s infinite alternate`;
  star.style.animationPlayState = 'running';

  star.addEventListener('animationiteration', () => {
    if(star.getBoundingClientRect().top > window.innerHeight) {
      star.remove()
      const index = stars.indexOf(star);
      if(index !== -1) {
        stars.splice(index, 1);
      }
    }
  });
  document.body.appendChild(star);
  stars.push(star);
}
function updateStarSpeed(enginePower) {
  stars.forEach(star => {
    const currentDuration = parseFloat(getComputedStyle(star).animationDuration);
    const currentTime = Date.now();
    const elapsedTime = (currentTime - (star.animationStartTime || currentTime)) % currentDuration;

    const progress = elapsedTime / currentDuration;

    const randomFactor = Math.random() * 2 + 0.5;
    const newDuration = Math.max(1, 10 / (enginePower * randomFactor + 1));

    const adjustedElapsedTime = progress * newDuration;

    const twinklingDelay = Math.random() * 2;

    star.style.animationDuration = `${newDuration}s, 2s`;
    star.style.animationDelay = `${adjustedElapsedTime}ms, ${twinklingDelay}s`;
  });
}
starSpawnInterval = setInterval(() => {
  if(starCounter < 150){
    createStar(enginePower + 0.1);
    starCounter++;
  } else {
    clearInterval(starSpawnInterval);
  }
}, 50);