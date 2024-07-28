import { Fragment, useEffect, useState } from "react"
import Nav from "./Nav"
import poster from '../Assets/poster.jpg'
import bg from '../Assets/bg.avif'
import AboutUs from "./AboutUs"
import { useNavigate } from "react-router-dom"

const Home = () => {
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
            <AboutUs/>
        </Fragment>
    )
}

export default Home