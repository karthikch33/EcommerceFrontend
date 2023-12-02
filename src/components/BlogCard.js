import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BlogCard = (props) => {
  const location = useLocation()
  const {title,date,descrpition,id,image} = props
  return (
    <div className={`col-md-${location.pathname === '/blogs' ? '5' : '3'}`}>
  <div className="blog-card my-4">
    <div className={`card-image ${location.pathname === "/blogs" ? 'width' : 'w-100 d-flex justify-content-center'}`}>
      <img
        src={image}
        className={`img-fluid ${location.pathname === "/blogs" ? 'width' : 'w-100 d-flex justify-content-center'}`}
        alt=""
      />
    </div>
    <div className="blog-content">
      <p className="date">{date}</p>
      <h5 className="title">{title}</h5>
      <p className="description" dangerouslySetInnerHTML={{ __html: descrpition?.substr(0, 100) + "...." }}></p>
      <Link className="button" to={`/blog/${id}`}>
        Read More
      </Link>
    </div>
  </div>
</div>

  )
}

export default BlogCard