import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import * as yup from 'yup'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resetState } from '../features/user/userSlice'

let schema = yup.object().shape({
    email:yup.string().nullable().required("Email Address is Required"),
    password:yup.string().required("Password is Required")
})


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isError,isSuccess} = useSelector(state=>state.user)

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:schema,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:(values)=>{
            dispatch(loginUser(values))            
            dispatch(resetState())
                if(isSuccess)
                {
                    navigate('/')
                }
        }
    })


  return (
    <>
        <Meta title={"Login"}/>  
        <BreadCrumb title="Login"/>
        <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
                        <div className="col-12">
                            <div className='login-card'>
                            <h3 className='text-center fs-2'>Login</h3>
                        <form action="" className='gap-15 d-flex flex-column' onSubmit={formik.handleSubmit}>

                            <CustomInput type="email" name='email' className='form-control' id='email' placeholder='Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}/>

                                 <div className='error'>
                                    {
                                        formik.touched.email && formik.errors.email
                                    }
                                </div>

                            <CustomInput type="password" name='password' className='form-control' placeholder='Password' value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")}/>

                                 <div className='error'>
                                    {
                                        formik.touched.password && formik.errors.password
                                    }
                                </div>

                            <div>
                                <Link to={"/forgot-password"} className='text-dark'>Forgot Password?</Link>
                                <div className='d-flex justify-content-center align-items-center gap-15'>
                                    <button className='button' type='submit'>Login</button>
                                    <Link className='button' to={"/signup"}>SignUp</Link>
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

export default Login