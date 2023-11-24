import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {config} from '../utils/axiosConfig'
import { createAnOrder, emptyEntireCart } from '../features/user/userSlice'
import { toast } from 'react-toastify'

const Checkout = () => {

    const dispatch = useDispatch()
    const cartState = useSelector(state=>state.user.userCart)
    const {orderPlaced} = useSelector(state=>state.user)

    
    let schema = yup.object().shape({
        name:yup.string().required("Name is Required"),
        email:yup.string().required("Email is Required"),
        address:yup.string().required("Address Details are Required"),
        street:yup.string().required("Street Details are Required"),
        state:yup.string().required("State is Required"),
        country:yup.string().required("Country is Required"),
        city:yup.string().required("City is Required"),
        pincode:yup.number().required("PinCode is Required")
    })

    useEffect(()=>{
        dispatch(emptyEntireCart())
    },[orderPlaced])
    
    const [shippingInfo,setShippingInfo] = useState(null)
    const [paymentInfo,setPaymentInfo] = useState({
        razorpayPaymentId: "gfnf",
        razorpayOrderId: "fdgfd",
    })
    const [cartProductState,setCartProductState] = useState([])

    const formik = useFormik({
        initialValues:{
            name:'',
            address:'',
            state:'',
            country:'',
            street:"",
            email:'',
            city:'',
            pincode:''
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            setShippingInfo(values)
            if (shippingInfo !== null) {
                checkOutHandler();
            }
            else{
                toast.error("Something went wrong!")
                // window.location.reload()
            }
        }
    })

    useEffect(()=>{
        setPaymentInfo(paymentInfo)
        setShippingInfo(shippingInfo)
    },[shippingInfo,paymentInfo])


    useEffect(()=>{
        let items = []
                for (let index = 0; index < cartState.length; index++) {
                    items.push({
                        product:cartState[index]?.productId?._id,
                        quantity:cartState[index]?.orderedQuantity,
                        color:cartState[index]?.color?._id,
                        price:cartState[index]?.productId?.price
                    })
                }
                setCartProductState(items)
    },[cartState])



    const loadScript = (src)=>{
        return new Promise((resolve,reject)=>{
            const script = document.createElement('script')
            script.src = src
            script.onload = ()=>{
                resolve(true)
            }
            script.onerror = ()=>{
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const checkOutHandler = async ()=>{
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res)
        {
            alert('Razor Pay SDK Failed To Load')
            return;
        }
        const result = await axios.post('http://localhost:1507/api/user/order/checkout',{amount:TotalCost+40},config)
        if(!result)
        {   
            alert('Something Went Wrong')
            return;
        }
        const {amount,id:order_id,currency} = result.data.order
        const options = {
            key: "rzp_test_ugc9pXTgWudCep", // Enter the Key ID generated from the Dashboard
            amount: amount * 100,
            currency: currency,
            name: "AppC",
            description: "Test Transaction",
            image: {  },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };

                const result = await axios.post("http://localhost:1507/api/user/order/paymentverification", data,config);

                console.log(result);

                if (response && response.razorpay_payment_id && response.razorpay_order_id) {
                    console.log(response.razorpay_payment_id);
                    console.log(response.razorpay_order_id);
                    setPaymentInfo({
                        razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    })
                    console.log(paymentInfo);
                    setTimeout(()=>{
                        dispatch(createAnOrder({
                            totalPrice:TotalCost,
                            totalPriceAfterDiscount:TotalCost,
                            orderItems:cartProductState,
                            paymentInfo:paymentInfo,
                            shippingInfo:shippingInfo
                        }))
                    },2000)
                } else {
                    console.error("Invalid response from Razorpay:", response);
                }

                

               

            },
            prefill: {
                name: "AppC",
                email: "AppC@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "AppC Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }

    let TotalCost = 0

  return (
    <>
      <Meta title={"CheckOut"}/>  
        <BreadCrumb title="Checkout"/>
        <Container class1="check-out-wrapper home-wrapper-2 py-5">
        <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data"></div>
                        <h3 className='website-name'>AppC</h3>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item text-dark"><Link className='text-dark' to="/">Home</Link></li>
                                <li class="breadcrumb-item text-dark"><Link className='text-dark'  to="/cart">Cart</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Information</li>
                            </ol>
                        </nav>
                        <h4 className='title'>Contact Information</h4>
                        <p className="user-details">
                            Karthik Pavan Aditya (saipavan39dh@gmail.com)
                        </p>
                        <h5 className='fs-2'>Shipping Address</h5>
                        <form action="" className='d-flex gap-15 flex-wrap justify-content-between' onSubmit={formik.handleSubmit}>
                            <div className='flex-grow-1 w-100'>
                                <select name="country" onChange={formik.handleChange('country')} onBlur={formik.handleBlur('country')} id="" className='form-select'>
                                    <option value="" selected disabled> Select Country</option>
                                    <option value="india">India</option>
                                </select>
                            </div>

                            <div className='error'>
                                {
                                    formik.touched.country && formik.errors.country
                                }
                            </div>

                            <div className='flex-grow-1 form-floating'>
                                <input type="text" className="form-control" placeholder='Name' value={formik.values.name} onChange={formik.handleChange('name')} name='name' onBlur={formik.handleBlur('name')}/>
                                <label htmlFor="">Name</label>
                            </div>

                            <div className='error'>
                                {
                                    formik.touched.name && formik.errors.name
                                }
                            </div>

                            <div className='flex-grow-1 form-floating'>
                            <input type="text" className="form-control" onChange={formik.handleChange('email')} value={formik.values.email} name='email'onBlur={formik.handleBlur('email')} placeholder='Email'/>
                            <label htmlFor="">Email</label>
                            </div>


                            <div className='error'>
                                {
                                    formik.touched.email && formik.errors.email
                                }
                            </div>

                            <div className='w-100 form-floating'>
                            <input type="text" className="form-control" name='address' value={formik.values.address} placeholder='Address' onChange={formik.handleChange('address')} onBlur={formik.handleBlur('address')}/>
                            <label htmlFor="">Address</label>
                            </div>

                            <div className='error'>
                                {
                                    formik.touched.address && formik.errors.address
                                }
                            </div>

                            <div className='w-100 form-floating'>
                            <input type="text" name='street' value={formik.values.street}  onChange={formik.handleChange('street')} onBlur={formik.handleBlur('street')} className="form-control" placeholder='Apartment,suite,D-No'/>
                            <label htmlFor="">Apartment,suite,D-No</label>
                            </div>

                            <div className='error'>
                                {
                                    formik.touched.street && formik.errors.street
                                }
                            </div>

                            <div className='flex-grow-1 form-floating'>
                            <input type="text" className="form-control" name='city' value={formik.values.city} onChange={formik.handleChange('city')} onBlur={formik.handleBlur('city')} placeholder='City' />
                            <label htmlFor="">City</label>
                            </div>

                            <div className='error'>
                                {
                                    formik.touched.city && formik.errors.city
                                }
                            </div>

                            <div className='flex-grow-1'>
                                <select name="state" value={formik.values.state} onChange={formik.handleChange('state')} onBlur={formik.handleBlur('state')} id="" className='form-control form-select h-100'>
                                    <option value="" disabled selected>Select State</option>
                                    <option value="Andhra Pradesh" >Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh" >Arunachal Pradesh</option>
                                </select>
                            </div>


                            <div className='error'>
                                {
                                    formik.touched.state && formik.errors.state
                                }
                            </div>


                            <div className='flex-grow-1 form-floating'>
                            <input type="number" value={formik.values.pincode} onChange={formik.handleChange('pincode')} name='pincode' onBlur={formik.handleBlur('pincode')}  className="form-control" placeholder='Zip Code'/>
                            <label htmlFor="">Zip Code</label>
                            </div>

                            <div className='error'>
                                {
                                    formik.touched.pinCode && formik.errors.pinCode
                                }
                            </div>

                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to={"/cart"} className='button '>Back To Cart</Link>
                                    <button type='submit' className='button btn bg-warning'>Continue Payment</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-5" >
                        <div style={{maxHeight:"60vh",overflowY:"scroll"}} className='scroll'>
                        {
                            Array.isArray(cartState) && cartState?.map((item,i)=>{
                                return <div className='border-bottom py-4' >
                                <div className="d-flex gap-10 align-items-center">
                                <div className='w-75 d-flex gap-10 '>
                                     <div className='w-25 position-relative'>
                                         <span style={{top:"-10px",right:"0px"}} className='badge bg-secondary text-white rounded-circle position-absolute'>{item?.orderedQuantity}</span>
                                         <img src={item?.productId?.images[0]?.url} className='img-fluid' stle={{width:"100px",height:"100px"}} alt="tab" />
                                     </div>
                                     <div className=''>
                                         <h5 className='title ms-4'>{item?.productId?.title}</h5>
                                         <p className='ms-4' dangerouslySetInnerHTML={{__html:item?.productId?.description.substr(0,150)+"........"}}></p>
                                     </div>
                                </div>
                                     <div className='flex-grow-1'>
                                         <h5>&#8377; {item?.productId?.price}</h5>
                                     </div>
                                     </div>
                                     <div className='d-none'>
                            {TotalCost += item?.orderedQuantity * item?.productId?.price}
                            </div>
                             </div>
                            })
                        }
                        </div>
                        <div className='d-flex justify-content-between align-item-center'>
                            <p>Sub Total</p>
                            <p>&#8377; {TotalCost}</p>
                        </div>
                        <div className='d-flex justify-content-between align-item-center'>
                            <p>Shipping</p>
                            <p>&#8377; 40</p>
                        </div>
                        <div className='d-flex justify-content-between align-item-center border-top py-4'>
                            <h4>Total</h4>
                            <h5>&#8377; {TotalCost + 40}</h5>
                        </div>
                    </div>
                </div>
        </Container>
    </>
  )
}

export default Checkout