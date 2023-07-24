const element = document.getElementById("bird");
var pipes = document.getElementsByClassName("pip_cont");
console.log(element)
let start, previousTimeStamp;
let done = false;
var count = 50; 
var count_pipe = 3; 
var count_down = 0;
var jumping = false
var space_pressed = false
var i = 0
var index = 0
var new_pipe = true

document.body.onkeydown = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    space_pressed = true
    console.log(space_pressed)
  }
}
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

function randomize_pipe(pipe) {
  pipe_height_top = randomIntFromInterval(10, 50)
  pipe_height_bot = 100 - pipe_height_top - 40

  var top = pipe.children[0]
  var bot = pipe.children[2]

  console.log(pipe_height_top)
  top.style.height = `${pipe_height_top}vh` 
  bot.style.height = `${pipe_height_bot}vh` 
}

function step(timeStamp) {
  if (start === undefined) {
    start = timeStamp;

    for (const pipe of pipes) {
      randomize_pipe(pipe)
    }
    // element.style.transform = `translateY(200px)`;
    // element.style.top = `600px`;
  }
  const elapsed = timeStamp - start;

  // index = (!start) ? 0 : (i+1)%pipes.length
  var left = parseInt(window.getComputedStyle(pipes[i]).getPropertyValue("left"), 10);
  // console.log(left)

  if (left <= 200 && new_pipe) {
    curr = parseInt(document.getElementById("score").innerHTML, 10)
    document.getElementById("score").innerHTML = curr + 1
    new_pipe = false
  }

  if (left <= -100) {
    index = (i===0) ? pipes.length-1 : (i-1)%pipes.length
    console.log(index)

    left = parseInt(window.getComputedStyle(pipes[index]).getPropertyValue("left"), 10);
    // console.log(left)
    pipes[i].style.left = `${left+500}px`;
    console.log("printed")
    randomize_pipe(pipes[i])

    i = (i + 1) % pipes.length;
    new_pipe = true
    // index += 30
  }

  if (previousTimeStamp !== timeStamp) {
    count_down = count_down + count_pipe

    for ( const pipe of pipes) {
      left = parseInt(window.getComputedStyle(pipe).getPropertyValue("left"), 10);
      // console.log(left)
      // pipe.style.left = `${left - count}vw`;
      pipe.style.left = `${left - count_pipe}px`;
    }
  }

  if (previousTimeStamp !== timeStamp && !jumping) {
    count = count - 0.2; 
    element.style.bottom = `${count}vh`;

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

  for (const pipe of pipes) {
    if (elementsOverlap(document.getElementById("bird"), pipe.children[0]) || elementsOverlap(document.getElementById("bird"), pipe.children[2])) {
      done = true
    } 
  }

  if (elapsed < 200000) {
    // Stop the animation after 2 seconds
    previousTimeStamp = timeStamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}

window.requestAnimationFrame(step);
