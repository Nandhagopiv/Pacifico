import { Fragment, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../contexts/AddcartContext"

const Login = () => {
    const {login, setUserSts} = useContext(CartContext)
    const Navigate = useNavigate()
    const [mail, setMail] = useState('')
    const [loginPass, setLoginPass] = useState('')
    const [loginSts, setLoginSts] = useState(true)
    const [hide, setHide] = useState(true)


    const handleLoginPass = (e) => {
        setLoginPass(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHide(false)
        await axios.get(`http://localhost:5000/login?enteredmail=${mail}&enteredpass=${loginPass}`).then( async(data) => {
            if (data.data === false) {
                setLoginSts(false)
            } else {
                const response = await axios.get(`http://localhost:5000/getusercred?email=${mail}`);
                const data = response.data;
                Navigate('/')
                login(data)
                setUserSts(true)
            }
        })
        setHide(true)
    }

    const handleMail = (e) => {
        setMail(e.target.value)
    }
    return (
        <Fragment>
            <section style={{ display: hide ? 'none' : 'flex', backgroundColor: 'rgba(228,228,231,0.50)' }} className="fixed bg-zinc-200 justify-center items-center z-40 w-[100%] h-[100%] font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
            <section className="flex justify-center mt-[50%] sm:mt-[10%]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[70%] sm:w-[25%]">
                    <h1 className="text-5xl my-2 font-bold">Login</h1>
                    <p style={{ color: loginSts ? 'skyblue' : 'red' }} className="pb-2">{
                        loginSts ? 'You can Login here:)' : 'Incorrect Email or Password'
                    }</p>
                    <input required value={mail} onChange={handleMail} className="bg-slate-200 p-2 rounded-lg w-[100%] outline-none" type="email" placeholder="Enter your Mobile or Email"></input>
                    <input required value={loginPass} onChange={handleLoginPass} className="bg-slate-200 p-2 w-[100%] rounded-lg outline-none" type="password" placeholder="Enter your Password"></input>
                    <button className="font-bold p-2 bg-black text-white rounded-lg" type="submit">Login</button>
                    <p className="pt-2">Don't have an account? <Link to={'/signup'} className="underline font-semibold text-black">Signup</Link></p>
                </form>
            </section>
        </Fragment>
    )
}

export default Login