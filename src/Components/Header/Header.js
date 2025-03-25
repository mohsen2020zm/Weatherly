import './Header.css'
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { setName, setTempType } from '../../Store';
import { useDispatch, useSelector } from 'react-redux'

export default function Header() {

  const [search, setSearch] = useState('')
  const [tempBtnStyle, setTempBtnStyle] = useState('0')
  
  const date = new Date()

  const Selector = useSelector(state => state.weather)
  useEffect(() => Selector.tempType == 'f' ? setTempBtnStyle('translateX(2.5rem)') : setTempBtnStyle('translateX(0)'),[])

  const disPatch = useDispatch()
  
  const searchCityHandler = () => {
    if(search.length > 0){
      disPatch(setName({name: search}))
      setSearch('')
    }
  }

  const changeType = (tran, tempType) => {
    setTempBtnStyle(`translateX(${tran})`)
    localStorage.setItem('weatherlytemptype', tempType)
    disPatch(setTempType({type: tempType}))
  }
  
  return (
    <header>
      <div className="container">
          <div className="header-flex-main-div">
            <p className="header-date">{`${date.toLocaleDateString('en-US', {weekday: 'short'})}, ${date.getDate()} ${date.toLocaleDateString('en-US', {month: 'short'})}, ${date.getFullYear()}`}</p>
            <div className="header-right-div">
              <div className="header-search-input-div">
                <div className="header-search-input-icon-div" onClick={() => searchCityHandler()}>
                  <IoSearchSharp />
                </div>
                <input
                type="text" 
                placeholder="Search  city..." 
                className='header-search-input'
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key == 'Enter' && searchCityHandler()}/>
              </div>
              <div className="header-temprature-type-main-div">
                <div className="header-temprature-selection" style={{transform: tempBtnStyle}}></div>
                <p className="header-temprature-c" onClick={() => changeType('0', 'c')}>C °</p>
                <p className="header-temprature-f" onClick={() => changeType('2.5rem', 'f')}>F °</p>
              </div>
            </div>
          </div>
      </div>
    </header>
  )
}
