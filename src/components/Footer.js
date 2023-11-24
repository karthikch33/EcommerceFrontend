import React from 'react'
import { Link } from 'react-router-dom'
import {BsSearch,BsLinkedin,BsYoutube,BsGithub,BsInstagram} from 'react-icons/bs'
const Footer = () => {
  return (
      <>
        <footer className='py-4'>
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="col-5">
                <div className="footer-top-data d-flex gap-30 align-items-center justify-content-center">
                  <img src="images/newsletter.png" alt="newsletter" />
                  <h2 className='mb-0 text-white'>Sign Up for NewsLetter</h2>
                </div>
              </div>
                <div className="col-7">
                <div className="input-group">
                    <input type="text" className="form-control py-2" placeholder="Sign Up Here" aria-label="Sign Up Here" aria-describedby="basic-addon2"/>
                    <span className='input-group-text p-1'>Subscribe</span>
                 </div>
                </div>
            </div>
          </div>
        </footer>
        <footer className='py-3'>
          <div className="container-xxl">
            <div className="row">
              <div className="col-4">
                <h4 className='text-white mb-4'>Contact Us</h4>
                <div>
                  <address  className='text-white fs-6'>
                    D:NO ~ 6-52 Near Nandi Sagar <br /> Nandivelugu MainRoad <br />
                    Tenali Mandal
                  </address>
                  <a href="tel:+91 7845269845" className='mt-4 text-white d-block mb-4'>+91 7845269845</a>

                  <a href="mailto:saipavan39dh@gmail.com" className='mt-4 text-white d-block mb-4'>saipavan39dh@gmail.com</a>
                  <div className='social_icons d-flex align-items-center gap-30'>
                    <a to="#" className='text-white  fs-4'> <BsLinkedin/></a>
                    <a to="#" className='text-white  fs-4'> <BsInstagram/></a>
                    <a to="" className='text-white  fs-4'> <BsYoutube/></a>
                    <a to="" className='text-white  fs-4'> <BsGithub/></a>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <h4 className='text-white mb-4'>Information</h4>
                <div className='d-flex flex-column footer-links'>
                  <Link className='text-white py-2 mb-1' to={"privacypolicy"}>Privacy Policy</Link>
                  <Link className='text-white py-2 mb-1' to={"refundpolicy"}>Refund Policy</Link>
                  <Link className='text-white py-2 mb-1' to={"shippingpolicy"}>Shipping Policy</Link>
                  <Link className='text-white py-2 mb-1' to={"termsandconditions"}>Terms & Conditions</Link>
                  <Link className='text-white py-2 mb-1'>Blogs</Link>
                </div>
              </div>
              <div className="col-3">
                <h4 className='text-white mb-4'>Account</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>About us</Link>
                  <Link className='text-white py-2 mb-1'>FAQ</Link>
                  <Link className='text-white py-2 mb-1'>Contact</Link>
                </div>
              </div>
              <div className="col-2">
                <h4 className='text-white mb-4'>Quick Links</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>Laptops</Link>
                  <Link className='text-white py-2 mb-1'>HeadPhones</Link>
                  <Link className='text-white py-2 mb-1'>Tablets</Link>
                  <Link className='text-white py-2 mb-1'>Watch</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <footer className='py-4'>
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <p className='text-center mb-0 text-white'>&copy; {new Date().getFullYear()} Powered By Appc</p>
              </div>
            </div>
          </div>
        </footer>
      </>
  )
}

export default Footer