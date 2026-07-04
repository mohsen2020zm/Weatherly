import './WeatherStatus.css'
import ErrorBox from '../ErrorBox/ErrorBox'
import WeatherStatusLoading from './WeatherStatusLoading/WeatherStatusLoading'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setName } from '../../redux/Store'
import useConvert from '../../Hooks/useConvert'

export default function WeatherStatus() {

    const [weatherAllData, setWeatherAllData] = useState(false)
    const [weatherData, setWeatherData] = useState({})
    const [errorState, setErrorState] = useState({left: '-16.5rem'})

    const Selector = useSelector(state => state.weather)
    const dispatch = useDispatch()

    const convert = useConvert(weatherData.temp, Selector.tempType)

    useEffect(() => {
        setWeatherAllData(false)
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
                }else{
                    errorHandler('City not Found')
                    dispatch(setName({name: ''}))
                }
            })
        }
    },[Selector.cityName])

    const errorHandler = mess => {
        setErrorState({
            message: mess,
            left: '0.5rem'
        })
        setTimeout(() =>{
            setErrorState({
                left: '-16.5rem'
            })
        },4000)
    }

  return (
    <>
    <ErrorBox {...errorState} />

    <div className='weather-status-main-div'>
        {
        Selector.cityName.length == 0 ? <p className='weather-status-message'>Please Select a City</p> :
        weatherAllData ?
        <>
            <div className="weather-status-l-div">
                <div className="weather-status-city-div">
                    <p className='weather-status-bold-p'>{weatherData.city}</p>
                </div>
                <div className="weather-status-child-div">
                    <p className='weather-status-bold-p'>{weatherData.status}</p>
                    <p className='weather-status-p'>Status</p>
                </div>
            </div>
            <div className="weather-status-r-div">
                <div className='weather-status-child-div'>
                    <p className='weather-status-bold-p'>{convert}°</p>
                    <p className='weather-status-p'>Temprature</p>
                </div>
                <div className='weather-status-child-div'>
                    <p className='weather-status-bold-p'>{weatherData.humidity}<span>%</span></p>
                    <p className='weather-status-p'>Humidity</p>
                </div>
                <div className='weather-status-child-div'>
                    <p className='weather-status-bold-p'>{weatherData.windSpeed}<span>km/h</span></p>
                    <p className='weather-status-p'>Wind Speed</p>
                </div>
            </div>
        </> : <WeatherStatusLoading />
        }
    </div>
    
    </>
  )
}