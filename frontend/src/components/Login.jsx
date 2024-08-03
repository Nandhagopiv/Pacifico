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
        await axios.get(`https://pacifico.onrender.com/login?enteredmail=${mail}&enteredpass=${loginPass}`).then( async(data) => {
            if (data.data === false) {
                setLoginSts(false)
            } else {
                const response = await axios.get(`https://pacifico.onrender.com/getusercred?email=${mail}`);
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
            <section
                style={{
                    display: hide ? 'none' : 'flex',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}
                className="fixed inset-0 flex items-center justify-center z-40"
            >
                <div className="loadicon md:h-16 md:w-16 h-12 w-12 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </section>

            <section className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col gap-6 m-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-md sm:w-3/4 md:w-1/2 lg:w-1/3">
                    <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900 text-center">Login</h1>
                    <p className={`text-center mb-4 ${loginSts ? 'text-blue-500' : 'text-red-500'}`}>
                        {loginSts ? 'You can Login here :)' : 'Incorrect Email or Password'}
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            required
                            value={mail}
                            onChange={handleMail}
                            className="bg-gray-200 p-3 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            type="email"
                            placeholder="Enter your Email"
                        />
                        <input
                            required
                            value={loginPass}
                            onChange={handleLoginPass}
                            className="bg-gray-200 p-3 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            type="password"
                            placeholder="Enter your Password"
                        />
                        <button
                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
                            Signup
                        </Link>
                    </p>
                </div>
            </section>
        </Fragment>
    )
}

export default Login