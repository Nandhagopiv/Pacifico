import { Fragment, useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/AddcartContext";
import Nav from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCart = () => {
    const [cartList, setCartList] = useState([]);
    const [hide, setHide] = useState(true)
    const Navigate = useNavigate()
    const { user, addingUserDataToUpdateCart } = useContext(CartContext);

    useEffect(() => {
        const getUserDetailsFromLocalStorage = () => {
            const userDet = localStorage.getItem('user');
            if (userDet) {
                const parsedUserDet = JSON.parse(userDet);
                setCartList(parsedUserDet.cart)
            }
        };
        getUserDetailsFromLocalStorage();
    }, [])

    const handleInc = (val) => {
        cartList.forEach((data) => {
            if (val === data.product && data.quantity < 10) {
                setHide(false)
                axios.get(`http://localhost:5000/addquantity?productref=${val}&email=${user.email}`).then((data) => {
                    const userCart = data.data.cart
                    const userDet = data.data
                    const tempArr = userCart.map((data) => {
                        return JSON.parse(data)
                    })
                    userDet.cart = tempArr
                    localStorage.setItem('user', JSON.stringify(userDet))
                    const forSetCart = localStorage.getItem('user');
                    if (forSetCart) {
                        const parsedUserDet = JSON.parse(forSetCart);
                        setCartList(parsedUserDet.cart)
                    }
                    setHide(true)
                })
            }
        })
    }

    const handleDec = (val) => {
        cartList.forEach((data) => {
            if (val === data.product && data.quantity > 1) {
                setHide(false)
                axios.get(`http://localhost:5000/lessquantity?productref=${val}&email=${user.email}`).then((data) => {
                    const userCart = data.data.cart
                    const userDet = data.data
                    const tempArr = userCart.map((data) => {
                        return JSON.parse(data)
                    })
                    userDet.cart = tempArr
                    localStorage.setItem('user', JSON.stringify(userDet))
                    const forSetCart = localStorage.getItem('user');
                    if (forSetCart) {
                        const parsedUserDet = JSON.parse(forSetCart);
                        setCartList(parsedUserDet.cart)
                    }
                    setHide(true)
                })
            }
        })
    }

    if (!user || !user.cart || user.cart.length === 0) {
        return (
            <Fragment>
                <Nav />
                <section className="flex justify-center items-center h-screen">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Your cart is empty!
                    </h1>
                </section>
            </Fragment>
        );
    }

    const totalPrice = cartList.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.price * currentItem.quantity);
    }, 0)

    const mrpPrice = cartList.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.MRP * currentItem.quantity);
    }, 0)

    const handleBuyNow = (product) =>{
        cartList.forEach((data)=>{
            if (data.product === product) {
                Navigate('/checkout',{state:{item:data.product,img:data.data,color:data.color,price:data.price,mrp:data.MRP,qty:data.quantity}})
            }
        })
    }

    const handleRemove = (product)=>{
        setHide(false)
        cartList.forEach((data)=>{
            if (product === data.product) {
                axios.get(`http://localhost:5000/removecart?product=${product}&email=${user.email}`).then(async (data)=>{
                    addingUserDataToUpdateCart(data.data)
                    setCartList(data.data.cart)
                    localStorage.setItem('user', JSON.stringify(data.data))
                    setHide(true)
                })
            }
        })
    }

    return (
        <Fragment>
            <section style={{ display: hide ? 'none' : 'flex', backgroundColor: 'rgba(228,228,231,0.50)' }} className="fixed bg-zinc-200 justify-center items-center z-40 w-[100%] h-[100%] font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
            <Nav />
            <section className="flex flex-col mb-16 md:mb-12 gap-5 py-5">
                <div className="flex items-center border-b-2 pb-5 justify-between">
                    <h1 className="md:text-5xl text-3xl px-5 md:px-10 pt-5 font-bold">My Cart</h1>
                    <h1 className="text-2xl hidden md:block pt-5 md:pt-10 text-gray-600 pr-14 font-bold">Price</h1>
                </div>
                <div className="flex flex-col gap-5">
                    {cartList.map((data) => (
                        <div key={data.product} className="border-b-2">
                            <div className="md:flex grid grid-cols-5 px-2 md:px-10 md:pb-5">
                                <div className="col-span-2 flex items-center">
                                    <img
                                        className="md:h-[300px] w-[300px]"
                                        src={`data:image/jpeg;base64,${data.data[0]}`}
                                        alt="Product"
                                    />
                                </div>
                                <div className="p-5 col-span-3 w-[100%] flex flex-col gap-5 bg-white">
                                    <h1 className="md:text-3xl">{data.product}</h1>
                                    <p className="md:text-2xl font-bold">{data.color}</p>
                                    <div className="md:text-2xl font-bold flex gap-2">
                                        <p className="line-through text-gray-400">{data.MRP}</p>
                                        <p>₹{data.price}</p>
                                        <p className="font-bold text-green-600">
                                            ({Math.floor(100 - (data.price / data.MRP) * 100)}%)
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-5 md:flex-row justify-between">
                                        <div className="flex gap-2 font-bold md:text-xl">
                                            <button
                                                onClick={() => handleDec(data.product)}
                                                className="bg-slate-800 text-white w-10 md:p-2 rounded-full"
                                            >
                                                -
                                            </button>
                                            <p className="p-2 text-center w-10">
                                                {data.quantity}
                                            </p>
                                            <button
                                                onClick={() => handleInc(data.product)}
                                                className="bg-slate-800 text-white w-10 md:p-2 rounded-full"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="md:text-2xl font-bold">
                                            <h1>₹{data.quantity * data.price}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around font-bold md:text-xl">
                                <button onClick={()=>handleRemove(data.product)} className="p-3 flex-grow text-white bg-sky-500">
                                    Remove
                                </button>
                                <button onClick={()=>handleBuyNow(data.product)} className="p-3 flex-grow bg-yellow-400">
                                    Buy this now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <footer className="flex fixed justify-between items-center shadowNav bottom-0 px-5 md:px-14 py-3 bg-white w-[100%]"> 
                    <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
                        <h1 className="font-bold line-through md:text-xl text-gray-500">₹{mrpPrice}</h1>
                        <h1 className="text-xl md:text-3xl font-bold">₹{totalPrice}</h1>
                    </div>
                    <button className="bg-orange-300 md:text-xl md:px-20 px-2 py-2 rounded-lg font-bold">Choose Payment Method</button>
            </footer>
        </Fragment>
    );
};

export default AddCart;
