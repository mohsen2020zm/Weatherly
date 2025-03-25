import './City.css'
import useConvert from '../../../Hooks/useConvert'
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";

export default function City({city, max, min, onDelete}) {

  const Selector = useSelector(state => state.weather)

  const convertMin = useConvert(min, Selector.tempType)
  const convertMax = useConvert(max, Selector.tempType)

  return (
    <div className="city-div">
        <div className='city-weather-icon' onClick={() => onDelete(city)}>
            <IoClose />
        </div>
        <p className='city-title'>{city}</p>
        <p className='city-des'>{convertMax}°<span>/{convertMin}°</span></p>
    </div>
  )
}
