import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { Provider } from 'react-redux'
import { Store } from './Store'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    JSON.parse(localStorage.getItem('weatherlyworldfor')) || localStorage.setItem('weatherlyworldfor', JSON.stringify([]))
  },[])

  return (
    <>
      <Provider store={Store}>
        <Header />
        <Main />
      </Provider>
    </>
  );
}

export default App;
