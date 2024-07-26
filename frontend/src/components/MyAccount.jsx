import { Fragment, useContext, useEffect } from "react"
import Nav from "./Nav"
import { CartContext } from "../contexts/AddcartContext"
import { useNavigate } from "react-router-dom"

const MyAccount = () => {
    const Navigate = useNavigate()
    const {user, logout, setUserSts, userSts} = useContext(CartContext)

    const handleLoginSignout = ()=>{
        if (userSts === true) {
            setUserSts(false)
            logout()
        } else{
            Navigate('/login')
        }
    }
    
    return (
        <Fragment>
            <Nav />
            <section className="flex text-2xl gap-5 font-bold items-center flex-col mt-20">
                <div className=" flex flex-col gap-10 md:p-20 p-5 m-5 rounded-2xl border-2 border-gray-400">
                    <p className="md:text-5xl">{userSts?'Account Details':'Sign In to access your Account'}</p>
                    <div className="flex flex-col items-center gap-10 font-semibold">
                        <div className="flex flex-col break-all gap-5">
                        <p style={{display:userSts?'block':'none'}}>Full Name: {userSts?`${user.name}`:''}</p>
                        <p style={{display:userSts?'block':'none'}}>Email: {userSts?`${user.email}`:''}</p>
                        <p style={{display:userSts?'block':'none'}}>Phone: {userSts?`${user.phone}`:''}</p>
                        </div> 
                        <div style={{backgroundColor:userSts?'gray':'rgb(12,74,110)'}} className="p-3 w-fit justify-center text-white text-center rounded-xl bg-gray-300">
                            <button onClick={handleLoginSignout}>{userSts?'Sign Out':'Login In'}</button>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default MyAccount