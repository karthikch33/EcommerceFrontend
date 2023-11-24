import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BlogCard = (props) => {
  const location = useLocation()
  const {title,date,descrpition,id,image} = props
  return (
    <div className={`${location.pathname === '/blogs' ? "col-5": "col-3"}`}>
        <div className="blog-card width">
            <div className={`${location.pathname ==="/blogs" ? "width card-image" :"card-image"}`}>
                <img src={image} className={`${location.pathname ==="/blogs" ? "width img-fluid" :"img-fluid"}`}  alt="" />
            </div>
            <div className="blog-content">
                <p className='date'>{date}</p>
                <h5 className='title'>{title}</h5>
                <p className='description' dangerouslySetInnerHTML={{__html:descrpition?.substr(0,100)+"...."}}></p>
                <Link className='button' to={`/blog/${id}`}>ReadMore</Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCard