// import './App.css'
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
// import ListPatients from './components/ListPatients'

function App() {
  
  return (
    <div className='relative min-w-screen min-h-screen '>
      <div className="absolute bg-cover h-full w-full blur-sm" style={{backgroundImage: 'url(/src/assets/image_bg.jpg)'}}>
    </div>
    <div className='relative w-screen min-h-screen z-10'>
      <Header />
      <Outlet />
    </div>
    </div>
    
  )
}

export default App
