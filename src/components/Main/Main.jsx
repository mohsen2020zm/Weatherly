import './Main.css'
import WeatherStatus from '../WeatherStatus/WeatherStatus';
import Forecasts from '../Forecasts/Forecasts';
import WorldForecat from '../WorldForecat/WorldForecat';

export default function Main() {
  return (
    <main>
        <div className="container">
            <div className='main-flex-div'>
                <div className="main-l-flex-div">
                    <WeatherStatus />
                    <WorldForecat />
                </div>
                <div className="main-r-flex-div">
                    <Forecasts />
                </div>
            </div>
        </div>
    </main>
  )
}