import React, { useState, useEffect } from 'react';
import axios from 'axios';


function WeatherMan () {

  const [name, setName] = useState("");
  const [dmt, setDmt] = useState("");
  const [weather, setWeather] = useState("");
  const [wind, setWind] = useState("");
  const [location, setLocation] = useState("");

  const url = "https://api.openweathermap.org/data/2.5/weather?q=portland&units=imperial&appid=de972e4c2eb6a9fbe69412995d65170d";

  useEffect(
  () => {
     axios.get(url).then((response) => {
       setName(response.data.name);
       setDmt(response.data.main.temp);

       setWeather(response.data.weather);
        setWind(response.data.wind);



     })
   }, []);

  return (
    <div className="container sapp" style={{marginBottom: "0%"}}>

      <div className="top" style={{marginBottom: "0%"}}>
          <div className="location" style={{ display: "inline-block"}}>
                <h3 style={{fontSize: "2rem"}}>
                  {name}
                </h3>
          </div>
          <div className="temp" style={{marginLeft: "1%", display: "inline-block"}}>

            {dmt ? <h2>{dmt.toFixed()}°F</h2> : null}

          </div>
          </div>
      <div className="description" style={{fontWeight: "bold", display: "inline-block"}}>
        {weather ? <p>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clouds" viewBox="0 0 16 16">
        <path d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z"/>
        <path d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z"/>
      </svg> ({weather[0].main})</p> : null}
      </div>

           <div className="wind" style={{ marginLeft: "0.5%", display: "inline-block"}}>
        {wind ? <p style={{fontWeight: "bold", fontSize:"1rem"}}> wind {wind.speed.toFixed()} mph </p> : null }
      </div>
      </div>
  );
}

export default WeatherMan;
