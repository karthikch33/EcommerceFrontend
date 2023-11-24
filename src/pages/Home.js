import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import BlogCard from '../components/BlogCard'
import ProductCard from '../components/ProductCard'
import SpecialProduct from '../components/SpecialProduct'
import Meta from '../components/Meta'
import services from '../utils/Data'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../features/blogs/blogSlice'
import LoadingPage from '../components/Loading'
import moment from 'moment'
import { getProducts } from '../features/products/productSlice'
import { getWishlist } from '../features/user/userSlice'
const Home = () => {


  const dispatch = useDispatch()
  const {FetchedBlogs} = useSelector(state=>state.blogs)

  const [blogs,setBlogs] = useState(null)

  
  useEffect(()=>{
    dispatch(getAllBlogs())
  },[])
  
  useEffect(()=>{
    setBlogs(FetchedBlogs)
  },[FetchedBlogs])
  
  const [products,setProducts] = useState(null)
  const [filterdPopularProducts,setFilteredPopularProducts] = useState(null)
  const [filterdFeaturedProducts,setFilteredFeaturedProducts] = useState(null)

  const {productList} = useSelector(state=>state.product)

  useEffect(()=>{
    dispatch(getProducts())
  },[])

  useEffect(()=>{
    setProducts(productList)
  },[productList])
  
  useEffect(()=>{
    if(Array.isArray(products))
    setFilteredPopularProducts(products?.filter(element=> element?.tags?.includes('Popular')))
  },[products])

  useEffect(()=>{
    if(Array.isArray(products))
    setFilteredFeaturedProducts(products?.filter(element=>element?.tags?.includes('Featured')))
  },[products])


  return (
    <>
     <Meta title="Home"/>
     <Container class1="home-wrapper-1 py-5">
     <div className="row">
              <div className="col-5">
                 <div className="main-banner position-relative p-3">
                  <img src="images/main-banner.jpeg" className='img-fluid rounded-2 ' alt="main banner" />
                  <div className="main-banner-content position-absolute">
                    <h4>ULTIMATE BASE FOR YOUTH</h4>
                    <h5>JBL Stereo</h5>
                    <p>Starts From &#8377;2999 to &#8377;7999</p>
                    <Link className='button'>Go There</Link>
                  </div>
                 </div>
              </div>
              <div className="col-7">
                 <div className="d-flex flex-wrap  align-items-center">
                 <div className="small-banner position-relative p-3">
                  <img src="images/catbanner-01.jpg" className='img-fluid rounded-2 ' alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Gaming Special edition</h4>
                    <h5>ROG Strix</h5>
                    <p >Starts From &#8377;49999 to &#8377;1,77999</p>
                  </div>
                 </div>
                 <div className="small-banner position-relative p-3">
                  <img src="images/catbanner-02.webp" className='img-fluid rounded-2 ' alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Camera Special</h4>
                    <h5 className='text-info'>POCO M4 PRO</h5>
                    <p  style={{color:"#0dcaf0"}}>Starts From &#8377;49999 to &#8377;1,77999</p>
                  </div>
                 </div>
                 <div className="small-banner position-relative p-3">
                  <img src="images/catbanner-03.jpg" className='img-fluid rounded-2 ' alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4 >Entertainment Sale</h4>
                    <h5 style={{color:"#9db84d"}}>Xiaomi Screens</h5>
                    <p  style={{color:"#fae92d"}}>Starts From &#8377;8999 to &#8377;17999</p>
                  </div>
                 </div>
                 <div className="small-banner position-relative p-3">
                  <img src="images/catbanner-04.jpg" className='img-fluid rounded-2 ' alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Washing Machines</h4>
                    <h5 className='text-white' style={{letterSpacing:"2px"}}>Haier 4s</h5>
                    <p  style={{color:"#560000"}}>Starts From &#8377;8999 to &#8377;17999</p>
                  </div>
                 </div>
                 </div>
              </div>
            </div>
     </Container>
     <Container class1="home-wrapper-2 py-5">
     <div className="row">
              <div className="col-12">
                <div className="services d-flex align-items-center justify-content-between">
                  {
                      services?.map((i,j)=>{ 
                          return(
                            <div className='d-flex align-items-center gap-15' key={j}>
                              <img src={i.image} alt='services'/>
                              <div>
                                <h6>{i.title}</h6>
                                <p className='mb-0'>{i.tagline}</p>
                                </div>
                              </div>
                          )
                      })
                  }
                </div>
              </div>
            </div>
     </Container>

     <Container class1="home-wrapper-3 py-5">
     <div className="row">
              <div className="col-12">
                <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                    <div className='d-flex gap-30 align-items-center justify-content-center'>
                      <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                      </div>
                      <img src="images/camera.jpg" alt="camera" />
                    </div>
                    <div className='d-flex gap-30 align-items-center justify-content-center'>
                      <div>
                        <h6>Smart Tv</h6>
                        <p>15 Items</p>
                      </div>
                      <img src="images/tv.jpg" alt="camera" />
                    </div>
                    <div className='d-flex gap-30 align-items-center justify-content-center'>
                      <div>
                        <h6>Smart Watches</h6>
                        <p>10 Items</p>
                      </div>
                      <img src="images/watch.jpg" alt="camera" />
                    </div>
                    <div className='d-flex gap-30 align-items-center justify-content-center'>
                      <div>
                        <h6>Music & Gaming</h6>
                        <p>10 Items</p>
                      </div>
                      <img src="images/headphone.jpg" alt="camera" />
                    </div>
                    <div className='d-flex gap-30 align-items-center justify-content-center'>
                      <div>
                        <h6>Tabs</h6>
                        <p>10 Items</p>
                      </div>
                      <img src="images/tab.jpg" alt="camera" />
                    </div>
                    <div className='d-flex gap-30 align-items-center justify-content-center'>
                      <div>
                        <h6>Speakers</h6>
                        <p>15 Items</p>
                      </div>
                      <img src="images/speaker.jpg" alt="camera" />
                    </div>
                    <div className='d-flex gap-30 align-items-center justify-content-center'>
                      <div>
                        <h6>Laptops</h6>
                        <p>10 Items</p>
                      </div>
                      <img src="images/laptop.jpg" alt="camera" />
                    </div>
                    <div className='d-flex gap-30 align-items-center justify-content-center'>
                      <div>
                        <h6>Washing Machines</h6>
                        <p>10 Items</p>
                      </div>
                      <img src="images/washingmachine.webp" alt="camera" />
                    </div>
                </div>
              </div>
            </div>
     </Container>
     
     <Container class1="featured-wrapper py-5 home-wrapper-2">
     <div className="row">
              <div className="col-12">
                <h3 className='section-heading'>Featured Collections</h3>
              </div>
              <ProductCard datalist={filterdFeaturedProducts}/>
            </div>
     </Container>


      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
      <div className="row ">
            <div className="col-3 ">
              <div className="famous-card position-relative">
                <img src="images/famous-01.avif" className='img-fluid' style={{mixBlendMode:"multiply"}} alt="" />
                <div className="famous-content position-absolute">
                <h5 className='text-white'>Big Screen</h5>
                <h6 className='text-white'>Smart Analog Series 7</h6>
                <p className='text-white'>From &#8377;500 or &#8377; 100/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3 ">
              <div className="famous-card position-relative">
                <img src="images/famous-01.avif" className='img-fluid' style={{mixBlendMode:"multiply"}} alt="" />
                <div className="famous-content position-absolute">
                <h5 className='text-white'>Big Screen</h5>
                <h6 className='text-white'>Smart Analog Series 7</h6>
                <p className='text-white'>From &#8377;500 or &#8377; 100/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3 ">
              <div className="famous-card position-relative">
                <img src="images/famous-01.avif" className='img-fluid' style={{mixBlendMode:"multiply"}} alt="" />
                <div className="famous-content position-absolute">
                <h5 className='text-white'>Big Screen</h5>
                <h6 className='text-white'>Smart Analog Series 7</h6>
                <p className='text-white'>From &#8377;500 or &#8377; 100/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
            <div className="col-3 ">
              <div className="famous-card position-relative">
                <img src="images/famous-01.avif" className='img-fluid' style={{mixBlendMode:"multiply"}} alt="" />
                <div className="famous-content position-absolute">
                <h5 className='text-white'>Big Screen</h5>
                <h6 className='text-white'>Smart Analog Series 7</h6>
                <p className='text-white'>From &#8377;500 or &#8377; 100/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>
          </div>
      </Container> */}

      <Container class1="special-wrapper py-5 home-wrapper-2">
      <div className="row">
            <div className="col-12">
              <h3 className='section-heading'>Special Products</h3>
            </div>
            <div className="row ">
              {
                products === null ? <LoadingPage  height={"40vh"}/> : Array.isArray(products) && products?.map((element,i)=>{
                   if(element?.tags?.includes('Special'))
                   return   <SpecialProduct className="mb-2" title={element?.title} brand={element?.brand} price={element?.price} image={element?.images[0]?.url} rating={element?.totalrating.toString()} quantity={element?.quantity} sold={element?.sold}/>
                   return ""
                })
              }              
            </div>
          </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
      <div className="row">
              <div className="col-12">
                <h3 className='section-heading'>Popular Collections</h3>
              </div>
            </div>
            <div className="row">
            {
                 filterdPopularProducts === null ? <LoadingPage  height={"40vh"}/> : Array.isArray(filterdPopularProducts) && <ProductCard datalist={filterdPopularProducts}/>
            }
            </div>
      </Container>

      <Container class1="marque-wrapper py-5">
      <div className="row">
              <div className="col-12">
                <div className='marquee-inner-wrapper card-wrapper'>
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'><img src="images/brand-01.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-02.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-03.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-04.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-05.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-06.png" alt="brand" /></div>
                  <div className='mx-4 w-25'><img src="images/brand-07.png" alt="brand" /></div>
                </Marquee>
                </div>
              </div>
            </div>
      </Container>
      
      <Container class1="blog-wrapper py-5 home-wrapper-2">
      <div className="row">
              <div className="col-12">
                <h3 className='section-heading'>Our Latest Blogs</h3>
              </div>
                {
                  blogs === null ? <LoadingPage height={"400px"}/> : Array.isArray(blogs) && blogs?.map((element,i)=>{
                    return <BlogCard title={element?.title} descrpition={element?.description} category={element?.category} id={element?._id} image ={element?.images[0]?.url}  date={moment(element?.createdAt).format("MMMM Do YYYY, h:mm a")} key={i}/>
                  })
                }
            </div>
      </Container>
     
    </>
  )
}

export default Home