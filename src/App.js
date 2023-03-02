import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [humid, setHumid] = useState("");
  const [description, setDescription] = useState("");
  const [wind, setWind] = useState("");
  const [result, setresult] = useState(false);

  function showWeatherData(response) {
    if (response) {
      setresult(true);
    }
    setTemp(Math.round(response.data.main.temp));
    setHumid(Math.round(response.data.main.humidity));
    setDescription(response.data.weather[0].description);
    setWind(Math.round(response.data.wind.speed));
  }
  const datalist = [
    { variable: "Temperature", data: `${temp}°C` },
    { variable: "Humidity", data: `${humid}%` },
    { variable: "Description", data: `${description}` },
    { variable: "Wind-speed", data: `${wind}mph` }
  ];

  function getweatherData(event) {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ee75d8fd0a41a9e7dfc26c980f6da70&units=metric`;
    axios.get(url).then(showWeatherData);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="App">
      <h1>Weather Search</h1>
      <form onSubmit={getweatherData}>
        <input type="search" onChange={updateCity} />
        <input type="submit" />
      </form>

      {datalist.map(function (value, index) {
        if (result === true) {
          return (
            <li key={index}>
              {value.variable}: {value.data}{" "}
            </li>
          );
        }
      })}
    </div>
  );
}


export default App;
