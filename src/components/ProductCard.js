import React, { useEffect, useState } from 'react'
import ReactStars  from 'react-rating-stars-component'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {AiTwotoneHeart} from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { addToWishlist } from '../features/products/productSlice'
import { addCompareItem, getCompareItems, getWishlist, reset } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import LoadingPage from './Loading'
import { message } from 'antd'
const ProductCard = React.memo((props) => {

    const dispatch = useDispatch()
    const {grid, datalist} = props
    
    const {wishlist} = useSelector(state=>state.user,shallowEqual)
    const [wish,setWish] = useState(wishlist)
    const [duplicateSuccess,setDuplicateSuccess] = useState(true)
    

    useEffect(()=>{
        dispatch(getWishlist(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user'))._id:null))
        dispatch(getCompareItems(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user'))._id:null))
    },[])

    useEffect(()=>{
        setWish(wishlist)
    },[wishlist,dispatch])

    const handleWishlist = (productId)=>{
            dispatch(addToWishlist(productId))
            setTimeout(()=>{
                dispatch(getWishlist(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user'))._id:null))
            },300)
    }

    const {alreadyExist} = useSelector(state=>state.user)

    const handleCompare = (productId)=>{
        dispatch(addCompareItem(productId))
    }

    useEffect(() => {
        if (alreadyExist === false && duplicateSuccess) {
            setDuplicateSuccess(false)
          message.success("Added Successfully", 2); 
          setTimeout(() => {
            dispatch(reset());
            setDuplicateSuccess(true)
          }, 600);
        } else if (alreadyExist === true && duplicateSuccess) {
            setDuplicateSuccess(false)
          message.info("Already This Item Exists In Compare List", 2); 
          setTimeout(() => {
            dispatch(reset());
            setDuplicateSuccess(true)
          }, 600);
        } else {
        }
      }, [alreadyExist, dispatch]);

    let location = useLocation();

  return (
    <>
        {
            Array.isArray(datalist) ? datalist?.map((element,i)=>{
                return (
              <div className={` ${location.pathname === '/store' ? `gr-${grid}` : "col-12 col-sm-6 col-md-4 col-lg-3"} `} key={i}>
            <div className='position-relative product-card'>
                <div className="wishlist-icon position-absolute">
                {
                    (Array.isArray(wish) && wish?.some(item => item?._id?.includes(element?._id))) ?
                    <button className='border-0 bg-transparent' onClick={() => handleWishlist(element?._id)}><AiTwotoneHeart className='fs-3' style={{ color: "red" }} /></button>
                    :
                    <button className='border-0 bg-transparent' onClick={() => handleWishlist(element?._id)}><img src="../images/wish.svg" alt="" style={{ width: "30px" }} /></button>
                }
                </div>
                <Link className="" to={`/product/${element?._id}`}>
                <div className="product-image d-flex align-items-center justify-content-center w-100">
                <img src={element?.images[0]?.url} className='' style={{maxWidth:"200px",maxHeight:"200px"}} alt="" />
                <img src={element?.images[0]?.url} className='' style={{maxWidth:"200px",maxHeight:"200px"}} alt="" />
                </div>
                <div className="product-details">
                    <h6 className='brand'>{element?.brand}</h6>
                    <h5 className='product-title'>
                    <p>
                        {element?.title}
                    </p>
                    </h5>
                    <ReactStars
                    count={5}
                    size={20}
                    value={parseInt(element?.totalrating)}
                    edit={false}
                    />
                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                    dangerouslySetInnerHTML={{ __html: element?.description }}
                    ></p>
                    <p className='price'>&#8377;{element?.price}</p>
                </div>
                </Link>
                <div className="action-bar position-absolute">
                <div className='d-flex flex-column gap-15'>
                    <Link to={`/product/${element?._id}`}>
                    <button className='border-0 bg-transparent'><img src="../images/view.svg" alt="view" /></button>
                    </Link>
                    <button className='border-0 bg-transparent'><img src="../images/prodcompare.svg" alt="" onClick={() => handleCompare(element?._id)} /></button>
                    <button className='border-0 bg-transparent'><img src="../images/add-cart.svg" alt="" /></button>
                </div>
                </div>
  </div>
</div>

                )
            }) : <LoadingPage height={"40vh"}/>
        }
    
    </>
  )
})

export default ProductCard