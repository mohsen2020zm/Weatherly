import './Forecasts.css'
import Forecast from './Forecast/Forecast'
import ForecastLoading from './ForecastLoading/ForecastLoading'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Forecasts() {

  const [allForecasts, setAllForecasts] = useState([])

  const selector = useSelector(state => state.weather)

  useEffect(() => {
    setAllForecasts([])
    if(selector.cityName.length > 0){
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selector.cityName}&appid=ab9e62f3f593efb75b362abb53df88c3`)
      .then(res => res.json())
      .then(res => {
        let forecasts = []
        for(let i = 0; i <= 2; i++){
          forecasts.push({
            temp: res.list[i].main.temp,
            time: res.list[i].dt_txt.split(' ')[1]
          })
        }
        setAllForecasts(forecasts)
      })
    }
  },[selector.cityName])

  return (
    <div className='forecasts-main-div'>
        <p className='forecasts-title'>Forecasts</p>
        <div className="forecasts-div">
          {
          selector.cityName.length == 0 ? <p className='forecasts-message'>Select a City to See Forecasts</p> :
          allForecasts.length == 3 ? 
          allForecasts.map((forecast, index) => <Forecast {...forecast} key={index} />) :
          <>
            <ForecastLoading />
            <ForecastLoading />
            <ForecastLoading />
          </>
          }
        </div>
    </div>
  )
}