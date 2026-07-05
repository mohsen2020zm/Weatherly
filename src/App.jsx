import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { Provider } from 'react-redux'
import { Store } from './redux/Store'
import { useEffect } from 'react'

function App() {

  JSON.parse(localStorage.getItem('weatherlyworldfor')) || localStorage.setItem('weatherlyworldfor', JSON.stringify([]))
  
  return (
    <>
      <Provider store={Store}>
        <Header />
        <Main />
      </Provider>
    </>
  )
}

export default App
