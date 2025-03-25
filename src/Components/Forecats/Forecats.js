import './Forecats.css'
import Forecat from './Forecat/Forecat'
import ForecatLoading from './ForecatLoading/ForecatLoading'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Forecats() {

  const [allForecat, setAllForecat] = useState([])

  const selector = useSelector(state => state.weather)

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selector.cityName}&appid=ab9e62f3f593efb75b362abb53df88c3`)
    .then(res => res.json())
    .then(res => {
      let forecats = []
      for(let i = 0; i <= 2; i++){
        forecats.push({
          temp: res.list[i].main.temp,
          time: res.list[i].dt_txt.split(' ')[1]
        })
      }
      setAllForecat(forecats)
    })
  },[])

  return (
    <div className='forecats-main-div'>
        <p className='forecats-title'>Forecasts</p>
        <div className="forecats-div">
          {allForecat.length == 3 ? 
          allForecat.map((forecat, index) => <Forecat {...forecat} key={index}  />) :
          <>
            <ForecatLoading />
            <ForecatLoading />
            <ForecatLoading />
          </>}
        </div>
    </div>
  )
}