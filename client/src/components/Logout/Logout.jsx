import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import logoutIcon from "/assets/power-off.png"



const Logout = () => {
    //! Hooks
    const dispatch = useDispatch();


    //! Global States
    //Estado global iniciado en false que cambia a true cuando el usuario inicia sesion correctamente y luego a false cuando el usuario da clic en el boton powerOff
    const access = useSelector((state) => state.loginAccess)


    //! Functions
    //Funcion para despachar el valor false a la action logout, que luego despacha el valor false al estado global "loginAccess"
    const powerOff = () => {
        dispatch(logout(!access))
    }



    //! ===Rendering===
    return (
        <div className="m-40 flex justify-center text-red-600">
            <button className="w-40" onClick={powerOff}>
                <img src={logoutIcon} alt="powerOff" />
            </button>
        </div>
    )
}

export default Logout