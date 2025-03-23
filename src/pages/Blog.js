import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import BlogCard from '../components/BlogCard'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllBlogs } from '../features/blogs/blogSlice'
import moment from 'moment'

const Blog = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {FetchedBlogs} = useSelector(state=>state.blogs)

    const [Blogs,setBlogs] = useState([])


    useEffect(()=>{
        dispatch(getAllBlogs())
    },[])

    useEffect(()=>{
        setBlogs(FetchedBlogs)
    },[FetchedBlogs])

  return (
    <>
         <Meta title={"Blogs"}/>
        <BreadCrumb title="Blogs"/>
        <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
                    <div className="col-3">
                    <div className='filter-card'>
                            <h3 className='filter-title'>
                                Shop By Categories
                            </h3>
                            <div>
                                <ul>
                                    <li>Watch</li>
                                    <li>Tv</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="d-flex flex-wrap gap-5">
                            {
                                Array.isArray(FetchedBlogs) && FetchedBlogs.map((element,i)=>
                                    {
                                    return <BlogCard title={element?.title} descrpition={element?.description} category={element?.category} id={element?._id} image ={element?.images[0]?.url}  date={moment(element?.createdAt).format("MMMM Do YYYY, h:mm a")} key={i}/>
                                })
                            }
                        </div>
                    </div>
                </div>
        </Container> 
    </>
  )
}

export default Blog