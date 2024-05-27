import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../Header/Header'
import Main from '../Main/Main'
import { getTasksByUser } from '../../redux/actions';



const Home = () => {
  //! Hooks
  //useDispatch
  const dispatch = useDispatch();
  //useParams
  const { userId } = useParams(); //El useParams permite acceder a los parámetros dinámicos de la URL en tus componentes de React (en este caso el userId: "47cbdba8-f9d9-4fe7-a388-d2fc955b2b38" URL: "/home/:userId").
  //El useParams, accede a ese parámetro dinámico solo del componente que esta renderizando ese parametro o un componente dentro de ese, en este casi el que renderiza es Home, y puedo usar el useParams tambien en los que Home renderiza, ejemplo: "Main"


  //! useEffects
  useEffect(() => {
    dispatch(getTasksByUser(userId));
  }, [dispatch]);



  //! ===Rendering===
  return (
    <div>
      <Header/>
      <Main/>
    </div>
  )
}

export default Home