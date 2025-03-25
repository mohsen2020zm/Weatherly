import './WeatherStatus.css'
import { useSelector } from 'react-redux'
import useConvert from '../../Hooks/useConvert'

export default function WeatherStatus({city, status, temp, humidity, windSpeed}) {

    const Selector = useSelector(state => state.weather)

    const convert = useConvert(temp, Selector.tempType)

  return (
    <div className='weather-status-main-div'>
        <div className="weather-status-l-div">
            <div className="weather-status-city-div">
                <p className='weather-status-bold-p'>{city}</p>
            </div>
            <div className="weather-status-child-div">
                <p className='weather-status-bold-p'>{status}</p>
                <p className='weather-status-p'>Status</p>
            </div>
        </div>
        <div className="weather-status-r-div">
            <div className='weather-status-child-div'>
                <p className='weather-status-bold-p'>{convert}°</p>
                <p className='weather-status-p'>Temprature</p>
            </div>
            <div className='weather-status-child-div'>
                <p className='weather-status-bold-p'>{humidity}<span>%</span></p>
                <p className='weather-status-p'>Humidity</p>
            </div>
            <div className='weather-status-child-div'>
                <p className='weather-status-bold-p'>{windSpeed}<span>km/h</span></p>
                <p className='weather-status-p'>Wind Speed</p>
            </div>
        </div>
    </div>
  )
}