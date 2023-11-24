import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { FaPencil } from "react-icons/fa6"
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Space } from 'antd'
import { getUser, updateUser } from '../features/user/userSlice'
import { toast } from 'react-toastify'

const Profile = () => {

    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)

    const [currentUser,setCurrentUser] = useState(user)
    const [oneTime,setOneTime] = useState(true)
    const [updateNow,setupdateNow] = useState(false)

    useEffect(()=>{
        setCurrentUser(user)
    },[user])

    console.log(currentUser);

    const emptyFunction = ()=>{
        if(oneTime)
        {
        toast.info("Trying To Update Click On Pencil Button To Update")
        setOneTime(false)
        setTimeout(()=>{
            setOneTime(true)
        },7000)
        }
    }

 
    const formik = useFormik({
        initialValues:{
            firstname:currentUser?.firstname,
            lastname:currentUser?.lastname,
            email:currentUser?.email,
            mobile:currentUser?.mobile,
        },
        onSubmit:(values)=>{
            if(updateNow)
            {
                console.log(localStorage.getItem('user'));
                dispatch(updateUser(values))
                setTimeout(()=>{
                   dispatch(getUser())
                },2000)
            }
        }   
    })

  return (
    <>
        <BreadCrumb title={'Profile'}/>
        <div className='text-center'>
        {updateNow && <>
        <Space direction="vertical" style={{ width: '50%' }} className='text-center'>
        <Alert
      message="Update Now"
      type="warning"
      closable
        />
        </Space>
        </>}

        </div>
        <Container classNam='container-xxl'>
            <div className="row">
                <div className="col-12">
                    <h3 className='fs-1 mb-5 text-center'>User Profile <FaPencil style={{cursor:'pointer'}} className='mx-2 mb-2 fs-3' onClick={()=>setupdateNow(true)}/></h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <CustomInput type="text" placeholder="FirstName" name="firstname" value={formik.values.firstname} onChange={updateNow===true ? formik.handleChange('firstname'):emptyFunction} />
                    </div>



                    <div className="mb-3">
                    <CustomInput type="text" placeholder="LastName" name="lastname" value={formik.values.lastname} onChange={updateNow===true ? formik.handleChange('lastname'):emptyFunction} onBlur={formik.handleBlur('lastname')}/>
                    </div>

                    <div className="mb-3">
                    <CustomInput type="email" placeholder="Email" name="email" value={formik.values.email} onChange={updateNow===true ? formik.handleChange('email'):emptyFunction} disabled={true}/>
                    </div>

                    <div>
                    <CustomInput type="number" placeholder="Mobile" name="mobile" value={formik.values.mobile} onChange={updateNow===true ? formik.handleChange('mobile'):emptyFunction} onBlur={formik.handleBlur('mobile')}/>
                    </div>  
                    
                 <button type="submit" className="btn btn-primary my-3">{updateNow === true ? "Update" : "Profile Check"}</button>
            </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Profile