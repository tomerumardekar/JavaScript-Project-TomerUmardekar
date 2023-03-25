"use strict";
console.log("hello");
//class Exchange
//proprties: symbol, lastPrice, volume, priceChangePercent
//contructor method
class Exchange {
    constructor(s, lP, v, pCp) {
        this.symbol = s;
        this.lastPrice = lP;
        this.volume = v;
        this.priceChangePercent = pCp;
    }
}
//getData function - send request to the api https://api2.binance.com/api/v3/ticker/24hr
function getData() {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://api2.binance.com/api/v3/ticker/24hr");
        xhttp.onload = function () {
            if (xhttp.status == 200) {
                resolve(JSON.parse(xhttp.response));
            }
            else {
                reject(xhttp.status);
            }
        };
        xhttp.send();
    });
}
//create new Exchanges
let data;
function createDataArray() {
    getData()
        .then((value) => {
        data = value.map((exchange) => {
            return new Exchange(exchange.symbol, Number(exchange.lastPrice), Number(exchange.volume), Number(exchange.priceChangePercent));
        });
        updatePage(data);
    })
        .catch((error) => {
        console.log(error);
    });
}
//getData function - send request to the api https://api2.binance.com/api/v3/ticker/24hr
//create new Exchanges
//on page load getData()
window.addEventListener("load", () => {
    createDataArray();
});
//display Data function
function updatePage(data) {
    //get the table by id/class
    let tableBody = document.querySelector("#tbodyResult");
    tableBody.innerHTML = "";
    //run on all the data
    data.forEach((exchange) => {
        //create 1 tr element for the row
        let row = document.createElement("tr");
        //create 4 td elements for symbol,price,volume,precent
        let symboleTd = document.createElement("td");
        let lastPriceTd = document.createElement("td");
        let volumeTd = document.createElement("td");
        let precentTd = document.createElement("td");
        symboleTd.innerText = exchange.symbol;
        lastPriceTd.innerText = exchange.lastPrice.toString();
        volumeTd.innerText = exchange.volume.toString();
        precentTd.innerText = exchange.priceChangePercent.toString();
        //append all td to tr
        row.appendChild(symboleTd);
        row.appendChild(lastPriceTd);
        row.appendChild(volumeTd);
        row.appendChild(precentTd);
        //append tr to the table
        tableBody.appendChild(row);
    });
}
//onClick searchBtn => search
const buttonSearch = document.getElementById("searchBtn");
buttonSearch.addEventListener("click", search);
function search() {
    let input = document.getElementById("currency-name")
        .value;
    const filteredData = data.filter((exchange) => exchange.symbol.includes(input.toUpperCase()));
    //מערך של exchange dislaydata
    updatePage(filteredData);
}
//onClick filterByPrice => filter
const filterPriceButton = document.getElementById("price-search-button");
filterPriceButton.addEventListener("click", filterByPrice);
/* function filterByPrice(): void {
  // Get the minimum and maximum price values from the input fields
  const minPrice = Number(
    (document.getElementById("min-price") as HTMLInputElement).value
  );
  const maxPrice = Number(
    (document.getElementById("max-price") as HTMLInputElement).value
  );

  // Filter the data array to include only Exchange objects with a lastPrice property within the specified range
  const filteredData = data.filter((exchange: Exchange) => {
    return exchange.lastPrice >= minPrice && exchange.lastPrice <= maxPrice;
  });

  // Update the page with the filtered data
  updatePage(filteredData);
} */
function filterByPrice() {
    // Get the minimum and maximum price values from the input fields
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const minPrice = minPriceInput.value
        ? Number(minPriceInput.value)
        : undefined;
    const maxPrice = maxPriceInput.value
        ? Number(maxPriceInput.value)
        : undefined;
    let filteredData;
    if (minPrice && maxPrice) {
        // Filter the data array to include only Exchange objects with a lastPrice property within the specified range
        filteredData = data.filter((exchange) => {
            return exchange.lastPrice >= minPrice && exchange.lastPrice <= maxPrice;
        });
    }
    else if (minPrice) {
        // Filter the data array to include only Exchange objects with a lastPrice property greater than or equal to the minimum price
        filteredData = data.filter((exchange) => {
            return exchange.lastPrice >= minPrice;
        });
    }
    else if (maxPrice) {
        // Filter the data array to include only Exchange objects with a lastPrice property less than or equal to the maximum price
        filteredData = data.filter((exchange) => {
            return exchange.lastPrice <= maxPrice;
        });
    }
    else {
        // If no minimum or maximum price values are specified, use the entire data array
        filteredData = data;
    }
    // Update the page with the filtered data
    updatePage(filteredData);
}
const filterByVolumeButton = document.getElementById("volume-search-button");
filterByVolumeButton.addEventListener("click", filterByVolume);
//onClick filterByVolume => filter
function filterByVolume() {
    // Get the minimum and maximum volume values from the input fields
    const minVolumeInput = document.getElementById("min-volume");
    const maxVolumeInput = document.getElementById("max-volume");
    const minVolume = minVolumeInput.value
        ? Number(minVolumeInput.value)
        : undefined;
    const maxVolume = maxVolumeInput.value
        ? Number(maxVolumeInput.value)
        : undefined;
    let filteredData;
    if (minVolume && maxVolume) {
        // Filter the data array to include only Exchange objects with a volume property within the specified range
        filteredData = data.filter((exchange) => {
            return exchange.volume >= minVolume && exchange.volume <= maxVolume;
        });
    }
    else if (minVolume) {
        // Filter the data array to include only Exchange objects with a volume property greater than or equal to the minimum volume
        filteredData = data.filter((exchange) => {
            return exchange.volume >= minVolume;
        });
    }
    else if (maxVolume) {
        // Filter the data array to include only Exchange objects with a volume property less than or equal to the maximum volume
        filteredData = data.filter((exchange) => {
            return exchange.volume <= maxVolume;
        });
    }
    else {
        // If no minimum or maximum volume values are specified, use the entire data array
        filteredData = data;
    }
    // Update the page with the filtered data
    updatePage(filteredData);
}
//onClick getTop10 =>getTop10()
const sortVolumeButton = document.getElementById("top-10-button");
sortVolumeButton.addEventListener("click", getTop10);
function getTop10() {
    // Sort the data array in descending order based on the volume property of the Exchange objects
    const sortedData = data.sort((a, b) => b.volume - a.volume);
    // Select the first 10 elements of the sorted array
    const top10 = sortedData.slice(0, 10);
    // Update the page with the top 10 exchange rates
    updatePage(top10);
}
//onClick sortData => sort the data
function sortData() {
    let sortedData = [];
    //get value of select element
    const selectSortBy = document.querySelector("#sort-by")
        .value;
    switch (selectSortBy) {
        case "volume":
            sortedData = data.sort((a, b) => {
                return b.volume - a.volume;
            });
            break;
        case "lastPrice":
            sortedData = data.sort((a, b) => {
                return b.lastPrice - a.lastPrice;
            });
            break;
        case "priceChangePercent":
            sortedData = data.sort((a, b) => {
                return b.priceChangePercent - a.priceChangePercent;
            });
            break;
        case "symbol":
            sortedData = data.sort((a, b) => {
                return b.symbol.localeCompare(a.symbol);
            });
            break;
        default:
            break;
    }
    //display data
    let checkBoxAsc = document.querySelector("#sort-ascending");
    if (checkBoxAsc.checked) {
        sortedData.reverse();
    }
    updatePage(sortedData);
}
let sortBtn = document.querySelector("#sort-button");
sortBtn.addEventListener("click", sortData);
// function updatePage2(data: Exchange[]): void {
//   const tableBody = document.querySelector("#exchange-rates-table tbody")!;
//   tableBody.innerHTML = "";
//   data.forEach((rate: any) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//           <td>${rate.symbol}</td>
//           <td>${rate.lastPrice}</td>
//           <td>${rate.volume}</td>
//           <td>${rate.priceChangePercent}</td>
//         `;
//     tableBody.appendChild(row);
//   });
// }
