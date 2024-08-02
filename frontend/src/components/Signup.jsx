import { Fragment, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const Signup = () => {
    const Navigate = useNavigate()
    const [fname, setfName] = useState('')
    const [lname, setlName] = useState('')
    const [pass, setPass] = useState('')
    const [crtPass, setCrtPass] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [signupSts, setSignupSts] = useState('You can Signup here:)')
    const [stscolor, setStscolor] = useState(true)

    const handleFName = (e) => {
        setfName(e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1))
    }

    const handleLName = (e) => {
        setlName(e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1))
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePhone = (e) => {
        setPhone(e.target.value.slice(0,10))
    }

    const handlePass = (e) => {
        setPass(e.target.value)
    }

    const handleCrtPass = (e) => {
        setCrtPass(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`https://pacifico.onrender.com/signup?password=${pass}&email=${email}&crtpassword=${crtPass}&phone=${phone}`).then((data) => {
            if (data.data === true) {
                Navigate('/verify',{state:{email:email,fname:fname,lname:lname,password:pass,phone:phone}})
            } else if (data.data === 'notmatching') {
                setStscolor(false)
                setSignupSts('Passwords are not Matching')
            } else{
                setSignupSts('Already an existing user. Please, Login')
                setStscolor(false)
            }
        })
    }
    return (
        <Fragment>
            <section className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col gap-6 m-6 p-8 bg-white rounded-lg shadow-lg w-full max-w-md sm:w-3/4 md:w-1/2 lg:w-1/3">
                    <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900 text-center">Signup</h1>
                    <p className={`text-center mb-4 ${stscolor ? 'text-blue-500' : 'text-red-500'}`}>
                        {signupSts}
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            required
                            value={fname}
                            onChange={handleFName}
                            className="bg-gray-200 p-3 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter First Name"
                        />
                        <input
                            value={lname}
                            onChange={handleLName}
                            className="bg-gray-200 p-3 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter Last Name (Optional)"
                        />
                        <input
                            required
                            value={pass}
                            onChange={handlePass}
                            className="bg-gray-200 p-3 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            type="password"
                            placeholder="Enter your Password"
                        />
                        <input
                            required
                            value={crtPass}
                            onChange={handleCrtPass}
                            className="bg-gray-200 p-3 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <input
                            required
                            value={email}
                            onChange={handleEmail}
                            className="bg-gray-200 p-3 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            type="email"
                            placeholder="Enter your Email"
                        />
                        <input
                            required
                            value={phone}
                            onChange={handlePhone}
                            className="bg-gray-200 p-3 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            type="tel"
                            placeholder="Enter your Phone"
                        />
                        <button
                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </section>
        </Fragment>
    )
}

export default Signup