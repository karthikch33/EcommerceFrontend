import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Color from '../components/Color'
import Container from '../components/Container'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addCompareItem, getCompareItems } from '../features/user/userSlice'
import { Link } from 'react-router-dom'
const CompareProduct = () => {
    const dispatch = useDispatch()

    const {compareItemsList} = useSelector(state=>state.user)
    const [messageApi,contextHolder] = message.useMessage()

    const [itemslist,setItemsList] = useState(compareItemsList)
    useEffect(()=>{
        dispatch(getCompareItems(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id:""))
        .then((response)=>{
            setItemsList(response?.payload?.compareItems)
        })
    },[])

    const handleRemover = (productId)=>{
        messageApi.open({
            key:'updatable',
            type:'loading',
            content:'Loading...'
        })
        dispatch(addCompareItem(`${productId}`))
        .then((response)=>{
            const status = response?.payload['status']
            dispatch(getCompareItems(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id:""))
            .then((response)=>{
                if(status === 403){
                    messageApi?.open({
                        key :'updatable',
                        type:'success',
                        content:'Removed From Compare List',
                    })
                }
                else{
                    messageApi?.open({
                        key : 'updatable',
                        type:'error',
                        content:'Error Occured'
                    })
                }
                setItemsList(response?.payload?.compareItems)
            })
        })
    }

  return (
    <>
    {contextHolder}
        <Meta title={"Compare Product"}/>  
        <BreadCrumb title="Compare Products"/>
        <Container fluid className="home-wrapper-2" >
             <div className="row d-flex justify-content-center">
        {Array.isArray(itemslist) && itemslist.length > 0
            ? itemslist.map((element, i) => (
                <div className="col-lg-3 col-md-4 col-sm-6  col-12 mx-3 my-3"key={i}>
                    <div className="compare-product-card position-relative my-3 d-flex justify-content-center">
                        <img
                            src="images/cross.svg"
                            alt="cross"
                            className="position-absolute cross img-fluid"
                            onClick={() => handleRemover(element?._id)}
                        />
                    <Link to={`/product/${element?._id}`}>
                        <div style={{ width: "100%", height: "200px"}} className=" ">
                            <img
                                src={element?.images[0]?.url}
                                className="img-fluid"
                                style={{ maxWidth: "200px", height: "200px" }}
                                alt="watch"
                            />
                        </div>
                        <div className="compare-product-details">
                            <h5 className="title text-center ">{element?.title.substring(0,30)+"......."}</h5>
                            <div className="product-detail">
                                <h5>Price</h5>
                                <p style={{color:'red'}}>&#8377;{element?.price}</p>
                            </div>
                            <div className="product-detail">
                                <h5>Brand</h5>
                                <p>{element?.brand}</p>
                            </div>
                            <div className="product-detail">
                                <h5>Type</h5>
                                <p>{element?.category}</p>
                            </div>
                            <div className="product-detail">
                                <h5>Availability</h5>
                                <p className="mb-0">
                                    {element?.quantity > 0 ? (
                                        <p style={{ color: "green" }}>IN STOCK</p>
                                    ) : (
                                        <p style={{ color: "red" }}>OUT OF STOCK</p>
                                    )}
                                </p>
                            </div>
                            <div className="product-detail d-none">
                                <h5>Color</h5>
                                <Color colorlist={element?.color} />
                            </div>
                            <div className="product-detail d-none">
                                <h5>Size</h5>
                                <div className="d-flex gap-10">
                                    <p>S</p>
                                    <p>M</p>
                                </div>
                            </div>
                        </div>
                </Link>
                    </div>
                    </div>
            ))
            : <div className='row'>
                <div className="col-12">
                    <label htmlFor=""className='text-dark fs-1 text-center w-100 mb-4' >NO ITEMS IN COMPARE LIST</label>
                </div>
                </div>}
    </div>
</Container>

        

    </>
  )
}

export default CompareProduct