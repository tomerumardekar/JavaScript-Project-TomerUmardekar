//פונקציה שמקבלת מערך ומעדכנת את הסלקט באייצ,טי אמ אל

function addOptionsToSelectTag(arrayOfOptions) {
  //נגדיר מצביע לתגית הבחירה
  let selectTag = document.getElementById("country");
  //לרוץ על כל המערך
  arrayOfOptions.map((value) => {
    //בעבור כל איבר במערך יש ליצור תגית אופציה
    let optionTag = document.createElement("option");
    //בעבור כל תגית אופציה יש לעדכן את הערך שלה לערך במערך
    optionTag.value = value;
    //בעבור כל תגית אופציה יש לעדכן את הטקסט שלה לערך במערך
    optionTag.innerText = value;
    //להכניס את האופציה לתוך התגית בחירה
    selectTag.appendChild(optionTag);
  });
}

function getArrayOfNames(arrayOfCountries) {
  return arrayOfCountries.map((country) => {
    return country.name.common;
  });
}

const myPromise = new Promise((resolve, reject) => {
  //create xmlHttp object
  const xhttp = new XMLHttpRequest();
  //open req
  xhttp.open("GET", "https://restcountries.com/v3.1/all");
  //define function onload
  xhttp.onload = function () {
    if (xhttp.status == 200) {
      resolve(xhttp.response);
    } else {
      reject(xhttp.status);
    }
  };
  //send req
  xhttp.send();
});

myPromise
  .then((res) => {
    let names = getArrayOfNames(JSON.parse(res));
    addOptionsToSelectTag(names);
  })
  .catch((error) => {
    addOptionsToSelectTag(["Countries not found status: " + error]);
  });

//כתוב קוד המציג הודעה בלוג, לאחר לחיצה על הכפתור
let btnElement = document.getElementById("searchBtn");
btnElement.addEventListener("click", getWeather);

//function that will search weather

function getWeather() {
  //get the value to search
  let chosenValue = document.getElementById("country").value;
  //send request to our api
  const weatherPromise = new Promise((resolve, reject) => {
    //create
    const xhttp1 = new XMLHttpRequest();

    xhttp1.open(
      "GET",
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        chosenValue +
        "&appid=0d5db0de93414010e1b09819f4f94981"
    );

    xhttp1.onload = function () {
      if (xhttp1.status == 200) {
        resolve(xhttp1.response);
      } else {
        reject(xhttp1.status);
      }
    };

    xhttp1.send();
  });

  weatherPromise
    .then((value) => {
      displayOnPage(JSON.parse(value));
    })
    .catch((error) => {
      console.log(["Countries not found status: " + error]);
    });
}

function displayOnPage(data) {
  clearContainer();
  let temp = data.main.temp;
  let tempFeel = data.main.feels_like;
  let weather = data.weather[0].main;
  let weatherDescription = data.weather[0].description;
  let icon = data.weather[0].icon;
  let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  //create elements
  let pTemp = document.createElement("p");
  let pTempFeel = document.createElement("p");
  let h1Weather = document.createElement("h1");
  let pWeatherDescription = document.createElement("p");
  let iconImg = document.createElement("img");

  pTemp.innerText = "Temp: " + temp + " k";
  pTempFeel.innerText = "Feels Like: " + tempFeel;
  h1Weather.innerText = weather;
  pWeatherDescription.innerText = weatherDescription;
  iconImg.src = iconURL;

  //append child
  const container = document.getElementById("resultContainer");
  container.appendChild(h1Weather);
  container.appendChild(pWeatherDescription);
  container.appendChild(iconImg);
  container.appendChild(pTemp);
  container.appendChild(pTempFeel);
}

function clearContainer() {
  const container = document.getElementById("resultContainer");
  container.innerHTML = "";
}
