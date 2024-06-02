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

  // Funcion para cerrar o eliminar una tarea de un usuario especifico, despacha el id de la tarea y el userId del usuario.
  const handleCloseTask = () => {
    dispatch(closeTask(id, userId))
  }
  


  //! ===Rendering===
  return (
    <div className="text-very-dark-grayish-blue dark:text-light-grayish-blue-dark">

      <div className="pl-20 min-h-48 flex items-center text-13 border-b border-light-grayish-blue dark:border-very-dark-grayish-blue-darker xl:h-60">

          <div className={`mr-12 w-24 h-24 rounded-full bg-light-grayish-blue dark:bg-very-dark-grayish-blue-darker flex justify-center items-center hover:bg-gradient-to-r from-custom-blue to-custom-purple 
            ${completed ? 'bg-gradient-to-r from-custom-blue to-custom-purple' : 'dark:bg-very-dark-desaturated-blue'} xl:w-28 xl:h-28`} >
              {/* El div esta detras del boton y hace de border(outline) ya que es un poco mas grande, esto es debido a que no se puede colocar un border con linerar gradient*/}
              <button className={`rounded-full w-22 h-22 flex justify-center items-center bg-very-light-gray 
              ${completed ? 'bg-gradient-to-r from-custom-blue to-custom-purple' : 'dark:bg-very-dark-desaturated-blue'} xl:w-24 xl:h-24`}
              onClick={handleButtonClick}>
                
                {completed && <img src={checkIcon} alt="checkIcon" />}
              
              </button>
  
              {/* Tailwind no ofrece una utilidad directa para especificar el ángulo del gradiente en sus clases predefinidas, por eso uso el gradient sin angulo de inclinacion, en vez de eso lo uso de derecha a ezquierda */}
          </div>

          <div className="flex justify-between w-[80%] md:w-[88%]">
            <p className={`pl-5 pt-10 pb-10 pr-10 ${completed? 'line-through dark:text-very-dark-grayish-blue-dark text-light-grayish-blue' : 'no-underline'} xl:text-14`}>{name}</p>
            <div className="flex justify-center items-center">
              <button className="w-13 h-13 xl:w-16 xl:h-16" onClick={handleCloseTask}>
                <img className="w-13 h-13 xl:w-16 xl:h-16" src={crossIcon} alt="crossIcon" />
              </button>
            </div>
          </div>

      </div> 
       
    </div>
  )
}

export default Task
