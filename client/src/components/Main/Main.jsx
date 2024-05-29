import React, { useEffect, useState } from 'react'
import Tasks from '../Tasks/Tasks'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, clearAllCompleted, getTasksByUser } from '../../redux/actions'
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



    //! ===Rendering===
    return (
        <div className="px-25">
            
            <div className="mt-[-90px]">
                <div>
                    <form className='pl-20 pr-15 h-48 bg-very-light-gray rounded-6 flex items-center text-13 dark:bg-very-dark-desaturated-blue' onSubmit={handleSubmit}>

                        <button className='mr-12 rounded-full w-24 h-24 outline outline-2 outline-light-grayish-blue dark:outline-very-dark-grayish-blue-darker'></button>

                        <input className='pl-5 w-[88%] h-full border-none outline-none rounded-6 text-very-dark-grayish-blue bg-very-light-gray dark:bg-very-dark-desaturated-blue dark:text-light-grayish-blue-dark caret-bright-blue' type="text" placeholder='Create a new todo...' name="name" value={inputValue.name} onChange={handleChangeInput}/>
                    </form>
                </div>

                <div className='mt-18 rounded-6 bg-very-light-gray dark:bg-very-dark-desaturated-blue shadow-lg '>
                    <div className=''>
                        <Tasks />
                    </div>

                    <div className='px-20 h-48 flex items-center text-13 '>
                        <p className="text-dark-grayish-blue  dark:text-dark-grayish-blue-dark">{itemsLeft} items left</p>
                        {/* Este div de abajo se muestra solo en desktop */}
                        <div className='invisible'>
                            <button>All</button>
                            <button>Active</button>
                            <button>Completed</button>
                            
                        </div>
                        {/* Este div de arriba se muestra solo en desktop */}
                        <button className="text-dark-grayish-blue dark:text-dark-grayish-blue-dark hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue" onClick={clearCompleted}>Clear Completed</button>
                    </div>
                </div>

                {/* Este div de abajo se muestra solo en mobile */}
                <div className='mt-18 h-48 bg-very-light-gray rounded-6 flex items-center justify-center gap-20 text-14 font-semibold 
                text-dark-grayish-blue dark:text-dark-grayish-blue-dark dark:bg-very-dark-desaturated-blue'>
                    <button className="hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue">All</button>
                    <button className="hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue">Active</button>
                    <button className="hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue">Completed</button>
                </div>
                {/* Este div de arriba se muestra solo en mobile */}

            </div>

            <div className='mt-40 text-center text-dark-grayish-blue dark:text-dark-grayish-blue-dark text-13'>
                <p>Drag and drop to reorder list</p>
            </div>
        </div>
    )
}

export default Main