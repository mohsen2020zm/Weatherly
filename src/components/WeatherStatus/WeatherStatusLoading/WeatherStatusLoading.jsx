import './WeatherStatusLoading.css'

export default function WeatherStatusLoading() {
  return (
    <div className='weather-status-load-main-div'>
        <div className="weather-status-load-l-div">
            <div className="weather-status-load-city-div">
                <div className='weather-status-load-bolder-p'></div>
            </div>
            <div className="weather-status-load-child-div">
                <div className='weather-status-load-bolder-p'></div>
                <div className='weather-status-load-p'></div>
            </div>
        </div>
        <div className="weather-status-load-r-div">
            <div className='weather-status-load-child-div'>
                <div className='weather-status-load-bold-p'></div>
                <div className='weather-status-load-p'></div>
            </div>
            <div className='weather-status-load-child-div'>
                <div className='weather-status-load-bold-p'></div>
                <div className='weather-status-load-p'></div>
            </div>
            <div className='weather-status-load-child-div'>
                <div className='weather-status-load-bold-p'></div>
                <div className='weather-status-load-p'></div>
            </div>
        </div>
    </div>
  )
}
