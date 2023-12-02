import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import ReactStar from 'react-rating-stars-component'
import Meta from '../components/Meta'
import {useDispatch, useSelector} from 'react-redux'
import ProductCard from '../components/ProductCard'
import Color from '../components/Color'
import Container from '../components/Container'
import { getProducts } from '../features/products/productSlice'
import { Col } from 'antd'
const OurStore = () => {
    const [grid,setGrid] = useState(4);
    const {productList} = useSelector(state=>state?.product)
    const [brands,setBrands] = useState([])
    const [categories,setCategories] = useState([])
    const [tags,setTags] = useState([])


    // Filter States
    const [tag,setTag] = useState(null)
    const [category,setCategory] = useState(null)
    const [brand,setBrand] = useState(null)
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

    console.log(brands,categories,tags);


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
        setBrands(newBrands)
        setCategories(newCategory)
        setTags(newTags)
    },[productList])
    
    // alert(grid)
                          
  return (
    <>
        <Meta title={"OurStore"}/>  
        <BreadCrumb title="OurStore"/>
        <Container className="store-wrapper home-wrapper-2 py-5">
    <div className="row">
      <div className="col-lg-3 col-md-4">
        <div className='filter-card'>
          <h3 className='filter-title fs-3 my-3'>
            Filter By 
          </h3>
          <h4>Product Categories</h4>
          <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
            {categories && [...new Set(categories)].map((element, i) => (
              <span className='badge bg-light text-dark rounded-3 py-2' key={i} onClick={() => setCategory(element)}>{element}</span>
            ))}
          </div>
          <h4 className='my-3'> Product Brands  </h4>
          <div className="product-tags d-flex flex-wrap align-items-center gap-10">
            {brands && [...new Set(brands)].map((element, i) => (
              <span className='badge bg-light text-dark rounded-3 py-2' onClick={() => setBrand(element)} key={i}>{element}</span>
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
                  <span className='badge bg-light text-dark rounded-3 py-2' onClick={() => setTag(element)} key={i}>{element}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-9 col-md-8">
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
            <div className='d-flex align-items-center gap-10 justify-content-center'>
              <p className="totalproducts mb-0">{productList?.length} Products</p>
              <div className="d-flex gap-10 align-items-center grid">
                <img onClick={() => setGrid(12)} src="images/gr.svg" className='d-block img-fluid' alt="" />
                <img onClick={() => setGrid(6)} src="images/gr2.svg" className='d-block img-fluid' alt="" />
                <img onClick={() => setGrid(4)} src="images/gr3.svg" className='d-block img-fluid' alt="" />
                <img onClick={() => setGrid(3)} src="images/gr4.svg" className='d-block img-fluid' alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="products-list pb-5">
        <div className="d-flex flex-wrap gap-10 scroll" style={{ maxHeight: "190vh", overflowX: "scroll" }}>
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