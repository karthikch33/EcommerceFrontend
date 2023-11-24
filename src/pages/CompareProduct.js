import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Color from '../components/Color'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { addCompareItem, getCompareItems } from '../features/user/userSlice'
const CompareProduct = () => {
    const dispatch = useDispatch()

    const {compareItemsList} = useSelector(state=>state.user)

    const [itemslist,setItemsList] = useState(compareItemsList)
    useEffect(()=>{
        dispatch(getCompareItems(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id:""))
    },[])


    const handleRemover = (productId)=>{
        dispatch(addCompareItem(`${productId} remover`))
        setTimeout(()=>{
            dispatch(getCompareItems(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id:""))
        },400)
    }

    useEffect(()=>{
        setItemsList(compareItemsList)
    },[compareItemsList])

  return (
    <>
        <Meta title={"Compare Product"}/>  
        <BreadCrumb title="Compare Products"/>
        <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
                        {
                           Array.isArray(itemslist) && itemslist.length > 0 ? itemslist.map((element,i)=>{
                                return <div className="col-3" key={i}>
                                <div className="compare-product-card position-relative my-3">
                             <img src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid' onClick={()=>handleRemover(element?._id)}/>
                            <div className="product-card-image d-flex align-item-center justify-content-center">
                                <img src={element?.images[0]?.url} className='img-fluid ' style={{maxWidth:"200px",maxHeight:"200px"}} alt="watch" />
                            </div>
                            <div className="compare-product-details">
                                <h5 className='title text-center my-3'>
                                    {element?.title}
                                </h5>
                                <h6 className='price text-end'>&#8377; {element?.price}</h6>
                                <div className='product-detail'>
                                    <h5>Brand</h5>
                                    <p>{element?.brand}</p>
                                </div>
                                <div className='product-detail'>
                                    <h5>Type</h5>
                                    <p>{element?.category}</p>
                                </div>
                                <div className='product-detail'>
                                    <h5>Availability</h5>
                                    <p className='mb-0'>{element?.quantity > 0 ? <p  style={{color:"green"}}>IN STOCK</p>: <p style={{color:"red"}}>OUT OF STOCK</p>}</p>
                                </div>
                                <div className='product-detail'>
                                    <h5>Color</h5>
                                    <Color colorlist={element?.color}/>
                                </div>
                                <div className='product-detail'>
                                    <h5>Size</h5>
                                    <div className="d-flex gap-10">
                                        <p>S</p>
                                        <p>M</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                                </div>
                            }) : null
                        }
                    </div>
        </Container>
        

    </>
  )
}

export default CompareProduct