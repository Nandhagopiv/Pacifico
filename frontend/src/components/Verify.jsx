import { Fragment } from "react"
import { useState } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"

const Verify = () => {
    const[otp,setOtp] = useState('')
    const user = useLocation()
    const Navigate = useNavigate()

    const handleChange = (e)=>{
        setOtp(e.target.value.slice(0,4))
    }

    const handleClick = async (e)=>{
        e.preventDefault()
        await axios.get(`http://localhost:5000/verify?otp=${otp}&password=${user.state.password}&email=${user.state.email}&phone=${user.state.phone}&name=${`${user.state.fname} ${user.state.lname}`}`).then((data)=>{
            console.log(data.data);
            if (data.data === true) {
                alert('Verified Successfully')
                Navigate('/login')
            }else{
                alert('Invalid OTP')
            }
        })
    }
    return (
        <Fragment>
            <section className="flex h-[100%] justify-center sm:mt-[15%] mt-[50%] w-[100%]">
                <form onSubmit={handleClick} className="sm:w-[30%] w-[75%] flex flex-col items-center gap-7">
                    <h1 className="text-5xl font-bold">Email Verification</h1>
                    <div className="w-[50%] flex justify-center gap-2">
                        <input required value={otp} onChange={handleChange} className="bg-slate-200 p-2 rounded-lg outline-none" type="number" placeholder="Enter OTP here"></input>
                        <button type="submit" className="bg-black text-white font-bold p-2 rounded-lg">Submit</button>
                    </div>
                    <p className="text-center">An One Time Password will be sent to this email <b className="text-white">{user.state.email}</b></p>
                </form>
            </section>
        </Fragment>
    )
}

export default Verify