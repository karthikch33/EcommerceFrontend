import React, { useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link, useLocation } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../features/user/userSlice'
import { Alert, Space } from 'antd'


let schema = yup.object().shape({
    password:yup.string().required("Enter Your New Password"),
    confirmpassword:yup.string().required("Confirm Your Password")
})


const ResetPassword = () => {
    const location = useLocation()
    const getToken = location.pathname.split('/')[2]
    const dispatch = useDispatch()
    const [passwordToggle,setPasswordToggle] = useState(false)

    const formik = useFormik({
        initialValues:{
            password:"",
            confirmpassword:""
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            handlePasswordsMatch()
            if(getToken !== undefined && formik.values.password === formik.values.confirmpassword)
            {
                dispatch(resetPassword({
                    token:getToken,
                    password:formik.values.password
                }))
            }
        }
    })

    const handlePasswordsMatch = ()=>{
        if(formik.values.confirmpassword !== formik.values.password)
        {
                setPasswordToggle(true)
                setTimeout(()=>{
                    setPasswordToggle(false)
                },3000)
        }
    }

  return (
    <>
    <Meta title={"Reset Password"}/>  
    <BreadCrumb title="Reset Password"/>
    <Container class1='login-wrapper py-5 home-wrapper-2'>
        {passwordToggle &&<> <Space direction="vertical" className='w-100 text-center fs-2' style={{ width: '30%' }}>
                            <Alert className='fs-4' message="Passwords Mismatch" type="error" showIcon /></Space></>
                            }
                    <div className="row">
                        <div className="col-12">
                            <div className='login-card'>
                            <h3 className='text-center fs-2'>Reset Password</h3>
                        <form onSubmit={formik.handleSubmit} className='gap-15 d-flex flex-column'>

                            <CustomInput type="password" name='password' className='form-control' id='password' placeholder='Password' onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password')} value={formik.values.password}/>

                            <div className="error">
                                {formik.touched.password && formik.errors.password}
                            </div>

                            <CustomInput type="password" name='confirmpassword' className='form-control' placeholder='Confirm password' onChange={formik.handleChange('confirmpassword')} onBlur={formik.handleBlur('confirmpassword')} value={formik.values.confirmpassword}/>

                            <div className="error">
                                {formik.touched.confirmpassword && formik.errors.confirmpassword}
                            </div>

                            <div>
                                <div className='d-flex justify-content-center align-items-center gap-15'>
                                    <button className='button' type='submit'>Submit</button>
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

export default ResetPassword