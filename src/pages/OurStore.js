import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
// import ReactStar from 'react-rating-stars-component'
import Meta from '../components/Meta'
import {useDispatch, useSelector} from 'react-redux'
import ProductCard from '../components/ProductCard'
// import Color from '../components/Color'
import { FaFilterCircleXmark } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa6";
import Container from '../components/Container'
import { getProducts } from '../features/products/productSlice'
const OurStore = () => {
    const [grid,setGrid] = useState(4);
    const {productList} = useSelector(state=>state?.product)
    const [brands,setBrands] = useState([])
    const [categories,setCategories] = useState([])
    const [tags,setTags] = useState([])


    // Filter States
    const [tag,setTag] = useState(null)
    // const [tag2,setTag2] = useState(null)
    const [category,setCategory] = useState(null)
    // const [category2,setCategory2] = useState(null)
    const [brand,setBrand] = useState(null)
    // const [brand2,setBrand2] = useState(null)
    const [minPrice,setMinPrice] = useState(null)
    const [maxPrice,setMaxPrice] = useState(null)
    const [sort,setSort] = useState(null)


    const dispatch = useDispatch()

    useEffect(()=>{
        getAllProducts()
    },[sort,brand,category,minPrice,maxPrice,dispatch,tag])


    const getAllProducts = ()=>{
        dispatch(getProducts({sort,brand,tag,category,minPrice,maxPrice}))
    }

    useEffect(()=>{
        let newBrands = []
        let newCategory = []
        let newTags = []
        // let newColors = []

        for (let index = 0; index < productList.length; index++) {
            const element = productList[index];
            newBrands.push(element?.brand)  
            newCategory.push(element?.category)   
            newTags.push(element?.tags)    
            // newColors.push(element?.color)
        }
        if (brand === null) {
          setBrands(newBrands);
        } 
       if (category === null) {
          setCategories(newCategory);
        } 
         if (tag === null) {
          setTags(newTags);
        }
        
    },[productList])

    useEffect(() => {
      const handleResize = () => {
        // Check if the window width matches the condition for col-sm-12
        if (window.matchMedia('(max-width: 767.98px)').matches) {
          setGrid('12'); // Set grid class to gr-12 for small screens
        } else {
          setGrid('4'); // Set grid class to gr-4 for other screen sizes
        }
      };
  
      // Attach the event listener to the window resize event
      window.addEventListener('resize', handleResize);
  
      // Call the function on component mount (initial render)
      handleResize();
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 
    
    
    const [filterVisible, setFilterVisible] = useState(true);

  const toggleFilterVisibility = () => {
    if(filterVisible)
      setGrid(3)
    else
      setGrid(4)
    setFilterVisible(!filterVisible)
  };
    
  return (
    <>
        <Meta title={"OurStore"}/>  
        <BreadCrumb title="OurStore"/>
        
        <Container className="store-wrapper home-wrapper-2" >
    <div className="row">
    <div className="row">
    <div className={`col-lg-3 col-md-4`}>
        <div className='d-flex'>
          <h3 className='filter-title fs-3 my-3'>Filters</h3>
          <button onClick={toggleFilterVisibility} className="btn mt-2 mb-2 ms-1" style={{outline:"none",border:"none"}} >
            {!filterVisible ? <FaFilter/> : <FaFilterCircleXmark/>}
          </button>
          </div>
          </div>
          </div>
      <div className={`col-lg-3 col-md-4 ${filterVisible ? 'd-block' : 'd-none'}`}>
        <div className='filter-card'>
          <h4>Product Categories</h4>
          <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
            {categories && [...new Set(categories)].map((element, i) => (
              <span className='badge bg-light text-dark rounded-3 py-2' style={{cursor:"pointer"}} key={i} onClick={() => setCategory(element)}>{element}</span>
            ))}
          </div>
          <h4 className='my-3'> Product Brands  </h4>
          <div className="product-tags d-flex flex-wrap align-items-center gap-10">
            {brands && [...new Set(brands)].map((element, i) => (
              <span className='badge bg-light text-dark rounded-3 py-2'   style={{cursor:"pointer"}} onClick={() => setBrand(element)} key={i}>{element}</span>
            ))}
          </div>
          <div>
            <h4 className='my-4'>Product Price</h4>
            <div className='d-flex align-items-center'>
              <div className="form-floating mb-3 mx-4">
                <input type="email" className="form-control" id="floatingInput" placeholder="" onChange={(e) => setMinPrice(e.target.value)} />
                <label htmlFor="floatingInput">From</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="" onChange={(e) => setMaxPrice(e.target.value)} />
                <label htmlFor="floatingInput">To</label>
              </div>
            </div>
            <div className='filter-card'>
              <h3 className=''>
                Product Tags
              </h3>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                {tags && [...new Set(tags)].map((element, i) => (
                  <span className='badge bg-light text-dark rounded-3 py-2'  style={{cursor:"pointer"}} onClick={() => setTag(element)} key={i}>{element}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${filterVisible === false ? "col-lg-12":"col-lg-9"} col-md-8 col-sm-12`} >
        <div className="filter-sort-grid">
          <div className="d-flex sort-reverse justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-10">
              <p className="mb-0 d-block" style={{ width: "100px" }}>Sort By:</p>
              <select name="" className='form-control from-select' id="" onChange={(e) => setSort(e.target.value)}>
                <option value="title">Lexicographical, A-Z</option>
                <option value="-title">Lexicographical, Z-A</option>
                <option value="price"> Price, Low to High</option>
                <option value="-price"> Price, High to Low</option>
                <option value="created"> Date, Low to High</option>
                <option value="-created"> Date, High to Low</option>
              </select>
            </div>
            {/* <div className='d-flex align-items-center gap-10 justify-content-center'>
              <p className="totalproducts mb-0">{productList?.length} Products</p>
              <div className="d-flex gap-10 align-items-center grid">
                <img onClick={() => setGrid(12)} src="images/gr.svg" className='d-block img-fluid' alt="" />
                <img onClick={() => setGrid(4)} src="images/gr2.svg" className='d-block img-fluid' alt="" />
              </div>
            </div> */}
          </div>
        </div>
        <div className="products-list pb-5">
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-10 scroll" style={{ maxHeight: "190vh", overflowX: "scroll" }}>
            <ProductCard grid={grid} datalist={productList} />
          </div>
        </div>
      </div>
      
    </div>
  </Container>
    </>
  )
}

export default OurStore