import React, { useState } from 'react';
const api = {
  key: "ca37cdafd192434bdfc3c40733cee944",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
          });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  const heureBuilder = (h) => {
    let hour = h.getHours();
    let min = h.getMinutes();

    return `${hour}h ${min}min`
  }

  return (
      <div className={(typeof weather.main != "undefined")
          ? ((weather.main.temp > 16) ? 'app warm' : 'app')
          || ((weather.main.temp < 5) ? 'app cold' : 'app')
          : 'app'}>
        <main>
          <div className="search-box">
            <input
                type="text"
                className="search-bar"
                placeholder="Ville..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
              <div>
                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                  <div className="date">{dateBuilder(new Date())}</div>
                  <div className="heure">{heureBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weather.main.temp)}°c
                  </div>
                  <div className="weather">{weather.weather[0].description}</div>
                </div>
              </div>
          ) : ('')}
        </main>
      </div>
  );
}

export default App;
