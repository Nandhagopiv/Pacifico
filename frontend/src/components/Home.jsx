import { Fragment, useEffect, useState } from "react"
import Nav from "./Nav"
import poster from '../Assets/poster.jpg'
import bg from '../Assets/bg.avif'
import axios from "axios"
import AboutUs from "./AboutUs"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [newArrivals, setNewArrivals] = useState([])
    const [valformoney, setValformoney] = useState([])
    const [hide, setHide] = useState(true)
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
            if (newArrivals.length === 0) {
                setHide(false)
                await axios.get('https://pacifico.onrender.com/newarrivals')
                    .then((response) => {
                        console.log(response.data)
                        setNewArrivals(response.data)
                    })
                setHide(true)
            }
        }
        refresh()
    }, []);

    const handleViewProduct = (img,item,col,size,price,mrp,gender,id)=>{
        Navigate('/overview',{state:{img:img,item:item,col:col,size:size,price:price,mrp:mrp,for:gender,id:id}})
    }

    return (
        <Fragment>
            <section style={{ display: hide ? 'none' : 'flex' }} className="fixed bg-zinc-200 justify-center items-center z-40 w-[100%] h-[100%] font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
            <Nav/>
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
            <section className="bg-white pt-5">
                <h1 className="font-bold p-5 text-5xl">Brands</h1>
                <div className=" flex p-5 gap-5 justify-between flex-wrap">
                    {
                        Brands.map((brand) => {
                            return <div className="md:p-7 p-5 px-5 md:px-10 border-2 border-zinc-300 rounded-lg bg-white text-center flex-grow">
                                <h1 className="text-2xl md:text-3xl font-extrabold">{brand}</h1>
                            </div>
                        })
                    }
                </div>
            </section>

            <section className="bg-white pt-5">
                <h1 className="font-bold p-5 text-5xl">Recently Viewed</h1>
                <div className="flex gap-2 overflow-x-auto p-5">
                    {newArrivals.map((data, index) => {
                        if (index > 10) {
                            return null;
                        } else {
                            return (
                                <div key={index} onClick={()=>handleViewProduct(data.data,data.product,data.color,data.size,data.price,data.MRP,data.for,data._id)} className="w-[100%] md:w-1/5 flex-shrink-0 bg-zinc-200">
                                    <div className="h-[300px] w-[100%]">
                                        <img className="w-[100%] h-[100%]" src={`data:image/jpeg;base64,${data.data[0]}`} alt="Product Image" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="p-2 text-xl font-bold">{data.product}</h1>
                                        <div className="p-2 font-bold flex gap-2"><p>₹{data.price}</p><p className="line-through text-gray-500">₹{data.MRP} MRP</p><p className="text-green-600">{`(${Math.floor(100 - ((data.price / data.MRP) * 100))}%)`}</p></div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </section>
            <AboutUs/>
        </Fragment>
    )
}

export default Home