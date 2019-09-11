import React, { useState, useEffect } from "react";
import axios from "axios";
import Media from "./Media";
import "./App.css";

function App() {

  // SET TODAY'S DATE
  const today = new Date().toISOString().substr(0, 10);

  // STATE DECLARATION
  const [apod, setApod] = useState({
    title: '',
    explanation: '',
    media_type: '',
    url: ''
  });
  const [currentDate, setCurrentDate] = useState(today)
  const [isLoading, setLoadingIndicator] = useState(true);
  const [api_url, setApi_url] = useState(`https://api.nasa.gov/planetary/apod?api_key=ovyKFkAQbLjcqABOjMU68doBcdgmawfk7TjlFVrf&date=${currentDate}`)

  // HANDLE CHANGE IN DATE INPUT
  const handleDateChange = (e) => {
    setLoadingIndicator(true);
    setCurrentDate(e.currentTarget.value);
  }

  // WATCH CURRENT DATE CHANGE AND UPDATE NASA API
  useEffect(() => {
    setApi_url(`https://api.nasa.gov/planetary/apod?api_key=ovyKFkAQbLjcqABOjMU68doBcdgmawfk7TjlFVrf&date=${currentDate}`);
  }, [currentDate])

  // GET INITIAL DATA FROM API & WATCH NASA API CHANGE
  useEffect(() => {
    axios.get(api_url)
      .then(response => {
        setApod({
          title: response.data.title,
          explanation: response.data.explanation,
          media_type: response.data.media_type,
          url: response.data.url
        });
        setLoadingIndicator(false);
      })
  }, [api_url])

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
        url={apod.url} 
        title={apod.title} 
        explanation={apod.explanation} 
        isLoading={isLoading}
        media_type={apod.media_type}
      />
    </div>
  );
}

export default App;
