const BASE_URL =
    "https://v6.exchangerate-api.com/v6/49f6bec6c51bc7a5c4e91149/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.id === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.id === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    //console.log (fromCurr.value,toCurr.value);

    const BASE_URL = `https://v6.exchangerate-api.com/v6/49f6bec6c51bc7a5c4e91149/pair/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(BASE_URL);
    let data = await response.json();
    let rate = data.conversion_rate;
    console.log(rate);

    let finalAmount = amtVal * rate ;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `
})