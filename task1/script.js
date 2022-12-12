const backgroundChangeButton = document.querySelector(".background-change");
const colorLabel = document.querySelector(".color-label");
const background = document.querySelector(".background");

function getRandomColor() {
   let color = '';
   while (color.length < 6) {
      color += (Math.random()).toString(16).substr(-6).substr(-1);
   }
   return '#' + color;
}

function setBackgroundColor(element, color) {
   element.style.backgroundColor = color;
}

function handleButtonClick() {
   const randomColor = getRandomColor();
   colorLabel.textContent = randomColor;
   setBackgroundColor(background, randomColor);
}

backgroundChangeButton.addEventListener('click', handleButtonClick);

handleButtonClick();
