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
import { Table } from 'react-bootstrap'
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
        <Container className=" py-5">
      <Table responsive striped bordered  className="custom-table" style={{background:"#f2f2f2"}}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cart) &&
            cart.map((element, i) => {
              if (element?.orderedQuantity > 0) {
                return (
                  <tr key={i} className="custom-table-row">
                    <td className="custom-table-cell">
                      <div className="d-flex align-items-center">
                        <div className="w-55">
                          <img
                            src={element?.productId?.images[0]?.url}
                            style={{ width: '200px', height: '200px' }}
                            alt="tab1"
                          />
                        </div>
                        <div className="w-45 ms-2">
                          <h5 className="title" style={{ width: '250px' }}>
                            {element?.productId?.title}
                          </h5>
                          <h6 className="color">Color: 
                          <Color colorlist={element?.color}/></h6>
                        </div>
                      </div>
                    </td>
                    <td className="custom-table-cell fs-3">&#8377; {element?.productId?.price}</td>
                    <td className="custom-table-cell d-flex align-items-center justify-content-center gap-15">
                      <div className="d-flex flex-row h-100">
                        <label
                          htmlFor=""
                          className="custom-icon"
                          onClick={() =>
                            handleCartDecrement(
                              element?.productId?._id,
                              element?.color?._id
                            )
                          }
                        >
                          <CiCircleMinus className="fs-1 mx-2 cursor-pointer" />
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={element?.orderedQuantity}
                          name=""
                          id=""
                          min={1}
                          max={10}
                          disabled
                        />
                        <label
                          htmlFor=""
                          className="custom-icon"
                          onClick={() =>
                            handleCartAddition(
                              element?.productId?._id,
                              element?.color?._id
                            )
                          }
                        >
                          <CiCirclePlus className="fs-1 mx-2" />
                        </label>
                      </div>
                      <ImBin2
                        className="custom-icon"
                        onClick={() => removeFromCart(element?.productId?._id)}
                      />
                    </td>
                    <td className="custom-table-cell fs-3">
                      &#8377; {element?.orderedQuantity * element?.productId?.price}
                    </td>
                  </tr>
                );
              } else if (element?.orderedQuantity === 0) {
                removeFromCart(element?.productId?._id);
              }
            })}
        </tbody>
      </Table>
      <div className="col-12 py-2 mt-4">
        <Link to={'/'} className="button">
          Continue Shopping
        </Link>
        <div className="d-flex justify-content-end flex-column align-items-end mb-0">
          <h4>Sub Total: &#8377; {TotalCost}</h4>
          <p>Taxes and Shipping Calculated At CheckOut</p>
          <Link className="button" to={'/checkout'}>
            Checkout
          </Link>
        </div>
      </div>
    </Container>

    </>
  )
}

export default Cart