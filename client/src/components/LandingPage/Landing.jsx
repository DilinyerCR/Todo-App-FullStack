import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Sun from "/assets/icon-sun.svg"
import Moon from "/assets/icon-moon.svg"
import { createUser, getAllUsers, loginUser } from "../../redux/actions"
import validator from "./landingValidation"
import { useNavigate } from "react-router-dom"



const Landing = () => {
  //! Hooks
  //useDispatch
  const dispatch = useDispatch();
  //useNavigate
  const navigate = useNavigate(); //useNavigate te ayuda a controlar la navegación en tu aplicación React de manera programática, lo que significa que puedes decidir cuándo y dónde llevar al usuario sin depender de su interacción con el navegador (como hacer clic en un enlace).


  //! Global States
  //Estado global para saber si el usuario existe o no
  const access = useSelector((state) => state.loginAccess)
  //Estado blobal que almacena el userId del usuario que inicio sesion
  const userId = useSelector((state) => state.userId)
  //Estado global para saber si el usuario fue creado con exito
  const created = useSelector((state) => state.userCreated)
  //Estado global para saber si el usuario ya existe
  const isTaken = useSelector((state) => state.userTaken)


  //! Local States
  //Estado local para cambiar el tema
  const [ theme, setTheme ] = useState(() => {
    //Esto es para cambiar el tema segun el tema de tu S.O
    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
      return  "light";
  }); 

  //Estado local para almacenar lo que se escriba el los 2 inputs del form
  const [ loginInput, setLoginInput ] = useState({
    email: "",
    password: ""
  });

  //Estado local para almacenar los posibles errores al llenar el formulario
  const [ errors, setErrors ] = useState({});

  //Estado local para controlar la visibilidad del mensaje de email ya en uso
  const [isTakenMessage, setIsTakenMessage] = useState(false);

  //Estado local para controlar la visibilidad del mensaje de registro exitoso
  const [createdMessage, setCreatedMessage] = useState(false);


  //! useEffects
  //UseEffect para denegar el acceso a las rutas si access es false, si es true redirige a "/home"
  useEffect(() => {
    if(!access) {
      navigate("/")
    } else {
      navigate(`/home/${userId}`) //Si el usuario inicia sesion, es llevado a home/ y aqui muestra el id de ese user
    }
  }, [access, navigate])


  //useEffect para cambiar el tema
  useEffect(() => {
    if(theme === "dark") {
      document.querySelector("html").classList.add("dark")
    } else {
      document.querySelector("html").classList.remove("dark")
    }
  }, [theme])

  //useEffect para ejecutar getAllUsers cuando el componente se monta
  useEffect(() => {
    dispatch(getAllUsers());
    if(created) {
      dispatch(getAllUsers());
    }
  }, [created]);

  //useEffect para controlar la visibilidad de isTaken durante 5 segundos
    useEffect(() => {
      if (!isTaken) return; // No hacer nada si isTaken es falso
      setIsTakenMessage(true); // Mostrar el mensaje
      const timer = setTimeout(() => {
        setIsTakenMessage(false); // Ocultar el mensaje después de 4 segundos
      }, 5000);
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }, [isTaken]);

  //useEffect para controlar la visibilidad de created durante 5 segundos
    useEffect(() => {
      if (!created) return; // No hacer nada si isTaken es falso
      setCreatedMessage(true); // Mostrar el mensaje
      const timer = setTimeout(() => {
        setCreatedMessage(false); // Ocultar el mensaje después de 4 segundos
      }, 5000); 
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }, [created]);


  //! Functions
  //Funcion para setear el estado local con light o dark
  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ?  "dark" : "light")
  };

  //Funcion para setear el estado local loginInput y errors con el valor de los inputs
  const handleChangeInput = (event) => {
    setLoginInput({
      ...loginInput,
      [event.target.name] : event.target.value  //El .name es el name="" de mis inputs
    })

    setErrors(validator({
      ...loginInput,
      [event.target.name] : event.target.value
    }))
  }

  //Funcion para prevenir que se recargue la pagina en los submits del form
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //Funcion para logear, despacha el valor de los inputs a la action loginUser
  const login = () => {
    dispatch(loginUser(loginInput.email, loginInput.password));
  }

  //Funcion para crear nuevos usuarios, despacha el valor de los inputs a la action createUser
  const createNewUser = () => {
    dispatch(createUser(loginInput.email, loginInput.password));
    setLoginInput({
      email: "",
      password: ""
    });
    dispatch(getAllUsers());
  }



  //! ===Rendering===
  return (
    <div>
        <div className="bg-center bg-cover bg-no-repeat bg-mobile-light dark:bg-mobile-dark h-200 py-45 px-25 flex justify-between lg:bg-desktop-light lg:dark:bg-desktop-dark md:px-180 lg:px-300 xl:px-465 lg:h-300 lg:py-70">
            <h1 className="font-bold text-25 text-white tracking-12 lg:text-35">WELCOME</h1>
            <button className="h-30" onClick={handleChangeTheme}>
              <img className="lg:h-34" src={theme === "light" ? Moon : Sun} alt="Sun" />
            </button>
        </div>

        <div className="px-25 flex justify-center md:px-180 lg:px-300 xl:px-465">

            <form className="mt-[-60px] flex flex-col justify-center items-center gap-12 rounded-6 w-full py-25 px-20 bg-very-light-gray dark:bg-very-dark-desaturated-blue caret-bright-blue shadow-md lg:mt-[-130px] xl:py-35 xl:px-35" onSubmit={handleSubmit} >

                <input 
                className="
                w-full h-48 py-8 px-12 rounded-6 dark:text-light-grayish-blue-dark text-very-dark-grayish-blue text-13 bg-very-light-gray dark:bg-very-dark-desaturated-blue outline outline-1 outline-very-dark-grayish-blue-dark focus:shadow-sm focus:shadow-bright-blue" 
                type="email" placeholder="Email address" name="email" value={loginInput.email} onChange={handleChangeInput}/>

                {errors.email && (<p className="text-red-800 text-12 dark:text-red-500">{errors.email}</p>)}

                <input className="w-full h-48 py-8 px-12 rounded-6 dark:text-light-grayish-blue-dark text-very-dark-grayish-blue text-13 bg-very-light-gray dark:bg-very-dark-desaturated-blue outline outline-1 outline-very-dark-grayish-blue-dark focus:shadow-sm focus:shadow-bright-blue" 
                type="password" placeholder="Password" name="password" value={loginInput.password} onChange={handleChangeInput}/>

                {errors.password && (<p className="text-red-800 text-12 dark:text-red-500">{errors.password}</p>)}

                <button className="mt-10 text-light-grayish-blue text-14 w-full h-48 bg-bright-blue rounded-6 hover:bg-bright-blue-hover transition-colors duration-300 flex justify-center items-center" type="submit" onClick={login} disabled={errors.email ||errors.password} >Log in</button>

                <p className="dark:text-light-grayish-blue text-very-dark-grayish-blue text-14 hover:cursor-pointer hover:underline decoration-bright-blue">Forgotten password?</p>

                <div className="w-full m-8 outline outline-1 outline-dark-grayish-blue dark:outline-very-dark-grayish-blue-dark"></div>

                <button className="text-light-grayish-blue text-14 w-4/6 h-48 bg-bright-blue rounded-6 hover:bg-bright-blue-hover transition-colors duration-300" type="submit" onClick={createNewUser} disabled={errors.email ||errors.password}>Create new account</button>

                {isTakenMessage && isTaken && <p className="mt-10 text-red-800 text-12 dark:text-red-500">"That email is already in use."</p>}

                {createdMessage && created && <p className="mt-10 text-green-800 text-12 dark:text-green-500">"Congratulations, Your registration was successful."</p>}

            </form>
        </div>
    </div>
  )
}

export default Landing