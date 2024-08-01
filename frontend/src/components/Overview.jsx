import { Fragment, useContext, useState } from "react"
import Nav from '../components/Nav'
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../contexts/AddcartContext"
import AboutUs from "./AboutUs"

const Overview = () => {
    const Navigate = useNavigate()
    const { addingUserDataToUpdateCart, user } = useContext(CartContext)
    const item = useLocation()
    const [imgFile, setImgFile] = useState(item.state.img[0])
    const [added, setAdded] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [msg, setMsg] = useState(false)
    const [size, setSize] = useState(()=>{
        const tempArr = item.state.size.map((data)=>{
            return data
        })
        return tempArr
    })

    const handleViewImg = (pic) => {
        setImgFile(pic)
    }

    const handleAddCart = () => {
        if (selectedSize === null) {
            setMsg(true)
        } else{
            if (user !== null) {
                setAdded(true);
                axios.get(`https://pacifico.onrender.com/addcart?email=${user.email}&id=${item.state.id}&selSize=${selectedSize}`).then((data) => {
                    addingUserDataToUpdateCart(data.data)
                }).catch(error => {
                    console.log(error)
                })
            } else{
                alert('Please Login before adding to cart')
            }
        }
    }

    const handleBuyNow = () => {
        if (selectedSize === null) {
            setMsg(true)
        } else{
            if (user !== null){
                Navigate('/checkout', { state: { item: item.state.item, img: item.state.img, color: item.state.col, price: item.state.price, mrp: item.state.mrp, qty: 1 } })
            }else{
                alert('Please Login before Buying')
            }
        }
    }

    return (
        <Fragment>
            <Nav />
            <section className="bg-zinc-200 md:p-10 p-4 grid md:gap-0 gap-10 md:grid-cols-2">
                <div className="flex flex-col-reverse md:grid md:grid-cols-5 gap-2">
                    <div className="flex md:col-span-1 md:order-1 gap-1 overflow-x-auto md:flex-col md:gap-2">
                        {
                            item.state.img.map((pic) => (
                                <div
                                    key={pic}
                                    onClick={() => handleViewImg(pic)}
                                    className="flex-none w-[20%] md:w-full flex-shrink-0"
                                >
                                    <img
                                        className="w-full rounded-sm"
                                        src={`data:image/jpeg;base64,${pic}`}
                                        alt="Product"
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div className="md:col-span-4 flex-shrink-0 md:order-2">
                        <img className="w-full max-h-[700px] object-cover" src={`data:image/jpeg;base64,${imgFile}`} alt="Viewing Product Image" />
                    </div>
                </div>

                <div className="md:px-10 text-xl flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <h1 className="md:text-4xl text-3xl font-bold">{item.state.item}</h1>
                        <p className="md:text-2xl font-bold">{item.state.for.charAt(0).toUpperCase() + item.state.for.slice(1)}</p>
                    </div>
                    <p className="md:text-2xl text-gray-600 font-semibold">{item.state.col}</p>
                    <p className="md:text-2xl flex flex-wrap gap-2 font-bold">{size.map((data) => {
                        return <p onClick={() => setSelectedSize(data)}  className={`p-2 border ${selectedSize === data ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} flex cursor-pointer items-center justify-center rounded-full border-gray-500 h-[50px] min-w-[50px]`}>{data}</p>
                    })}</p>
                    <p style={{display:msg?'block':'none'}} className="md:text-xl font-semibold">Select one Size or Variant</p>
                    <hr className="border border-gray-400"></hr>
                    <div className="flex gap-2">
                        <p className="md:text-2xl font-bold">₹{item.state.price}</p>
                        <p className="md:text-2xl text-gray-500 font-semibold">MRP</p>
                        <p className="md:text-2xl line-through text-gray-500 font-semibold">{`₹${item.state.mrp}`}</p>
                        <p className="md:text-2xl font-bold text-[#FE7A36]">{`(${Math.floor(100 - ((item.state.price / item.state.mrp) * 100))}% OFF)`}</p>
                    </div>
                    <p className="md:text-2xl font-semibold text-[#FF407D]">Inclusive of all taxes</p>
                    <div className="flex items-center md:gap-5 gap-2 justify-between">
                        <button onClick={handleBuyNow} className="md:p-5 p-3 bg-cyan-600 border border-cyan-600 flex flex-grow justify-center rounded-lg"><p className="md:text-xl text-sm font-bold text-white">BUY NOW</p></button>
                        <button onClick={handleAddCart} disabled={added} className="flex items-center md:gap-5 gap-2 rounded-lg p-3 md:p-5 border-2 justify-center border-gray-400 flex-grow hover:border-black"><i className="fa-solid fa-cart-shopping fa-sm md:fa-2xl"></i> <p className="md:text-xl text-sm font-bold">{added ? 'ADDED TO CART' : 'ADD TO CART'}</p></button>
                    </div>
                </div>
            </section>
            <section className="bg-zinc-200 p-5 md:p-10 md:text-2xl">
                <h1 className="font-bold text-4xl mb-10">About this Product</h1>
                <p>{item.state.about}</p>
            </section>
            <AboutUs />
        </Fragment>
    )
}

export default Overview