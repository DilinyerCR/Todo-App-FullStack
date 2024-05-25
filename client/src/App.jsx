import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Landing from './components/LandingPage/Landing';
import Home from './components/Home/Home';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {
  //! Global States
  //Estado global para saber si el usuario existe o no
  const access = useSelector((state) => state.loginAccess)
  //useNavigate
  const navigate = useNavigate();

  //! useEffects
  //UseEffect para denegar el acceso a las rutas si access es false, si es true redirige a "/home"
  useEffect(() => {
    if(!access) {
      navigate("/")
    } else {
      navigate("/home")
    }
  }, [access, navigate])

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} /> 
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App;

//! PD: creo que es mejor hacer lo del useffect de access desde landing.jsx para que no se desloguee solo al actualizar la pagina, pero es algo que probare al final!
