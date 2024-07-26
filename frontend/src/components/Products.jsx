import { Fragment, useEffect, useState } from "react"
import Nav from "./Nav"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AboutUs from "./AboutUs"

const Products = () => {
    const Navigate = useNavigate()
    const [searchWord, setSearchWord] = useState('')
    const [allProducts, setAllProducts] = useState([])
    const [hide, setHide] = useState(true)
    const [headSize, setHeadSize] = useState(true)
    const [searchHead, setSearchHead] = useState('All Products')
    const handleChange = (e) => {
        setSearchWord(e.target.value)
    }

    useEffect(() => {
        async function refresh() {
            if (allProducts.length === 0) {
                setHide(false)
                setHeadSize(true)
                await axios.get(`http://localhost:5000/refershallproducts`).then((data) => {
                    console.log(data.data);
                    setAllProducts(data.data)
                })
                setHide(true)
                setSearchHead('All Products')
            }
        }
        refresh()
    }, [])

    const handleSearch = async () => {
        setHide(false)
        await axios.get(`http://localhost:5000/fetch?key=${searchWord}`).then((data) => {
            console.log(data.data);
            setAllProducts(data.data)
            setSearchHead(`Searched for ${searchWord}`)
            setHeadSize(false)
        })
        setHide(true)
    }

    const handleViewProduct = (img,item,col,size,price,mrp,gender,id)=>{
        Navigate('/overview',{state:{img:img,item:item,col:col,size:size,price:price,mrp:mrp,for:gender,id:id}})
    }

    return (
        <Fragment>
            <section style={{ display: hide ? 'none' : 'flex' }} className="fixed bg-zinc-200 justify-center items-center z-40 w-[100%] h-[100%] font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
            <Nav/>
            <main className="z-0">
                <section className=" bg-zinc-300 flex justify-center pt-14">
                    <div className="flex gap-2 justify-center w-[100%]">
                        <input value={searchWord} onChange={handleChange} className="py-3 px-5 w-[60%] bg-white outline-none rounded-full" placeholder="Search for Brands"></input>
                        <button onClick={handleSearch} className="bg-black py-2 px-5 font-bold text-white rounded-full">Search</button>
                    </div>
                </section>
                <section className="bg-white flex flex-col">
                    <div className="w-[100%] flex flex-col pt-5 bg-zinc-300 p-2 md:p-5">
                        <h1 className="pb-3 font-bold text-xl md:text-3xl">{searchHead}</h1>
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-6">
                            {
                                allProducts.map((product) => {
                                    return <div onClick={()=>handleViewProduct(product.data,product.product,product.color,product.size,product.price,product.MRP,product.for,product._id)} className="bg-white flex-grow shadow">
                                        <img className="md:h-60 h-40 w-[100%]" src={`data:image/jpeg;base64,${product.data[0]}`} alt="Product Image" />
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
            </main>
            <AboutUs/>
        </Fragment>
    )
}

export default Products