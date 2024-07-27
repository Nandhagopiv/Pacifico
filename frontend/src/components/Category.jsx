import { Fragment, useState } from "react"
import Nav from "./Nav"
import axios from "axios"
import AboutUs from "./AboutUs"

const Category = () => {
    const [listOfCate, setListOfCate] = useState([])
    const [products, setProducts] = useState([])
    const [hide, setHide] = useState(true)

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

            setHide(true)
        })
    }
    return (
        <Fragment>
            <section style={{ display: hide ? 'none' : 'flex' }} className="fixed bg-zinc-200 justify-center items-center z-40 w-[100%] h-[100%] font-bold"><div className="loadicon md:h-[50px] md:w-[50px] h-[50px] w-[50px]"></div></section>
            <Nav />
            <main className="md:grid md:grid-cols-4 flex flex-col min-h-screen">
                <section className="min-h-[100%] col-span-1 relative md:py-5  overflow-x-auto flex md:flex-col shadow z-20 bg-white">
                    <h1 className="p-3 mb-5 text-center hidden md:block text-5xl font-bold">Categories</h1>
                    {
                        listOfCate.map((cate) => {
                            return <div className="md:shadow border border-r-2 md:border-none flex-shrink-0 bg-white hover:bg-zinc-200" onClick={() => handleCateClick(cate.category)}>
                                <p className="text-center text-xl p-2 md:py-8 font-bold ">{cate.category}</p>
                            </div>
                        })
                    }
                </section>
                <section className="md:p-5 p-2 grid col-span-3 grid-cols-2 md:grid-cols-4 gap-2 min-h-[100%] bg-white">
                    {
                        products.map((data) => {
                            return <div className="flex flex-col bg-white shadow h-fit">
                                <img className="w-[100%] h-[150px] md:h-[300px]" src={`data:image/jpeg;base64,${data.data[0]}`} alt="" />
                                <p className="text-center md:text-xl p-2 md:p-7 font-bold">{data.subcategory}</p>
                            </div>
                        })
                    }
                </section>
            </main>
            <AboutUs/>
        </Fragment>
    )
}

export default Category