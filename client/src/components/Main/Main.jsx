import React, { useState } from 'react'
import Tasks from '../Tasks/Tasks'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/actions'
import { useParams } from 'react-router-dom'



const Main = () => {
    //! Hooks
    const dispatch = useDispatch()
    const { userId } = useParams();
    

    //! Local States
    //Estado local para almacenar lo que se escriba en el input
    const [inputValue, setInputValue] = useState({ name: "" })

    const handleChangeInput = (event) => {
        setInputValue({
          ...inputValue,
          [event.target.name] : event.target.value  //El .name es el name="" de mis inputs
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.name.length > 1) {  //El input debe tener 2 o mas caracteres para agregar la task
            dispatch(addTask(userId, inputValue));
            setInputValue({ name: "" }); //PD: colocar el value del input(value={inputValue.name}), Sino no lo limpia.
        }
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

                <div className='mt-18 rounded-6 bg-very-light-gray dark:bg-very-dark-desaturated-blue'>
                    <div className=''>
                        <Tasks />
                    </div>

                    <div className='px-20 h-48 flex items-center text-13 '>
                        <p className="text-dark-grayish-blue  dark:text-dark-grayish-blue-dark">5 items left</p>
                        {/* Este div de abajo se muestra solo en desktop */}
                        <div className='invisible'>
                            <button>All</button>
                            <button>Active</button>
                            <button>Completed</button>
                            
                        </div>
                        {/* Este div de arriba se muestra solo en desktop */}
                        <button className="text-dark-grayish-blue dark:text-dark-grayish-blue-dark">Clear Completed</button>
                    </div>
                </div>

                {/* Este div de abajo se muestra solo en mobile */}
                <div className='mt-18 h-48 bg-very-light-gray rounded-6 flex items-center justify-center gap-20 text-15 font-semibold 
                text-dark-grayish-blue dark:text-dark-grayish-blue-dark dark:bg-very-dark-desaturated-blue'>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
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