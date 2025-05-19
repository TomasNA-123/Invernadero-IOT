import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import NavBar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard';

function App() {

  return (
        <>
        <NavBar></NavBar>

        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Dashboard></Dashboard> }></Route>
            </Routes>
        </BrowserRouter> 
        
        </>
    )

}

export default App;
