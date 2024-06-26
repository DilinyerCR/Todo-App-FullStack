import React, { useEffect, useState } from 'react'
import Sun from "/assets/icon-sun.svg"
import Moon from "/assets/icon-moon.svg"



const Header = () => {
    //! Local States
    //Estado local para cambiar el tema
    const [ theme, setTheme ] = useState(() => {
        //Esto es para cambiar el tema segun el tema de tu S.O
        if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        }
        return  "light";
    }); 


    //! useEffects
    //useEffect para cambiar el tema
    useEffect(() => {
        if(theme === "dark") {
        document.querySelector("html").classList.add("dark")
        } else {
        document.querySelector("html").classList.remove("dark")
        }
    }, [theme])


    //! Functions
    const handleChangeTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ?  "dark" : "light")
    };


    //! ===Rendering===
    return (
        <div>
            <div className="bg-center bg-cover bg-no-repeat bg-mobile-light dark:bg-mobile-dark h-200 py-45 px-25 flex justify-between lg:bg-desktop-light lg:dark:bg-desktop-dark md:px-140 lg:px-300 xl:px-410 lg:h-300 lg:py-70">
                <h1 className="font-bold text-25 text-white tracking-12 lg:text-36">TODO</h1>
                <button className="h-30" onClick={handleChangeTheme}>
                <img className='lg:w-35' src={theme === "light" ? Moon : Sun} alt="Sun" />
                </button>
            </div>
        </div>
    )
}

export default Header