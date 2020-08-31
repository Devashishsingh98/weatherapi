const inputValue = document.querySelector("#name");
const submit = document.querySelector("#submit");
const city = document.querySelector("#city");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");

submit.addEventListener("click", () => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=275ef3c34d37072bfc42361efb18ed2b`
    )
    .then((res) => {
      let citydata = res.data["name"];
      let tempdata =
        (res.data["main"]["temp"] - 273.15).toPrecision(2) + "deg C";
      let descdata = res.data["weather"][0]["description"];

      city.innerHTML = citydata;
      temp.innerHTML = tempdata;
      desc.innerHTML = descdata;
      inputValue.value = "";
    })
    .catch((err) => {
      console.error("Error aa gaya bhai");
    });
});
