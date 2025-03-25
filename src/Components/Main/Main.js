import './Main.css'
import WeatherStatus from '../WeatherStatus/WeatherStatus';
import Forecats from '../Forecats/Forecats';
import WorldForecat from '../WorldForecat/WorldForecat';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Main() {

    const [weatherAllData, setWeatherAllData] = useState(0)
    const [weatherData, setWeatherData] = useState({})

    const Selector = useSelector(state => state.weather)
    
    useEffect(() => {
        setWeatherAllData(0)
        if(Selector.cityName.length > 0){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Selector.cityName.toLowerCase()}&appid=ab9e62f3f593efb75b362abb53df88c3`)
            .then(res => res.json())
            .then(res => {
                setWeatherAllData(res)
                if(res.cod == 200){
                    localStorage.setItem('weatherlycity', res.name)
                    setWeatherData({
                        city: res.name,
                        status: res.weather[0].main,
                        temp: res.main.temp,
                        humidity: res.main.humidity,
                        windSpeed: res.wind.speed
                    })
                }
            })
        }
    },[Selector.cityName])

  return (
    <main>
        <div className="container">
            {Selector.cityName.length === 0 ? 
            <p className='main-massage'>Please search a city</p> :
            weatherAllData != 0 ?
            weatherAllData.cod == 200 ?
            <div className='main-flex-div'>
                <div className="main-l-flex-div">
                    <WeatherStatus {...weatherData} />
                    <WorldForecat />
                </div>
                <div className="main-r-flex-div">
                    <Forecats />
                </div>
            </div> :
            <p className='main-massage'>City not Found</p> :
            <p className='main-massage'>Loading...</p>
            }
        </div>
    </main>
  )
}