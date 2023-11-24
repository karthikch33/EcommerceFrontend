import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import * as yup from 'yup'
import CustomInput from '../components/CustomInput'
import { forgotpasswordToken } from '../features/user/userSlice'
const ForgotPassword = () => {

    const dispatch = useDispatch()

    let schema = yup.object().shape({
        "email":yup.string().required("Email Required To Search")
    })

    const formik = useFormik({
        initialValues:{
            email:""
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            console.log(values);
            dispatch(forgotpasswordToken(values))
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
                            <h3 className='text-center fs-2'>Reset Your Password</h3>
                            <p className='text-center'>Password Can Be Rest With Your Mail!</p>
                        <form onSubmit={formik.handleSubmit} className='gap-15 d-flex flex-column'>
                            <CustomInput type="email" name='email' className='form-control' id='email' placeholder='Email' onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} value={formik.values.email}/>

                            {
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            }

                            <div>
                                <Link to={"/forgot-password"} className='text-dark'>
                                </Link>
                                <div className='d-flex justify-content-center align-items-center gap-15 flex-column'>

                                    <button className='button' type='submit'>Submit</button>
                                    <Link to={"/login"} className='text-center text-dark'>cancel</Link>
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

export default ForgotPassword