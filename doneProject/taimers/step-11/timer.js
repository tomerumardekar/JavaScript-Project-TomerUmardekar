 //timer.js
 export default function Timer(initialTime){
   let time = initialTime;
   let timerElement;
   let timeView;
let intervalId;
let isTimerRuning = false;


function  displayTime(){
  time--;
  if (time < 0){
    stopTimer();
    return;
  }
  timeView.innerText = time;
}

function startTimer(){
    console.log('timer is started');
    if(isTimerRuning){
      return;
    }
   intervalId = setInterval(displayTime,1000);
   isTimerRuning = true;
}

function stopTimer(){
clearInterval(intervalId);
isTimerRuning = false;
}

function deleteTimer(){
  timerElement.remove();
}
 

  function creatButton(buttonText, eventFunction){
    const button = document.createElement('button');
    button.innerText = buttonText;
    button.addEventListener('click',eventFunction);
    timerElement.appendChild(button);
  }

   function createTimeViev(){
     timeView = document.createElement('span');
    timerElement.appendChild(timeView);
   }

   this.creatTimer = function(){
        console.log('create timer');
       
         timerElement = document.createElement('div');
       
       
       createTimeViev();
       timeView.innerText = time;
   

    creatButton('start',startTimer);
    creatButton('pause',stopTimer);
    creatButton('Delete',deleteTimer);
     
    document.getElementById('timers-container').appendChild(timerElement);
    };
   
}
