import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
import Sun from "/assets/icon-sun.svg"
import Moon from "/assets/icon-moon.svg"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, loginUser } from "../../redux/actions"


const Landing = () => {
  //! Global States
  //Estado global donde se almacenan todos los usuarios de la DB
  const users = useSelector((state) => state.allUsers)
  //Estado global para saber si el usuario existe o no
  const access = useSelector((state) => state.loginAccess)
  //useDispatch
  const dispatch = useDispatch();

  //! Local States
  //Estado local para cambiar el tema
  const [ theme, setTheme ] = useState("light"); 
  //Estado local para almacenar lo que se escriba el los 2 inputs del form
  const [ loginInput, setLoginInput ] = useState({
    email: "",
    password: ""
  });

  //! useEffects
  useEffect(() => {
    if(theme === "dark") {
      document.querySelector("html").classList.add("dark")
    } else {
      document.querySelector("html").classList.remove("dark")
    }
  }, [theme])

  //! Functions
  //Funcion para setear el estado local con light o dark
  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ?  "dark" : "light")
  };

  const handleChangeInput = (event) => {
    setLoginInput({
      ...loginInput,
      [event.target.name] : event.target.value  //El .name es el name="" de mis inputs
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(loginInput.email, loginInput.password)); //Asegúrate de pasar los valores correctos aquí
  };

  const login = () => {
    dispatch(getAllUsers());
    console.log(access)
  }
  

  return (
    <div>
        <div className="bg-center bg-cover bg-no-repeat bg-mobile-light dark:bg-mobile-dark h-200 py-45 px-25 flex justify-between ">
            <h1 className="font-bold text-25 text-white  tracking-12">WELCOME</h1>
            <button className="h-30" onClick={handleChangeTheme}>
              <img src={theme === "light" ? Moon : Sun} alt="Sun" />
            </button>
        </div>

        <div className="px-25 flex justify-center">

            <form className="mt-[-60px] flex flex-col justify-center items-center gap-12 rounded-6 w-full py-25 px-20 bg-very-light-gray dark:bg-very-dark-desaturated-blue caret-bright-blue shadow-md" 
            action="" onSubmit={handleSubmit} >

                <input 
                className="
                w-full h-48 py-8 px-12 rounded-6 dark:text-light-grayish-blue-dark text-very-dark-grayish-blue text-13 bg-very-light-gray dark:bg-very-dark-desaturated-blue outline outline-1 outline-very-dark-grayish-blue-dark focus:shadow-sm focus:shadow-bright-blue" 
                type="email" placeholder="Email address" name="email" value={loginInput.email} onChange={handleChangeInput}/>

                <input className="w-full h-48 py-8 px-12 rounded-6 dark:text-light-grayish-blue-dark text-very-dark-grayish-blue text-13 bg-very-light-gray dark:bg-very-dark-desaturated-blue outline outline-1 outline-very-dark-grayish-blue-dark focus:shadow-sm focus:shadow-bright-blue" 
                type="password" placeholder="Password" name="password" value={loginInput.password} onChange={handleChangeInput}/>

                {/* <Link to="/home" className="mt-10 text-light-grayish-blue text-14 w-full h-48 bg-bright-blue rounded-6 hover:bg-bright-blue-hover transition-colors duration-300 flex justify-center items-center">
                  <button className="w-full h-full" type="submit" >Log in</button>
                </Link> */}

                <button className="mt-10 text-light-grayish-blue text-14 w-full h-48 bg-bright-blue rounded-6 hover:bg-bright-blue-hover transition-colors duration-300 flex justify-center items-center" type="submit" onClick={login}>Log in</button>

                <p className="dark:text-light-grayish-blue text-very-dark-grayish-blue text-14 hover:cursor-pointer hover:underline decoration-bright-blue">Forgotten password?</p>

                <div className="w-full m-8 outline outline-1 outline-dark-grayish-blue dark:outline-very-dark-grayish-blue-dark"></div>

                <button className="text-light-grayish-blue text-14 w-4/6 h-48 bg-bright-blue rounded-6 hover:bg-bright-blue-hover transition-colors duration-300" type="submit">Create new account</button>
            </form>
        </div>
    </div>
  )
}

export default Landing