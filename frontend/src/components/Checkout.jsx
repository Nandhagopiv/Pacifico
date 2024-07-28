import { Fragment, useState } from "react"
import Nav from "./Nav"
import { useLocation, useNavigate } from "react-router-dom"
import GooglePayButton from '@google-pay/button-react'

const Checkout = () => {
    const Navigate = useNavigate()
    const item = useLocation()
    const [count, setCount] = useState(item.state.qty)
    return (
        <Fragment>
            <Nav />
            <section>
                <div className="flex border-b-2 pb-5 justify-between">
                    <h1 className="md:text-5xl text-3xl px-5 md:px-10 pt-5 font-bold">Order Summary</h1>
                    <h1 className="text-2xl hidden md:block pt-5 md:pt-10 text-gray-600 pr-14 font-bold">Price</h1>
                </div>
                <div className="border-b-2 p-2">
                    <div className="md:flex grid grid-cols-5 px-2 md:px-10 md:pb-5">
                        <div className="col-span-2 flex items-center">
                            <img
                                className="md:h-[300px] w-[300px]"
                                src={`data:image/jpeg;base64,${item.state.img[0]}`}
                                alt="Product"
                            />
                        </div>
                        <div className="p-5 w-[100%] col-span-3 flex flex-col gap-5 bg-white">
                            <h1 className="md:text-3xl text-xl">{item.state.item}</h1>
                            <p className="md:text-2xl text-xl font-bold">{item.state.color}</p>
                            <div className="md:text-2xl text-xl font-bold flex gap-2">
                                <p className="line-through text-gray-400">{item.state.mrp}</p>
                                <p>₹{item.state.price}</p>
                                <p className="font-bold text-green-600">
                                    ({Math.floor(100 - (item.state.price / item.state.mrp) * 100)}%)
                                </p>
                            </div>
                            <div className="flex flex-col gap-5 justify-between">
                                <div className="flex gap-5 font-bold md:text-xl">
                                    <p className="text-center">
                                        Qty :
                                    </p>
                                    <p className="text-center">
                                        {count}
                                    </p>
                                </div>
                                <div className="md:text-2xl text-xl font-bold">
                                    <h1>₹{count * item.state.price}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="flex fixed justify-between items-center shadowNav bottom-0 px-5 md:px-14 py-3 bg-white w-[100%]">
                <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
                    <h1 className="font-bold line-through md:text-xl text-gray-500">₹{count * item.state.mrp}</h1>
                    <h1 className="text-xl md:text-3xl font-bold">₹{count * item.state.price}</h1>
                </div>
                <button className="bg-zinc-800 flex rounded-lg justify-center items-center">
                    <p className="absolute md:text-xl text-white font-bold">
                        Proceed to Pay
                    </p>
                    <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId',
                                        },
                                    },
                                },
                            ],
                            merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: `${count * item.state.price}`,
                                currencyCode: 'INR',
                                countryCode: 'IN',
                            },
                            shippingAddressRequired: true,
                            shippingAddressParameters: {
                                allowedCountryCodes: ['IN'],
                                phoneNumberRequired: true,
                            },
                        }}
                        onLoadPaymentData={paymentData => {
                            console.log('Payment Data Loaded:', paymentData);
                            const { shippingAddress } = paymentData;
                            if (shippingAddress) {
                                console.log('Shipping Address:', shippingAddress);
                            }
                            Navigate('/paymentsuccess')
                        }}
                        onError={error => {
                            console.error('Payment Error:', error);
                        }}
                        style={{ opacity: 0 }}
                    />
                </button>
            </footer>
        </Fragment>
    )
}

export default Checkout