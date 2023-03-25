function getAirPortInTheCity() {
  const searcAirPortInTheCity = document.getElementById("inputCity").value;

  const promiseGetAirPort = new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open(
      "GET",
      "https://api.flightapi.io/iata/63a18ed8afe64191c0df7d61?name=" +
        searcAirPortInTheCity +
        "&type=airPort"
    );
    xhttp.onload = function () {
      if (xhttp.status == 200) {
        resolve(JSON.parse(xhttp.response));
      } else {
        reject(xhttp.status);
      }
    };
    xhttp.send();
  });

  promiseGetAirPort
    .then((value) => {
      console.log(value);
      displayData(value.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", getAirPortInTheCity);

function displayData(data) {
  let airPortNames = data.map((item) => item.name + " " + item.iata);
  let elements = airPortNames.map((item) => elementFactory(item, "div"));
  const dataContainer = document.getElementById("data");

  elements.forEach((element) => dataContainer.appendChild(element));
}

function elementFactory(text, type) {
  let element = document.createElement(type);
  element.innerText = text;
  return element;
}

class dataFlight {
  constructor(
    flightCodeOrigin,
    flightCodeDestination,
    optionFlight,
    inputFlightDate
  ) {
    this.flightCodeOrigin = flightCodeOrigin;
    this.flightCodeDestination = flightCodeDestination;
    this.optionFlight = optionFlight;
    this.inputFlightDate = inputFlightDate;
  }
  getdataFlight() {
    let a = `https://api.flightapi.io/onewaytrip/63a18ed8afe64191c0df7d61/${
      this.flightCodeOrigin
    }/${this.flightCodeDestination}/${
      this.inputFlightDate
    }/${1}/${0}/${0}/Economy/USD`;
    console.log(a);
    return fetch(a);
  }
}

let allFlightreq = document.getElementById("allFlightreq");
let allDataAirLine = allFlightreq.addEventListener("click", () => {
  let flightCodeOrigin = document.getElementById("flightCodeOrigin").value;
  const flightCodeDestination = document.getElementById(
    "flightCodeDestination"
  ).value;
  const optionFlight = document.getElementById("optionFlight").value;
  const inputFlightDate = document.getElementById("inputFlightDate").value;
  let newDataFlight = new dataFlight(
    flightCodeOrigin,
    flightCodeDestination,
    optionFlight,
    inputFlightDate
  );
  let textDataFlight = newDataFlight.getdataFlight();

  textDataFlight
    .then((textDataFlight) => textDataFlight.json())
    .then((data) => {
      displayDataFlight(data.fares);
    })
    .catch((error) => {
      alert(error);
    });
});

function displayDataFlight(fares) {
  // Iterate through the fares array and create an element for each fare
  const elements = fares.map((fare) => {
    // Extract the values you want to display from the fare object
    const { price, id, handoffUrl } = fare;

    // Create a new element to hold the fare data
    const fareElement = document.createElement("div");

    // Set the innerHTML of the element to the values you want to display
    fareElement.innerHTML = `<p>Price: ${price.amountPerAdult} USD per adult</p><p>id: ${id}</p><p>Url: ${handoffUrl}</p>`;

    return fareElement;
  });

  // Append the elements to the dataContainer element
  const dataContainer = document.getElementById("displayDataFlight");
  elements.forEach((element) => dataContainer.appendChild(element));
}
