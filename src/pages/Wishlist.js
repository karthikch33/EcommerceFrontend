import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import {getWishlist} from '../features/user/userSlice'
import Container from '../components/Container'
import { Link } from 'react-router-dom'
import { addToWishlist } from '../features/products/productSlice'

const Wishlist = () => {

    const dispatch = useDispatch()

    const {wishlist} = useSelector(state=>state.user)

    const handleRemover = (prodId)=>{
        dispatch(addToWishlist(prodId))
        setTimeout(()=>{
            dispatch(getWishlist(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user'))._id:""))
        },200)
    }

    const [wish,setWishlist] = useState(wishlist)

    useEffect(()=>{
        dispatch(getWishlist(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user'))._id:""))
    },[])
    
    useEffect(()=>{
        setWishlist(wishlist)
    },[wishlist])

  return (
    <>
         <Meta title={"WishList"}/>  
        <BreadCrumb title="Wishlist"/>
        <Container fluid className="wishlist-wrapper home-wrapper-2 py-5">
    <div className="row d-flex justify-content-between">
        {wish?.length >0 ? Array.isArray(wish) &&
            wish?.map((element, i) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mx-3 my-3" key={i} style={{ marginBottom: "20px",border:"5px solid navy",borderRadius:"5%" }}>
                    <div className="wishlist-card position-relative" style={{ backgroundColor: "white" }}>
                        <img
                            src="images/cross.svg"
                            className="img-fluid cross position-absolute"
                            alt="cross"
                            onClick={() => handleRemover(element?._id)}
                        />

                        <Link to={`/product/${element?._id}`} className="wishlist-card-image d-flex align-items-center justify-content-center flex-column">

                            <div style={{ width: "100%", height: "270px" }} className="d-flex justify-content-center align-items-center">
                                <img src={element?.images[0]?.url} style={{ maxWidth: "200px", height: "200px" }} className="img-fluid" alt="" />
                            </div>

                            <div className="bg-white ps-4 py-3">
                                <h5 className="title">{element?.title.substring(0,40)+".........."}</h5>
                                <h6 className="price">&#8377; {element?.price}</h6>
                            </div>

                        </Link>
                    </div>
                </div>
            )): <div className='row'>
            <div className="col-12">
                <label htmlFor=""className='text-dark fs-1 text-center w-100 mb-4' >NO ITEMS IN FAVORITE LIST</label>
            </div>
            </div>}
    </div>
</Container>
    <h1 className='text-white'>Hello from Tailwind Css !!</h1>

    </>
  )
}

export default Wishlist