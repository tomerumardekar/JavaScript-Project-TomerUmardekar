function check(){  
let q1 = document.quiz.q1.value;
let q2 = document.quiz.q2.value;
let q3 = document.quiz.q3.value;
let q4 = document.quiz.q4.value;
let q5 = document.quiz.q5.value;
let q6 = document.quiz.q6.value;
let q7 = document.quiz.q7.value;
let q8 = document.quiz.q8.value;
let q9 = document.quiz.q9.value;
let q10 = document.quiz.q10.value;

var correct =0;

if(q1=="1294"){
    correct++;
}
if(q2==" King cake"){
    correct++;
}
if(q3==" A plastic baby"){
    correct++;
}
if(q4==" Fance"){
    correct++;
}
if(q5==" krewes"){
    correct++;
}
if(q6==" The Krewe of Venus"){
    correct++;
}
if(q7==" Pancakes"){
    correct++;
}
if(q8==" 500,000"){
    correct++;
}
if(q9==" 6 p.m."){
    correct++;
}
if(q10 ==" 25 million"){
    correct++;
}

var message=['Great job!', 'Its Okay', 'You need to train more'];
var img=["imgmardigara/win.gif","imgmardigara/okay.gif","imgmardigara/loose.gif"];
var range;
if(correct<2){
    range=2;
}
if(correct>0 && correct<=3){
    range=1;
}
if(correct>3){
    range=0;
}

document.getElementById('img').src=img[range];
document.getElementById('message').innerHTML=message[range];
document.getElementById("after_submit").style.visibility="visible";
document.getElementById("number_correct").innerHTML="you got "+""+ correct  + "" +" Answers correct.";

}
function start(){
   if(confirm('you want to try again?')){
    location.reload();
   }
}

   