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
        axios.get(`http://localhost:5000/signup?password=${pass}&email=${email}&crtpassword=${crtPass}&phone=${phone}`).then((data) => {
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
            <section className="flex justify-center mt-[35%] sm:mt-[5%]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[70%] sm:w-[25%]">
                    <h1 className="text-5xl my-2 font-bold">Signup</h1>
                    <p style={{color:stscolor?'skyblue':'red'}} className="pb-2">{signupSts}</p>
                    <input required value={fname} onChange={handleFName} className="bg-slate-200 p-2 rounded-lg w-[100%] outline-none" type="text" placeholder="Enter First Name"></input>
                    <input value={lname} onChange={handleLName} className="bg-slate-200 p-2 rounded-lg w-[100%] outline-none" type="text" placeholder="Enter Last Name"></input>
                    <input required value={pass} onChange={handlePass} className="bg-slate-200 p-2 w-[100%] rounded-lg outline-none" type="password" placeholder="Enter your Password"></input>
                    <input required value={crtPass} onChange={handleCrtPass} className="bg-slate-200 p-2 w-[100%] rounded-lg outline-none" type="password" placeholder="Confirm Password"></input>
                    <input required value={email} onChange={handleEmail} className="bg-slate-200 p-2 w-[100%] rounded-lg outline-none" type="email" placeholder="Enter your Email"></input>
                    <input required value={phone} onChange={handlePhone} className="bg-slate-200 p-2 w-[100%] rounded-lg outline-none" type="number" placeholder="Enter your Mobile"></input>
                    <button className="font-bold p-2 bg-black text-white rounded-lg" type="submit">Sign up</button>
                    <p className="pt-2">Already have an account? <Link to={'/login'} className="underline text-black font-semibold">Login</Link></p>
                </form>
            </section>
        </Fragment>
    )
}

export default Signup