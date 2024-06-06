import React, { useEffect, useState } from 'react'
import Tasks from '../Tasks/Tasks'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, clearAllCompleted, filterByActives, filterByCompleted, getTasksByUser } from '../../redux/actions'
import { useParams } from 'react-router-dom'



const Main = () => {
    //! Hooks
    const dispatch = useDispatch()
    const { userId } = useParams();


    //! Global States
    //Estado global donde estan almacenadas las tasks de un user en especifico
    const tasks = useSelector((state) => state.tasksByUser);


    //! Local States
    //Estado local para almacenar lo que se escriba en el input
    const [inputValue, setInputValue] = useState({ name: "" })
    //Estado local para almacenar al cantidad de tareas NO completadas
    const [itemsLeft, setItemsLeft] = useState(!tasks.completed); // Inicializar itemsLeft con la cantidad total de tareas en false (useState(!tasks.completed) es igual que colocar useState(!tasks.completed === false))

    const [activeButton, setActiveButton] = useState(false);
    const [completedButton, setCompletedButton] = useState(false);
    const [allButton, setAllButton] = useState(true);


    //! useEffects
    useEffect(() => {
        // Contar cuántas tareas están completadas
        const completedTasksCount = tasks.filter(task => task.completed).length;
        // Restar las tareas completadas a itemsLeft(itemsLeft son las no completadas)
        setItemsLeft(tasks.length - completedTasksCount);
    }, [tasks]);


    //! Functions
   //Funcion para setear el estado local inputValue con el valor del input de este componente
    const handleChangeInput = (event) => {
        setInputValue({
          ...inputValue,
          [event.target.name] : event.target.value  //El .name es el name="" de mis inputs
        })
    }

    //Funcion para despachar mediante la action "addTask" el userId obtenido con el useParams y el valor del input, siempre y cuando el valor del input sea mayor a 1
    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.name.length > 1) {  //El input debe tener 2 o mas caracteres para agregar la task
            dispatch(addTask(userId, inputValue));
            setInputValue({ name: "" }); //PD: colocar el value del input(value={inputValue.name}), Sino no lo limpia.
        }
    }

    //Funcion para despachar el userId mediante la action clearAllCompleted al hacer clic en el boton clear completed.
    const clearCompleted = () => {
        dispatch(clearAllCompleted(userId))
    }

    //Funcion para despachar el userId a las action getTasksByUser y filterByCompleted
    const handleCompletedTasks = () => {
        setActiveButton(true)
        setCompletedButton(false)
        setAllButton(false)
        dispatch(getTasksByUser(userId)) //Primero carga todas las tasks del backend
        dispatch(filterByCompleted(userId)) //Luego filtra por Completed
    }

    //Funcion para despachar el userId a las action getTasksByUser y filterByActives
    const handleActivesTasks = () => {
        setActiveButton(false)
        setCompletedButton(true)
        setAllButton(false)
        dispatch(getTasksByUser(userId)) //Primero carga todas las tasks del backend
        dispatch(filterByActives(userId)) //Luego filtra por Actives
    }

    //Funcion para despachar el userId a las action getTasksByUser
    const handleAllTasks = () => {
        setActiveButton(false)
        setCompletedButton(false)
        setAllButton(true)
        dispatch(getTasksByUser(userId)) //Carga todas las tasks desde el backend
    }



    //! ===Rendering===
    return (
        <div className="px-25 md:px-140 lg:px-300 xl:px-400">
            
            <div className="mt-[-90px] lg:mt-[-130px]">
                <div>
                    <form className='pl-20 pr-15 h-48 bg-very-light-gray rounded-6 flex items-center text-13 dark:bg-very-dark-desaturated-blue xl:h-60 xl:text-14' onSubmit={handleSubmit}>

                        <button className='mr-12 rounded-full w-22 h-22 outline outline-1 outline-light-grayish-blue dark:outline-very-dark-grayish-blue-darker xl:w-24 xl:h-24 xl:outline-2'></button>

                        <input className='pl-5 w-[88%] h-full border-none outline-none rounded-6 text-very-dark-grayish-blue bg-very-light-gray dark:bg-very-dark-desaturated-blue dark:text-light-grayish-blue-dark caret-bright-blue' type="text" placeholder='Create a new todo...' name="name" value={inputValue.name} onChange={handleChangeInput} />
                    </form>
                </div>

                <div className='mt-18 rounded-6 bg-very-light-gray dark:bg-very-dark-desaturated-blue shadow-lg '>
                    <div className=''>
                        <Tasks />
                    </div>

                    <div className='px-20 h-48 flex items-center text-13 justify-between xl:h-60'>
                        <p className="w-75 text-dark-grayish-blue  dark:text-dark-grayish-blue-dark xl:text-14">{itemsLeft} items left</p>
                        
                        {/* Este div de abajo se muestra solo en desktop y tablet */}
                        <div className='hidden h-48 bg-very-light-gray rounded-6 items-center justify-center gap-20 text-14 font-semibold text-dark-grayish-blue dark:text-dark-grayish-blue-dark dark:bg-very-dark-desaturated-blue md:flex md:gap-15'>

                            <button className={`hover:text-very-dark-grayish-blue  ${allButton ? 'text-bright-blue' : 'dark:hover:text-light-grayish-blue'}`} onClick={handleAllTasks}>All</button>

                            <button className={`hover:text-very-dark-grayish-blue  ${completedButton ? 'text-bright-blue' : 'dark:hover:text-light-grayish-blue'}`} onClick={handleActivesTasks}>Active</button>

                            <button className={`hover:text-very-dark-grayish-blue  ${activeButton ? 'text-bright-blue' : 'dark:hover:text-light-grayish-blue'}`} onClick={handleCompletedTasks}>Completed</button>

                        </div>
                        {/* Este div de arriba se muestra solo en desktop y tablet*/}
                        
                        <button className="w-115 text-dark-grayish-blue dark:text-dark-grayish-blue-dark hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue xl:text-14" onClick={clearCompleted}>Clear Completed</button>
                    </div>
                </div>

                {/* Este div de abajo se muestra solo en mobile */}
                <div className='mt-18 h-48 bg-very-light-gray rounded-6 flex items-center justify-center gap-20 text-14 font-semibold 
                text-dark-grayish-blue dark:text-dark-grayish-blue-dark dark:bg-very-dark-desaturated-blue md:hidden'>

                    <button className={`hover:text-very-dark-grayish-blue  ${allButton ? 'text-bright-blue' : 'dark:hover:text-light-grayish-blue'}`} onClick={handleAllTasks}>All</button>

                    <button className={`hover:text-very-dark-grayish-blue  ${completedButton ? 'text-bright-blue' : 'dark:hover:text-light-grayish-blue'}`} onClick={handleActivesTasks}>Active</button>

                    <button className={`hover:text-very-dark-grayish-blue  ${activeButton ? 'text-bright-blue' : 'dark:hover:text-light-grayish-blue'}`} onClick={handleCompletedTasks}>Completed</button>
                </div>
                {/* Este div de arriba se muestra solo en mobile */}

            </div>

            <div className='mt-40 text-center text-dark-grayish-blue dark:text-dark-grayish-blue-dark text-13 lg:text-15'>
                <p>Drag and drop to reorder list</p>
            </div>
        </div>
    )
}

export default Main
