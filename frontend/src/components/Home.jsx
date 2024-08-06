import { Fragment, useEffect, useState } from "react"
import Nav from "./Nav"
import poster from '../Assets/poster.jpg'
import poster2 from '../Assets/poster2.jpg'
import poster3 from '../Assets/poster3.jpg'
import poster4 from '../Assets/poster4.jpg'
import poster5 from '../Assets/poster5.jpg'
import AboutUs from "./AboutUs"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Home = () => {
    const [hide, setHide] = useState(true)
    const [newlyAdded, setNewlyAdded] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        async function refresh() {
            if (newlyAdded.length === 0) {
                setHide(false)
                const response = await axios.get(`https://pacifico.onrender.com/fetchnewlyadded`)
                setNewlyAdded(response.data)
                setHide(true)
            }
        }
        refresh()
    })

    const handleViewProduct = (img, item, col, size, price, mrp, gender, id, about) => {
        Navigate('/overview', { state: { img: img, item: item, col: col, size: size, price: price, mrp: mrp, for: gender, id: id, about: about } })
    }

    return (
        <Fragment>
            <Nav />

            <section className="bg-teal-600 text-white p-4 text-center">
                <h1 className="text-sm lg:text-lg font-semibold">
                    Grab Your Favorite Products at Unbeatable Prices! Up to 70% Off!
                </h1>
            </section>

            <section className="relative">
                <img className="w-full h-[300px] lg:h-[500px] object-cover" src={poster} alt="Welcome to Pacifico" />
                <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center text-center p-4">
                    <div>
                        <h2 className="text-3xl lg:text-5xl text-white font-bold drop-shadow-lg">
                            Explore Unbeatable Offers on Leading Brands!
                        </h2>
                        <p className="text-lg lg:text-xl text-white mt-4">
                            Shop the latest trends and exclusive offers tailored just for you.
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                <div className="relative">
                    <img className="w-full h-[200px] lg:h-[300px] object-cover" src={poster2} alt="Best Sellers" />
                    <div className="absolute inset-0 bg-black opacity-40 flex items-center justify-center text-center p-4">
                        <h3 className="text-xl lg:text-3xl text-white font-bold drop-shadow-lg">
                            Connect to Innovation: Your Ultimate Electronics Destination!
                        </h3>
                    </div>
                </div>

                <div className="relative">
                    <img className="w-full h-[200px] lg:h-[300px] object-cover" src={poster5} alt="New Arrivals" />
                    <div className="absolute inset-0 bg-black opacity-40 flex items-center justify-center text-center p-4">
                        <h3 className="text-xl lg:text-3xl text-white font-bold drop-shadow-lg">
                            Unleash Innovation: Discover Your Perfect iPhone Today!
                        </h3>
                    </div>
                </div>

                <div className="relative">
                    <img className="w-full h-[200px] lg:h-[300px] object-cover" src={poster4} alt="Special Offers" />
                    <div className="absolute inset-0 bg-black opacity-40 flex items-center justify-center text-center p-4">
                        <h3 className="text-xl lg:text-3xl text-white font-bold drop-shadow-lg">
                            Elevate Your Style: Where Fashion Meets Flair!
                        </h3>
                    </div>
                </div>
            </section>

            <section className="relative">
                <img className="w-full h-[400px] object-cover" src={poster3} alt="Shop Now" />
                <div className="absolute inset-0 bg-black opacity-50 flex flex-col items-center justify-center text-center p-6">
                    <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                        Ready to Explore?
                    </h2>
                    <p className="text-lg lg:text-xl text-white mb-6">
                        Dive into our collection and find the best deals waiting for you.
                    </p>
                    <Link to={'/category'}
                        className="bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-300"
                    >
                        Shop by Category
                    </Link>
                </div>
            </section>

            <section className="bg-white flex p-2 justify-center py-10">
                <div className="md:w-[75%] w-[100%]">
                    <h1 className="font-bold p-5 text-center text-2xl md:text-5xl">Newly Added</h1>
                    <section style={{ display: hide ? 'none' : 'flex' }} className="justify-center items-center z-40 mt-20 font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
                    <div className="grid grid-cols-2 gap-2 mt-10 md:grid-cols-4">
                        {
                            newlyAdded.map((product) => {
                                return <div onClick={() => handleViewProduct(product.data, product.product, product.color, product.size, product.price, product.MRP, product.for, product._id, product.description)} className="bg-white flex-grow shadow">
                                    <img className="md:h-80 h-40 w-[100%]" src={`data:image/jpeg;base64,${product.data[0]}`} alt="Product Image" />
                                    <div className="py-5 px-3 flex flex-col gap-2">
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