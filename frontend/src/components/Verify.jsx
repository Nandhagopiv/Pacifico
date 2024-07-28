import { Fragment } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const user = useLocation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOtp(e.target.value.slice(0, 4));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://pacifico.onrender.com/verify?otp=${otp}&password=${user.state.password}&email=${user.state.email}&phone=${user.state.phone}&name=${`${user.state.fname} ${user.state.lname}`}`
            );
            if (response.data === true) {
                alert('Verified Successfully');
                navigate('/login');
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            console.error('Verification failed:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Fragment>
            <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <form
                    onSubmit={handleClick}
                    className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-6 sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12"
                >
                    <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">Email Verification</h1>
                    <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-4">
                        <input
                            required
                            value={otp}
                            onChange={handleChange}
                            className="bg-gray-200 p-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full sm:w-1/2"
                            type="number"
                            placeholder="Enter OTP here"
                        />
                        <button
                            type="submit"
                            className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto"
                        >
                            Submit
                        </button>
                    </div>
                    <p className="text-center text-gray-600 text-sm md:text-base">
                        An One Time Password will be sent to this email{' '}
                        <b className="text-gray-900">{user.state.email}</b>
                    </p>
                </form>
            </section>
        </Fragment>
    );
};

export default Verify;
