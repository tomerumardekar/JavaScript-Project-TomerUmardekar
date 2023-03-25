//app.js
import Timer  from './timer.js';

const timeIput = document.getElementById('time-input');


function addTimer(){
   const initialTime= timeIput.value;
    console.log('add timer',initialTime);
    const timer = new Timer(initialTime);
   timer.creatTimer();
}

//add click event listener to the add timer button
document.getElementById('create-timer').addEventListener('click',addTimer);