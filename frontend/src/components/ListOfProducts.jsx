import { Fragment, useState } from "react"
import Nav from "./Nav"
import AboutUs from "./AboutUs"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const ListOfProducts = () => {
    const selProducts = useLocation()
    const [hide,setHide] = useState(true)
    const [products, setProducts] = useState(selProducts.state.list)
    const [brandFilter,setbrandFilter] = useState([])
    const [priceFilter,setpriceFilter] = useState([])
    const [colorFilter,setcolorFilter] = useState([])
    const Navigate = useNavigate()
    const [filterBox, setFilterBox] = useState(false)
    const [brands, setBrands] = useState(() => {
        const seen = {}
        const tempArr = selProducts.state.list.filter((data) => {
            if (!seen[data.brand]) {
                seen[data.brand] = true
                return true
            }
            return false
        })
        return tempArr
    })

    const [colors, setColors] = useState(() => {
        const seen = {}
        const tempArr = selProducts.state.list.filter((data) => {
            if (!seen[data.color]) {
                seen[data.color] = true
                return true
            }
            return false
        })
        return tempArr
    })

    const price = [
        'below 500',
        '500 to 1000',
        '1000 to 5000',
        '5000 to 10000',
        '10000 to 25000',
        '25000 to 50000',
        '50000 to 100000'
    ]

    const brandsArr = brands.map((data)=>{
        return data.brand
    })

    const colorArr = colors.map((data)=>{
        return data.color
    })

    const handleViewProduct = (img, item, col, size, price, mrp, gender, id, about) => {
        Navigate('/overview', { state: { img: img, item: item, col: col, size: size, price: price, mrp: mrp, for: gender, id: id, about: about} })
    }

    const handleFilter = (val) => {
        setFilterBox(val)
    }

    const handlePrice = (e)=>{
        if (e.target.checked) {
            setpriceFilter([...priceFilter,e.target.value])
        } else{
            const index = priceFilter.indexOf(e.target.value)
            priceFilter.splice(index,1)
        }
    }

    const handleBrand = (e)=>{
        if (e.target.checked) {
            setbrandFilter([...brandFilter,e.target.value])
        } else{
            const index = brandFilter.indexOf(e.target.value)
            brandFilter.splice(index,1)
        }
    }

    const handleColor = (e)=>{
        if (e.target.checked) {
            setcolorFilter([...colorFilter,e.target.value])
        } else{
            const index = colorFilter.indexOf(e.target.value)
            colorFilter.splice(index,1)
        }
    }

    const handleApplyFilter = async()=>{
        setHide(false)
        const response = await axios.get(`https://pacifico.onrender.com/applyfilter?brands=${brandsArr}&price=${price}&color=${colorArr}&subcate=${selProducts.state.subCate}&forbrand=${brandFilter}&forprice=${priceFilter}&forcolor=${colorFilter}`)
        setProducts(response.data)
        setFilterBox(false)
        setHide(true)
    }
    return (
        <Fragment>
            <section style={{ display: hide ? 'none' : 'flex', backgroundColor: 'rgba(228,228,231,0.75)' }} className="fixed bg-zinc-200 justify-center items-center z-50 w-[100%] h-[100%] font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
            <Nav />
            <section>
                <div className="w-[100%] fixed bottom-2 rounded-xl justify-center flex z-40">
                    {
                        filterBox ? <div className="flex gap-5">
                            <div onClick={() => handleFilter(false)} className="bg-rose-700 shadowNav flex justify-between py-3 px-5 rounded-xl"><button className="text-xl text-white">Close</button>
                            </div>
                            <button onClick={handleApplyFilter} className="bg-black shadowNav py-3 px-5  rounded-md text-white text-xl">
                                Apply Filters
                            </button>
                        </div> : <div className="flex justify-end md:py-5 px-7 py-10 md:px-10 w-[100%]">
                            <div onClick={() => handleFilter(true)} className="bg-rose-700 shadowNav flex justify-center h-14 w-14 rounded-full items-center gap-2"><i class="fa-solid fa-filter fa-xl text-white"></i>
                            </div>
                        </div>
                    }
                </div>
                <div style={{ bottom: filterBox ? '0' : '-75%' }} className="fixed shadow-xl overflow-auto px-5 py-7 flex flex-col md:flex-row md:justify-center gap-5 md:gap-24 filter w-[100%] bg-white h-[75%]">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">SELECT PRICE</h1>
                        {price.length > 0 ? (
                            price.map((data) => (
                                <div className="flex items-center gap-2">
                                    <input onChange={handlePrice} value={data} className="size-5" type="checkbox" id={data}></input>
                                    <label className="text-xl" for={data}>{data}</label>
                                </div>
                            ))
                        ) : (
                            <p>Service under Process</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 md:flex-wrap">
                        <h1 className="text-2xl font-bold">SELECT BRANDS</h1>
                        {brands.length > 0 ? (
                            brands.map((data, index) => (
                                <div className="flex mr-24 items-center gap-2">
                                    <input onChange={handleBrand} value={data.brand} className="size-5" type="checkbox" id={index}></input>
                                    <label className="text-xl" for={index}>{data.brand}</label>
                                </div>
                            ))
                        ) : (
                            <p>Service under Process</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 mb-12 md:flex-wrap">
                        <h1 className="text-2xl font-bold">SELECT COLORS</h1>
                        {colors.length > 0 ? (
                            colors.map((data) => (
                                <div className="flex mr-24 items-center gap-2">
                                    <input onChange={handleColor} value={data.color} className="size-5" type="checkbox" id={data.color}></input>
                                    <label className="text-xl" for={data.color}>{data.color}</label>
                                </div>
                            ))
                        ) : (
                            <p>Service under Process</p>
                        )}
                    </div>
                </div>
                <div className="grid gap-2 grid-cols-2 p-2 md:p-5 md:grid-cols-6">
                    {
                        products.map((product) => {
                            return <div onClick={() => handleViewProduct(product.data, product.product, product.color, product.size, product.price, product.MRP, product.for, product._id, product.description)} className="bg-white flex-grow shadow">
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
            </section>
            <AboutUs />
        </Fragment>
    )
}

export default ListOfProducts