import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";
import "./App.css";

function App() {

  const [apod, setApod] = useState({
    title: '',
    date: '',
    explanation: '',
    media_type: '',
    url: ''
  });
  const [currentDate, setCurrentDate] = useState('2019-09-11')
  const [isLoaded, setLoadingIndicator] = useState(true);
  const nasa_api = `https://api.nasa.gov/planetary/apod?api_key=ovyKFkAQbLjcqABOjMU68doBcdgmawfk7TjlFVrf&date=${currentDate}`;

  // GET INITIAL DATA FROM API
  useEffect(() => {
    axios.get(nasa_api)
      .then(response => {
        setApod({
          title: response.data.title,
          date: response.data.date,
          explanation: response.data.explanation,
          media_type: response.data.media_type,
          url: response.data.url
        });
        setLoadingIndicator(false);
      })
  }, [nasa_api])

  return (
    <div className="App">
      <h1 className="app-title">Astronomy Picture of the Day</h1>
      <div className="controls-bar">
        <p>
          Check out previous days: 
          {/* <input type="date" value={currentDate} /> */}
        </p>
      </div>
      <div className="media-container">
        { 
          isLoaded ? 
            <LoadingIndicator /> :
            apod.media_type === "image" ? 
              <img src={apod.url} alt={apod.title} /> :
              <video></video>
        }

        <div className="media-content">
          <h2>{apod.title}</h2>
          <p>{apod.explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
