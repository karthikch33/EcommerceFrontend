import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import {ImBin2} from 'react-icons/im'
import { Link } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, emptyCartUsingProductId, getCart } from '../features/user/userSlice'
import Color from '../components/Color'
const Cart = () => {

    const {userCart} = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const [cart,setCart] = useState(null)

    const handleCartAddition = (productId,colorId)=>{
        dispatch(addToCart({
            productId,
            colorId,
            orderedQuantity:1
        }))
        setTimeout(()=>{
            dispatch(getCart(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))?._id:""))
        },300)
    }

    const removeFromCart = (productId)=>{
        dispatch(emptyCartUsingProductId(productId))
        setTimeout(()=>{
            dispatch(getCart(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))?._id:""))
        },300)
    }

    const handleCartDecrement = (productId,colorId)=>{
        dispatch(addToCart({
            productId,
            colorId,
            orderedQuantity:-1
        }))
        setTimeout(()=>{
            dispatch(getCart(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))?._id:""))
        },300)
    }

    let TotalCost = 0

    useEffect(()=>{
        setCart(userCart)
    },[userCart])

  return (
    <>
          <Meta title={"Cart"}/>  
        <BreadCrumb title="Cart"/>
        <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
                    <div className="col-12">
                        <div className=" cart-header d-flex align-items-center justify-content-between">
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        </div>
                        {
                            Array.isArray(cart) && cart?.map((element,i)=>{
                                if(element?.orderedQuantity > 0){
                                return <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                            <div className='cart-col-1 d-flex align-items-center justify-content-between w-25 h-25' >
                                <div className='w-55'>
                                    <img src={element?.productId?.images[0]?.url} style={{width:"200px", height:"200px"}} sclassName='img-fluid' alt="tab1" />
                                </div>
                                <div className="w-45 ms-2">
                                    <h5 className='title' style={{width:"250px"}}>{element?.productId?.title}</h5>
                                    <h6 className='color'>Color: </h6>
                                    <Color colorlist={element?.color}/>
                                </div>
                            </div>
                            <div className='cart-col-2 fs-3'>
                                &#8377; {element?.productId?.price}
                            </div>
                            <div className='cart-col-3 d-flex align-items-center gap-15'>
                                <div className='d-flex flex-row'>
                                  <label htmlFor="" style={{cursor:"pointer"}}  onClick={()=>handleCartDecrement(element?.productId?._id,element?.color?._id)}><CiCircleMinus className='fs-1 mx-2 cursor-pointer'/></label>

                                <input type="number" className='form-control' value={element?.orderedQuantity} name=''id='' min={1}max={10} disabled/>

                                 <label htmlFor="" style={{cursor:"pointer"}}  onClick={()=>handleCartAddition(element?.productId?._id,element?.color?._id)}><CiCirclePlus  className='fs-1 mx-2'/></label>
                                </div>
                                <ImBin2 style={{cursor:"pointer"}} onClick={()=>removeFromCart(element?.productId?._id)}/>
                            </div>  
                            <div className='cart-col-4 fs-3'> &#8377; {element?.orderedQuantity * element?.productId?.price}</div>
                            <div className='d-none'>
                            {TotalCost += element?.orderedQuantity * element?.productId?.price}
                            </div>
                    </div>
                            }
                            else if(element?.orderedQuantity === 0){
                                removeFromCart(element?.productId?._id)
                            }
                            })
                        }
                      <div className='col-12 py-2 mt-4'>
                        <Link to={"/"} className='button'>Continue Shopping</Link>
                        <div className='d-flex justify-content-end flex-column align-items-end mb-0'>
                            <h4>Sub Total: &#8377; {TotalCost}</h4>
                            <p>Taxes and Shipping Calculated At CheckOut</p>
                            <Link className='button' to={"/checkout"}>Checkout</Link>
                        </div>
                      </div>

                </div>
        </Container>
    </>
  )
}

export default Cart