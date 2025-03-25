import './Forecat.css'
import { useSelector } from 'react-redux'
import useConvert from '../../../Hooks/useConvert'

export default function Forecat({temp, time}) {

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
    <div className='forecat-main-div'>
        <p className="forecat-temprature">{convert}°</p>
        <p className="forecat-time">{formatTime(time)}</p>
    </div>
  )
}
