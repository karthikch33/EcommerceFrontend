import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, resetState } from '../features/user/userSlice'


let schema = yup.object().shape({
    firstname:yup.string().required("FirstName is Required"),
    lastname:yup.string().required("LastName is Requrired"),
    email:yup.string().nullable().required("Email Should Be in Valid Condition"),
    mobile:yup.string().required("Mobile is Required"),
    password:yup.string().required("Password is Required")
})

const SignUp = () => { 

    const dispatch = useDispatch()

    const {isError} = useSelector(state=>state.user)


    const formik = useFormik({
        initialValues:{
            firstname:"",
            lastname:"",
            email:"",
            mobile:"",
            password:""
        },
        validationSchema:schema,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:(values)=>{
            dispatch(registerUser(values))
            if(!isError)
            formik.resetForm()
            // else
            dispatch(resetState())
        }
    })

  return (
    <>
    <Meta title={"SignUp"}/>  
    <BreadCrumb title="SignUp"/>
    <Container class1='login-wrapper py-5 home-wrapper-2'>
                    <div className="row">
                        <div className="col-12">
                            <div className='login-card'>
                            <h3 className='text-center fs-2 p-4'>SignUp</h3>
                        <form action="" className='gap-15 d-flex flex-column p-3' onSubmit={formik.handleSubmit}>

                            <CustomInput type="text" name='firstname' className='' id="firstname"  placeholder='FirstName' value={formik.values.firstname} onChange={formik.handleChange("firstname")} />

                            
                                <div className='error'>
                                    {
                                        formik.touched.firstname && formik.errors.firstname
                                    }
                                </div>
                           

                            <CustomInput type="text" name='lastname' className=''  placeholder='LastName' value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}/>

                                <div className='error'>
                                    {
                                        formik.touched.lastname && formik.errors.lastname
                                    }
                                </div>

                             <CustomInput type="email" name='email' className='form-control' placeholder='Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}/>

                                <div className='error'>
                                    {
                                        formik.touched.email && formik.errors.email
                                    }
                                </div>
                             
                            <CustomInput type="tel" name='mobile' className='form-control'  placeholder='Phone Number' value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlue={formik.handleBlur("mobile")}/>

                                <div className='error'>
                                    {
                                        formik.touched.mobile && formik.errors.mobile
                                    }
                                </div>

                            <CustomInput type="password" name='password' className='form-control' placeholder='Password' value={formik.values.password} onChange={formik.handleChange("password")}/>

                                <div className='error'>
                                    {
                                        formik.touched.password && formik.errors.password
                                    }
                                </div>
                            
                            <div>
                                <div className='d-flex justify-content-center align-items-center gap-15'>
                                    <Link className='button' to={"/login"}>Login</Link>
                                    <button className='button' type='submit'>SignUp</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
        </Container>
    </>
  )
}

export default SignUp