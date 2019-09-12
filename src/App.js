import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import axios from "axios";
import Media from "./Media";

function App() {

  const today = new Date().toISOString().substr(0, 10);
  const nasa_api = 'https://api.nasa.gov/planetary/apod?api_key=ovyKFkAQbLjcqABOjMU68doBcdgmawfk7TjlFVrf';


  // STATE DECLARATION
  const [returnedData, setreturnedData] = useState({});
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
        setreturnedData(response.data);
        setLoadingIndicator(false);
      })
  }, [currentDate])


  // DESTRUCTURED API DATA
  const { title, explanation, media_type, url, copyright } = returnedData;

  return (
    <Main>
      <h1>Astronomy Picture of the Day</h1>
      <DateControl>
        <span>Check out previous days: </span> 
        <input type="date" value={currentDate} min="1996-12-29" max={today} onChange={handleDateChange} />
      </DateControl>
      <Media url={url} title={title} copyright={copyright} explanation={explanation} isLoading={isLoading} media_type={media_type} />
    </Main>
  );
}

export default App;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  h1 {
    font-size: 4rem;
    margin-bottom: 4rem;
    text-align: center
  }
`

const DateControl = styled.p`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;

  input[type="date"] {
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    color: #95a5a6;
    font-size: 15px;
    border: 1px solid #ecf0f1;
    background:#ecf0f1;
    padding: 5px 10px;

    &::-webkit-clear-button,
    &::-webkit-inner-spin-button {
      display: none;
    }

    &::-webkit-calendar-picker-indicator {
      color: #2c3e50;
    }

    &:focus {
      color: #95a5a6;
      box-shadow: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
    }
  }
`
