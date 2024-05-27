

const Task = ({name}) => { //El name viene del componente Tasks
  return (
    <div className="text-very-dark-grayish-blue dark:text-light-grayish-blue-dark">
        <div className="pl-20 h-48 flex items-center text-13  border-b border-light-grayish-blue dark:border-very-dark-grayish-blue-darker">

            <button className='mr-12 rounded-full w-24 h-24 outline outline-2 outline-light-grayish-blue dark:outline-very-dark-grayish-blue-darker'></button>

            <p className="pl-5">{name}</p>
        </div>
        
    </div>
  )
}

export default Task