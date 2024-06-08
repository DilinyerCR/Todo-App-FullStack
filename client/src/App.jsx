import { Route, Routes, useNavigate } from 'react-router-dom';
import Landing from './components/LandingPage/Landing';
import Home from './components/Home/Home';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';



const App = () => {
  //! Global States
  //Estado global para saber si el usuario existe o no
  const access = useSelector((state) => state.loginAccess)
  //Estado global para obtener el valor del userId, este se obtiene al iniciar sesion en el componente Landing
  const userId = useSelector((state) => state.userId)
  //useNavigate
  const navigate = useNavigate(); //useNavigate te ayuda a controlar la navegación en tu aplicación React de manera programática, lo que significa que puedes decidir cuándo y dónde llevar al usuario sin depender de su interacción con el navegador (como hacer clic en un enlace).

  
  //! useEffects
  //UseEffect para denegar el acceso a las rutas si access es false, si es true redirige a "/home"
  useEffect(() => {
    if(!access) {
      navigate("https://todo-app-cr.vercel.app")
    } else {
      navigate(`/home/${userId}`) //Si el usuario inicia sesion, es llevado a home/ y aqui muestra el id de ese user
    }
  }, [access, navigate])



  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} /> 
        <Route path='/home/:userId' element={<Home />} />
      </Routes>
    </>
  )
}

export default App;

//! PD: creo que es mejor hacer lo del useffect de access desde landing.jsx para que no se desloguee solo al actualizar la pagina, pero es algo que probare al final!
