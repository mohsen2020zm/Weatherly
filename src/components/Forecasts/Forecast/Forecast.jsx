import './Forecast.css'
import { useSelector } from 'react-redux'
import useConvert from '../../../Hooks/useConvert'

export default function Forecast({temp, time}) {

  const selector = useSelector(state => state.weather)
  const convert = useConvert(temp, selector.tempType)

  const formatTime = timeString => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number)
    return new Date(0, 0, 0, hours, minutes, seconds).toLocaleTimeString("en-US", {
      hour: 'numeric',
      hour12: true
    })
  }

  return (
    <div className='forecast-main-div'>
        <p className="forecast-temprature">{convert}°</p>
        <p className="forecast-time">{formatTime(time)}</p>
    </div>
  )
}
