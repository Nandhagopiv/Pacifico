import React, { useState, useEffect, useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/AddcartContext';

const PaymentForm = () => {
    const { user } = useContext(CartContext)
    const stripe = useStripe();
    const Navigate = useNavigate()
    const elements = useElements();
    const amount = useLocation()
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const [orderItems, setOrderItems] = useState(() => {
        if (amount.state.cart !== undefined) {
            const tempArr = amount.state.cart.map((data) => {
                const obj = {
                    product: data.product,
                    color: data.color,
                    qty: data.quantity,
                    price: data.price,
                    size: data.selectedsize
                }
                return JSON.stringify(obj)
            })
            return tempArr
        }
    })

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
            card: elements.getElement(CardElement)
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
            axios.get(`https://pacifico.onrender.com/sendemail?email=${user.email}&qty=${amount.state.qty}&price=${amount.state.price}&product=${amount.state.product}&color=${amount.state.color}&size=${amount.state.size}&cart=${orderItems}&ttlprice=${amount.state.ttlprice}`)
            Navigate('/paymentsuccess', { state: { amount: amount.state.amount } })
        }

        setProcessing(false)
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4 mt-10 flex flex-col gap-5 items-center">

                <div className="md:w-[50%] w-[100%] flex flex-col gap-4">
                    <h2 className="text-lg font-semibold mb-2">Billing Address</h2>
                    <input
                        type="text"
                        name="addressLine1"
                        placeholder="Street Address"
                        className="border p-2 rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        name="addressLine2"
                        placeholder="Apt, Suite, etc. (optional)"
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="border p-2 rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="border p-2 rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        className="border p-2 rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value="India"
                        className="border p-2 rounded w-full"
                        readOnly
                    />
                </div>
                <div className='md:w-[50%] mt-10 w-[100%]'>
                    <h1 className='md:text-lg text-left w-[100%] font-bold'>
                        Pay via Credit and Debit Card
                    </h1>
                </div>

                <CardElement className="border w-[100%] md:w-[50%] p-2 rounded" />
            </div>

            {error && <p className="text-center py-5 text-red-500">{error}</p>}
            <div className='w-[100%] flex justify-center'>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-green-600 font-bold text-white px-4 py-2 rounded"
                >
                    {processing ? 'Processing...' : `Pay ₹${(amount.state.amount / 100).toFixed(2)}`}
                </button>
            </div>
        </form>

    );
};

export default PaymentForm;
