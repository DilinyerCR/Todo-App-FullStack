import { useDispatch, useSelector } from "react-redux"
import Task from "../Task/Task"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { updateTasksOrder } from "../../redux/actions"



const Tasks = () => {
  //! Hooks
  //useDispatch
  const dispatch = useDispatch()
  
  
  //! Global States
  //Estado global donde se almacenan todas las tasks de un usuario en especifico
  const tasksByUser = useSelector((state) => state.tasksByUser)


  //! Functions
  //Funcion para manejar el drag and drop de los elementos
  const handleDragEnd = (event) => {
    const { active, over} = event

    const oldIndex = tasksByUser.findIndex(task => task.id === active.id)
    const newIndex = tasksByUser.findIndex(task => task.id === over.id)

    if (oldIndex!== -1 && newIndex!== -1) { 
      const newOrder = arrayMove(tasksByUser, oldIndex, newIndex);
      dispatch(updateTasksOrder(newOrder));
    }
  }


  
  //! ===Rendering===
  return (

    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >


      <SortableContext
        items={tasksByUser}
        strategy={verticalListSortingStrategy}
      >
        {
          tasksByUser?.map((task) => {
            return <Task
            //task es un objeto con propiedades y valores, aqui le paso esas propiedades y valores al componente Task
            key={task.id} //Si no le pongo key, React se molesta
            name={task.name}
            completed={task.completed}
            id={task.id}
            />
          })
        }
      </SortableContext>


    </DndContext>

  )
}

export default Tasks