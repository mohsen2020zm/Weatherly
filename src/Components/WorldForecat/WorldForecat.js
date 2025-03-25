import './WorldForecat.css'
import City from './City/City';
import CityLoading from './CityLoading/CityLoading';
import Modal from '../Modal/Modal';
import ErrorBox from '../ErrorBox/ErrorBox';
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from 'react';

export default function WorldForecat() {

  const [errorState, setErrorState] = useState({left: '-16.5rem'})
  
  const [showModal, setShowModal] = useState(false)
  const [allCitiesInfo, setAllCitiesInfo] = useState([])

  const firstFetch = async () => {
    let localCities = JSON.parse(localStorage.getItem('weatherlyworldfor'))
    let citiesInformation = []
    let newCityInfo = null
    if(localCities.length > 0){
      for(let cityInfo of localCities){
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInfo.city.toLowerCase()}&appid=ab9e62f3f593efb75b362abb53df88c3`)
        .then(res => res.json())
        .then(res => {
          newCityInfo = {
            city: res.name,
            min: res.main.temp_min,
            max: res.main.temp_max
          }
          citiesInformation.push(newCityInfo)
        })
      }
      setAllCitiesInfo(citiesInformation)
    }
  }
  
  useEffect(() => {
    firstFetch()
  },[])
  
  const errorHandler = mass => {
    setErrorState({
      massage: mass,
      left: '0.5rem'
    })
    setTimeout(() =>{
      setErrorState({
        left: '-16.5rem'
      })
    },4000)
  }

  const addCityHandler = city => {
    let isInCities = allCitiesInfo.some(cityInfo => cityInfo.city.toLowerCase() == city.toLowerCase())
    if(isInCities === false){
      if(allCitiesInfo.length < 3){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=ab9e62f3f593efb75b362abb53df88c3`)
        .then(res => res.json())
        .then(res => {
            if(res.cod == 200){
              let citiesInfo = [...allCitiesInfo]
              let newCityInfo = {
                city: res.name,
                min: res.main.temp_min,
                max: res.main.temp_max
              }
              citiesInfo.push(newCityInfo)
              setAllCitiesInfo(citiesInfo)
              localStorage.setItem('weatherlyworldfor', JSON.stringify(citiesInfo))
            }else{
              errorHandler('City not found')
            }
        })
      }else{
        errorHandler('You can only add 3 cities')
      }
    }else{
      errorHandler('This city has already been added')
    }
  }

  const deleteCityHandler = city => {
    let filteredCities = allCitiesInfo.filter(cityName => cityName.city != city)
    localStorage.setItem('weatherlyworldfor', JSON.stringify(filteredCities))
    setAllCitiesInfo(filteredCities)
  }

  return (
    <>
      <ErrorBox {...errorState} />
      {showModal &&
      <Modal
       onClose={() => setShowModal(false)}
       onAdd={addCityHandler} />}
      <div className='world-for-main-div'>
        <div className="world-forecat-add-city-div">
            <div className='world-forecat-add-city-btn' onClick={() => setShowModal(true)}>
                <IoMdAdd />
            </div>
            <p className='world-forecat-add-title'>World<br />forecat</p>
            <p className='world-forecat-add-des'>Add the cities you<br />are interested in</p>
        </div>
        {JSON.parse(localStorage.getItem('weatherlyworldfor')).length == allCitiesInfo.length ?
        allCitiesInfo.map(city => <City key={city.city} {...city} onDelete={deleteCityHandler} />) :
        <>
          <CityLoading />
          <CityLoading />
          <CityLoading />
        </>}
      </div>
    </>
  )
}