import React, { useState, useEffect } from "react";
import axios from "axios";
import Media from "./Media";
import "./App.css";

function App() {

  const today = new Date().toISOString().substr(0, 10);
  const nasa_api = 'https://api.nasa.gov/planetary/apod?api_key=ovyKFkAQbLjcqABOjMU68doBcdgmawfk7TjlFVrf';

  // STATE DECLARATION
  const [apod, setApod] = useState({});
  const [currentDate, setCurrentDate] = useState(today);
  const [isLoading, setLoadingIndicator] = useState(true);

  // HANDLE CHANGE IN DATE INPUT
  const handleDateChange = (e) => {
    setLoadingIndicator(true);
    setCurrentDate(e.currentTarget.value);
  }

  // GET INITIAL DATA FROM API & WATCH NASA API CHANGE
  useEffect(() => {
    axios.get(`${nasa_api}&date=${currentDate}`)
      .then(response => {
        setApod(response.data);
        setLoadingIndicator(false);
      })
  }, [currentDate])

  // DESTRUCTURED API DATA
  const { title, explanation, media_type, url } = apod;

  return (
    <div className="App">
      <h1 className="app-title">Astronomy Picture of the Day</h1>
      <div className="controls-bar">
        <p>
          Check out previous days: <input 
            type="date" 
            value={currentDate}
            min="1996-12-29" 
            max={today} 
            onChange={handleDateChange} 
          />
        </p>
      </div>
      <Media 
        url={url} 
        title={title} 
        explanation={explanation} 
        isLoading={isLoading}
        media_type={media_type}
      />
    </div>
  );
}

export default App;
