import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import NavBar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Parametros from './pages/Parametros/Parametros';

function App() {

  return (
        <>
        <NavBar></NavBar>

        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Dashboard></Dashboard> }></Route>
                <Route path='/parametros' element={ <Parametros></Parametros> }></Route>
            </Routes>
        </BrowserRouter> 
        
        </>
    )

}

export default App;
