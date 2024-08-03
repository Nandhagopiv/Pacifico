import { Fragment, useState } from "react"
import Nav from "./Nav"
import axios from "axios"
import AboutUs from "./AboutUs"
import { useNavigate } from "react-router-dom"

const Category = () => {
    const [listOfCate, setListOfCate] = useState([])
    const [products, setProducts] = useState([])
    const [hide, setHide] = useState(true)
    const Navigate = useNavigate()

    useState(() => {
        async function refresh() {
            if (listOfCate.length === 0) {
                setHide(false)
                await axios.get('https://pacifico.onrender.com/cate').then((data) => {
                    setListOfCate(data.data)
                })
                setHide(true)
            }
        }
        refresh()
    }, [])

    const handleCateClick = async (selCate) => {
        setHide(false)
        axios.get(`https://pacifico.onrender.com/displaycate?selCate=${selCate}`).then((data) => {
            setProducts(data.data)
            console.log(data.data);
            setHide(true)
        })
    }

    const handleSubCate = async (subcate) => {
        console.log(subcate);
        setHide(false)
        const response = await axios.get(`https://pacifico.onrender.com/getlist?key=${subcate}`)
        console.log(response);
        Navigate('/list', { state: { list: response.data, subCate: subcate } })
        setHide(true)
    }
    return (
        <Fragment>
            <section style={{ display: hide ? 'none' : 'flex' }} className="fixed bg-zinc-200 justify-center items-center z-40 w-[100%] h-[100%] font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
            <Nav />
            <main className="md:grid md:grid-cols-4 flex flex-col min-h-screen">
                <section className="col-span-1 relative md:overflow-y-auto md:h-[700px] overflow-x-auto flex md:flex-col shadow-xl z-20 bg-white">
                    <h1 className="p-3 py-5 sticky top-0 bg-white text-center hidden md:block text-3xl font-bold">Categories</h1>
                    {
                        listOfCate.map((cate) => {
                            return <div className="md:shadow border border-r-2 md:border-none flex-shrink-0 bg-white hover:bg-zinc-200" onClick={() => handleCateClick(cate.category)}>
                                <p className="text-center text-xl py-2 px-7 p-2 md:py-8 font-bold ">{cate.category}</p>
                            </div>
                        })
                    }
                </section>
                <section className="md:p-5 p-2 grid col-span-3 md:overflow-y-auto grid-cols-2 md:grid-cols-4 gap-2 md:h-[700px] bg-white">
                    {
                        products.map((data) => {
                            return <div onClick={() => handleSubCate(data.subcategory)} className="flex flex-col bg-white shadow-xl h-fit">
                                <img className="w-[100%] h-[150px] md:h-[300px]" src={`data:image/jpeg;base64,${data.data[0]}`} alt="" />
                                <p className="text-center md:text-xl p-2 md:p-7 font-bold">{data.subcategory}</p>
                            </div>
                        })
                    }
                    <div className="md:text-3xl absolute mt-56 md:w-[70%] w-[100%] font-bold text-center">
                        <p>
                        {
                            products.length === 0 ? `Select any Category` : ''
                        }
                        </p>
                    </div>
                </section>
            </main>
            <AboutUs />
        </Fragment>
    )
}

export default Category