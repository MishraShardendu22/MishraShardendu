const clock = document.querySelector('#clock');

// setInterval( function() {},1000); syntax
// setInterval( ()   =>    {},1000); syntax

// basic format of interval

setInterval( function() {
    let date = new Date();
    clock.innerHTML = date.toLocaleTimeString();
},100);



// TO TRANSITION COLOR 
const textElement = document.querySelector('.TimeText');
let currentColorIndex = 0;

let colors = [
    'rgb(255, 105, 180)', 
    'rgb(255, 165, 0)',
    'rgb(144, 238, 144)', 
    'rgb(173, 216, 230)', 
    'rgb(255, 255, 0)',   
    'rgb(255, 69, 0)',
    'rgb(147, 112, 219)', 
    'rgb(0, 255, 127)',   
    'rgb(70, 130, 180)',  
    'rgb(240, 230, 140)'  
  ];

  // Set interval to change color every 1.5 seconds
  setInterval(function() {
      currentColorIndex = (currentColorIndex + 1) % colors.length;
      textElement.style.color = colors[currentColorIndex];
  }, 1500);
