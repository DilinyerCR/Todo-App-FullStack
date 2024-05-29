import { useDispatch } from "react-redux";
import { closeTask, completedTask } from "../../redux/actions";
import checkIcon from "/assets/icon-check.svg";
import crossIcon from "/assets/icon-cross.svg"
import { useParams } from "react-router-dom";



const Task = ({name, completed, id}) => { //El name viene del componente Tasks
  //! Hooks
  const dispatch = useDispatch()
  const { userId } = useParams();


  //! Functions
  // Función para manejar el evento click en el botón, y despachar el id de la tarea mediante la action completedTask(). (el id es obtenido por props)
  const handleButtonClick = () => {
    dispatch(completedTask(id))
  };

  // Funcion para...
  const handleCloseTask = () => {
    dispatch(closeTask(id, userId))
  }
  


  
  //! ===Rendering===
  return (
    <div className="text-very-dark-grayish-blue dark:text-light-grayish-blue-dark">

      <div className="pl-20 h-48 flex items-center text-13  border-b border-light-grayish-blue dark:border-very-dark-grayish-blue-darker ">

          <div className={`mr-12 w-28 h-28 rounded-full bg-light-grayish-blue dark:bg-very-dark-grayish-blue-darker flex justify-center items-center hover:bg-gradient-to-r from-custom-blue to-custom-purple 
            ${completed ? 'bg-gradient-to-r from-custom-blue to-custom-purple' : 'dark:bg-very-dark-desaturated-blue'}`} >
              {/* El div esta detras del boton y hace de border(outline) ya que es un poco mas grande, esto es debido a que no se puede colocar un border con linerar gradient*/}
              <button className={`rounded-full w-24 h-24 flex justify-center items-center  bg-very-light-gray 
              ${completed ? 'bg-gradient-to-r from-custom-blue to-custom-purple' : 'dark:bg-very-dark-desaturated-blue'}`}
              onClick={handleButtonClick}>
                
                {completed && <img src={checkIcon} alt="checkIcon" />}
              
              </button>
  
              {/* Tailwind no ofrece una utilidad directa para especificar el ángulo del gradiente en sus clases predefinidas, por eso uso el gradient sin angulo de inclinacion, en vez de eso lo uso de derecha a ezquierda */}
          </div>

          <div className="flex justify-between w-[80%]">
            <p className={`pl-5 ${completed? 'line-through dark:text-very-dark-grayish-blue-dark text-light-grayish-blue' : 'no-underline'}`}>{name}</p>
            <button onClick={handleCloseTask}>
              <img className="w-13 h-13" src={crossIcon} alt="crossIcon" />
            </button>
          </div>

      </div> 
       
    </div>
  )
}

export default Task
