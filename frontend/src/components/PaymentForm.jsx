import React, { useState, useEffect, useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/AddcartContext';

const PaymentForm = () => {
    const {user} = useContext(CartContext)
    const stripe = useStripe();
    const Navigate = useNavigate()
    const elements = useElements();
    const amount = useLocation()
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const { data } = await axios.post('https://pacifico.onrender.com/create-payment-intent', { amount: amount.state.amount });
                setClientSecret(data.clientSecret);
            } catch (error) {
                setError('Check your Network Connection');
            }
        };

        createPaymentIntent();
    }, [amount])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setProcessing(false);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
            Navigate('/failed')
        } else if (paymentIntent.status === 'succeeded') {
            axios.get(`http://localhost:5000/sendemail?email=${user.email}`)
            Navigate('/paymentsuccess', { state: { amount: amount.state.amount } })
        }

        setProcessing(false)
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4 mt-56 flex flex-col gap-5 items-center">
                <div className='md:w-[50%]'>
                    <h1 className='md:text-2xl text-left w-[100%] text-xl font-bold'>Pay via Credit and Debit Card</h1>
                </div>
                <CardElement className="border w-[100%] md:w-[50%] p-2 rounded" />
            </div>
            {error && <p className="text-center  py-5 text-red-500">{error}</p>}
            <div className='w-[100%] flex justify-center'>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    {processing ? 'Processing...' : 'Pay'}
                </button>
            </div>

        </form>
    );
};

export default PaymentForm;
