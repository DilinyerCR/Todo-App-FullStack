import { useSelector } from "react-redux"
import Task from "../Task/Task"



const Tasks = () => {
  //! Global States
  //Estado global donde se almacenan todas las tasks de un usuario en especifico
  const tasksByUser = useSelector((state) => state.tasksByUser)

  return (
    <div>
        {
          tasksByUser?.map((task) => {
            return <Task
            //task es un objeto con propiedades y valores, aqui le paso esas propiedades y valores al componente Task
            key={task.id} //Si no le pongo key, React se molesta
            name={task.name}
            completed={task.completed}
            />
          })
        }
    </div>
  )
}

export default Tasks