import { Header, Body, Modal } from './components'
import './app.css'
import { Provider, rootStore } from './store/root'

function App() {
  return (
    <Provider value={rootStore}>
      <div className='app'>
        <Header />
        <Body />
        <Modal />
      </div>
    </Provider>
  )
}

export default App
