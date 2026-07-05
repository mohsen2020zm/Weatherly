import './Header.css'
import { IoSearchSharp } from "react-icons/io5";
import { MdNightlight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useEffect, useState } from 'react';
import { setName, setTempType } from '../../redux/Store';
import { useDispatch, useSelector } from 'react-redux'

export default function Header() {
  
  const [search, setSearch] = useState('')
  const [tempBtnStyle, setTempBtnStyle] = useState('0')
  const [themeMode, setThemeMode] = useState('dark')
  
  const date = new Date()
  
  const Selector = useSelector(state => state.weather)
  const disPatch = useDispatch()
  
  const themes = {
    dark: {
      "--bg-color": "#232931",
      "--elems-color": "#393e46",
      "--text-color": "#eeeeee",
      "--loading-color": "#ffffff0f"
    },
    light: {
      "--bg-color": "#dbe0eb",
      "--elems-color": "#f4f8ff",
      "--text-color": "#303438",
      "--loading-color": "#0000000f"
    }
  }

  useEffect(() => {
    if(localStorage.getItem('weatherlytheme') === 'light'){
      setThemeMode('light')
      applyTheme('light')
    }else{
      setThemeMode('dark')
      applyTheme('dark')
    }
    Selector.tempType == 'f' ? setTempBtnStyle(`translateX(${window.innerWidth > 768 ? '2.5rem' : '2rem'})`) : setTempBtnStyle('translateX(0)')
  },[])

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

  const changethemeMode = () => {
    if(themeMode === 'light'){
      setThemeMode('dark')
      applyTheme('dark')
      localStorage.setItem('weatherlytheme', 'dark')
    }else{
      setThemeMode('light')
      applyTheme('light')
      localStorage.setItem('weatherlytheme', 'light')
    }
  }

  const applyTheme = theme => {
    const root = document.documentElement
    Object.entries(themes[theme]).forEach(([key, value]) => root.style.setProperty(key, value))
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
                placeholder="City Name..." 
                className='header-search-input'
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key == 'Enter' && searchCityHandler()}/>
              </div>
              <div className='change-theme-btn' onClick={changethemeMode}>
                {themeMode === 'light' ? <MdNightlight /> : <MdLightMode />}
              </div>
              <div className="header-temprature-type-main-div">
                <div className="header-temprature-selection" style={{transform: tempBtnStyle}}></div>
                <p className="header-temprature-c" onClick={() => changeType('0', 'c')}>C °</p>
                <p className="header-temprature-f" onClick={() => changeType(window.innerWidth > 768 ? '2.5rem' : '2rem', 'f')}>F °</p>
              </div>
            </div>
          </div>
      </div>
    </header>
  )
}
