import React from 'react'
import Meta from '../components/Meta'
import * as yup from 'yup'
import { useFormik } from 'formik'
import BreadCrumb from '../components/BreadCrumb'
import {AiTwotoneHome,AiTwotoneMail} from 'react-icons/ai'
import {BsFillPhoneFill,BsFillInfoCircleFill} from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { createEnquiry } from '../features/contact/contactSlice'
const Contact = () => {


  let schema = yup.object().shape({
    name:yup.string().required('Name is Required'),
    email:yup.string().required('Email is Required'),
    mobile:yup.string().required('Mobile is Required'),
    comment:yup.string().required('Comment Here Please')
  })

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      mobile:"",
      comment:"",
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      dispatch(createEnquiry(values))
      formik.resetForm()
    }
  })


  return (
    <>
    <Meta title="Contact"/>
    <BreadCrumb title="Contact"/>
    <div className="contact-wrapper py-5 home-wrapper-2">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15614.732188623238!2d80.62683921325167!3d16.292029442143093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a07d01b5212f5%3A0xe2f08018699a23fc!2sNandivelugu%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1696244921094!5m2!1sen!2sin" width="400" height="300" style={{border:0}} allowfullscreen="" loading="lazy" title="dsfds" className=" w-100 map" referrerpolicy="no-referrer-when-downgrade"/>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-around">
              <div>
                <h3 className="contact-title">Contact</h3>
                <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                  <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Name" value={formik.values.name} onChange={formik.handleChange('name')} name='name' onBlur={formik.handleBlur('name')}/>
                    <label htmlFor="">Name</label>
                  </div>
                    <div className="error">
                      {
                        formik.touched.name && formik.errors.name
                      }
                    </div>
                  <div className="form-floating">
                    <input type="email" className="form-control" placeholder="Email" name='email' value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')}/>
                    <label htmlFor="">Email</label>
                  </div>
                  <div className="error">
                      {
                        formik.touched.email && formik.errors.email
                      }
                    </div>
                  <div className="form-floating">
                    <input type="tel" className="form-control" placeholder="Number" name='mobile' value={formik.values.mobile} onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')}/>
                    <label htmlFor="">Number</label>
                  </div>
                  <div className="error">
                      {
                        formik.touched.mobile && formik.errors.mobile
                      }
                    </div>
                  <div className="form-floating">
                    <textarea name="comment" id="" cols="30" rows="4" placeholder="Comments" className="w-100 form-control" value={formik.values.comment} onChange={formik.handleChange('comment')} onBlur={formik.handleBlur('comment')}></textarea>
                    <label htmlFor="">Comments</label>
                  </div>
                  <div className="error">
                      {
                        formik.touched.comment && formik.errors.comment
                      }
                    </div>
                  <button className="button" style={{borderRadius:"0px"}}>Submit</button>
                </form>
              </div>
              <div>
                <h3 className="contact-title">Get In Touch With Us</h3>
                <div>
                  <ul className="ps-0">
                      <li className="mt-4 d-flex gap-5 "><AiTwotoneHome className="fs-4"/>
                      <address>D-NO: 6-52 Nandivelugu MainRoad, Tenali Mandal</address></li>
                      <li className="mb-3 d-flex gap-5"><BsFillPhoneFill className="fs-4"/> <a href="tel:+91 99384322823" className="text-dark">+91 99384322823</a></li>
                      <li className="mb-3 d-flex gap-5 text-dark"><AiTwotoneMail className="fs-4"/>
                      <a href="mailto:saipavan39dh@gmail.com" className="text-dark">saipavan39dh@gmail.com</a></li>
                      <li className="mb-3 d-flex gap-5"><BsFillInfoCircleFill className="fs-4"/>Always Available For Help</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Contact