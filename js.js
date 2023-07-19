const element = document.getElementById("bird");
console.log(element)
let start, previousTimeStamp;
let done = false;
var count = 50; 
var jumping = false
var space_pressed = false

document.body.onkeydown = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    space_pressed = true
    console.log(space_pressed)
  }
}

function step(timeStamp) {
  if (start === undefined) {
    start = timeStamp;
    // element.style.transform = `translateY(200px)`;
    // element.style.top = `600px`;
  }
  const elapsed = timeStamp - start;

  if (previousTimeStamp !== timeStamp && !jumping) {
    // Math.min() is used here to make sure the element stops at exactly 250px
    count = count - 0.2; 
    // console.log(count)
    // element.style.transform = `translateY(${count}px)`;
    element.style.bottom = `${count}vh`;
    // if (count === 200) done = true;
    if (count <= 0 || space_pressed) {
      // element.style.transform = `translateY(-20vh)`;
      count += 20;
      element.style.bottom = `${count}vh`;
      // element.style.transition = `1s ease`;
      element.style.transition = `0.75s linear`;

      jumping = true
      setTimeout(() => {
        jumping = false
        space_pressed = false
        element.style.transition = `none`;
      }, 755);
      // count = 50;
    }
  }

  if (elapsed < 20000) {
    // Stop the animation after 2 seconds
    previousTimeStamp = timeStamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}

window.requestAnimationFrame(step);
