import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import {BiArrowBack} from 'react-icons/bi'
import Container from '../components/Container'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getABlog } from '../features/blogs/blogSlice'
import LoadingPage from '../components/Loading'; 

const SingleBlog = () => {

    const location = useLocation()
    const getBlogId = location.pathname.split('/')[2]

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {FetchedBlog} = useSelector(state=>state.blogs)
    const [blog,setBlog] = useState(null)

    useEffect(()=>{
        if(getBlogId !==undefined)
        {
            dispatch(getABlog(getBlogId))
        }
    },[getBlogId])

    useEffect(()=>{
        setBlog(FetchedBlog)
    },[FetchedBlog])


    return (
        blog === null ? (
          <LoadingPage height={"90vh"}/>
        ) : (
          <>
            <Meta title={blog?.title} />
            <BreadCrumb title="SingleBlog Dynamic" />
            <Container class1="blog-wrapper home-wrapper-2 py-5">
              <div className="row">
                <div className="col-12">
                  <div className="single-blog-card">
                    <Link to={"/blogs"} className='text-dark mb-3'><BiArrowBack/> &nbsp;Go Back</Link>
                    {typeof blog === 'object' && blog !== null && (
                      <>
                        <h3 className='title'>{blog?.title}</h3>
                        <img src={blog?.images[0]?.url} alt="blog" className='w-100' />
                        <p dangerouslySetInnerHTML={{ __html: blog?.description }}></p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </>
        )
      );
      }

export default SingleBlog