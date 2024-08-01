import { Fragment, useEffect, useState } from "react"
import Nav from "./Nav"
import poster from '../Assets/poster.jpg'
import bg from '../Assets/bg.avif'
import AboutUs from "./AboutUs"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Home = () => {
    const [hide, setHide] = useState(true)
    const [newlyAdded, setNewlyAdded] = useState([])
    const Navigate = useNavigate()
    const Brands = [
        "Nike",
        "Adidas",
        "Puma",
        "Reebok",
        "Vans",
        "Converse",
        "New Balance",
        "ASICS",
        "Timberland",
        "Salomon",
        "Birkenstock"
    ]

    useEffect(() => {
        async function refresh() {
            if (newlyAdded.length === 0) {
                setHide(false)
                const response = await axios.get(`https://pacifico.onrender.com/fetchnewlyadded`)
                console.log(response.data);
                setNewlyAdded(response.data)
                setHide(true)
            }
        }
        refresh()
    })

    const handleViewProduct = (img, item, col, size, price, mrp, gender, id, about) => {
        Navigate('/overview', { state: { img: img, item: item, col: col, size: size, price: price, mrp: mrp, for: gender, id: id, about:about } })
    }

    return (
        <Fragment>
            <section style={{ display: hide ? 'none' : 'flex' }} className="fixed bg-zinc-200 justify-center items-center z-40 w-[100%] h-[100%] font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
            <Nav />
            <section className="bg-white h-12 lg:block hidden text-[#FF204E] p-3">
                <h1 className="anime-headline -right-[40%] text-xl absolute font-bold">Original Branded Shoes at Surplus Factory Prices (upto 90% Offer)</h1>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 bg-zinc-100">
                <div className="h-[400px] relative">
                    <img className="h-[500px] w-[100%]" src={poster} alt="" />
                    <div className="bg-black w-[100%] h-[100%] top-0 absolute opacity-30"></div>
                    <p className="absolute top-0 text-center text-4xl lg:text-6xl my-20 text-[#FFED00] p-10 font-bold">Clearance Event: Save Big on Branded Shoes!</p>
                </div>
                <div className="relative">
                    <img className="h-[500px] w-[100%]" src={bg} alt="" />
                    <div className="bg-black w-[100%] h-[100%] top-0 absolute opacity-50"></div>
                    <p className="absolute top-0 text-center text-4xl lg:text-6xl my-20 text-[#FF008E] p-10 font-bold">Flash Sale Alert: Grab Your Favorite Brands at Surplus Prices!</p>
                </div>
            </section>

            <section className="bg-white flex p-2 justify-center py-10">
                <div className="md:w-[75%] w-[100%]">
                    <h1 className="font-bold p-5 text-center text-2xl md:text-5xl">Newly Added</h1>
                    <div className="grid grid-cols-2 gap-2 mt-10 md:grid-cols-4">
                        {
                            newlyAdded.map((product) => {
                                return <div onClick={() => handleViewProduct(product.data, product.product, product.color, product.size, product.price, product.MRP, product.for, product._id, product.description)} className="bg-white flex-grow shadow">
                                        <img className="md:h-80 h-40 w-[100%]" src={`data:image/jpeg;base64,${product.data[0]}`} alt="Product Image" />
                                        <div className="p-2">
                                            <h1 className="text-sm md:text-xl md:font-bold">{product.product}</h1>
                                            <p className="text-sm md:text-xl font-bold">{product.color}</p>
                                            <div className="text-sm md:text-xl flex gap-2 font-bold">
                                                <p className="line-through text-gray-400">{product.MRP}</p>
                                                <p>₹{product.price}</p>
                                                <p className="font-bold text-green-600">{`(${Math.floor(100 - ((product.price / product.MRP) * 100))}%)`}</p>
                                            </div>
                                        </div>
                                    </div>
                            })
                        }
                    </div>
                </div>
            </section>
            <AboutUs />
        </Fragment>
    )
}

export default Home