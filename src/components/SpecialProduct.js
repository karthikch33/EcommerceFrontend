import React from "react";
import { Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, price, brand, image, rating, quantity, sold } = props;
  return (
    <Col xs={12} sm={6} md={6} lg={4}>
    <div className="special-product-card p-4" >
      <div className="d-flex flex-column flex-md-row justify-content-around">
        <div className="mb-3 mb-md-0 d-flex justify-content-center">
          <img src={image} className="img-fluid" alt={title} />
        </div>
        <div className="special-product-content ml-md-4 ms-5">
          <h5 className="brand">{brand}</h5>
          <h6 className="title">{title.length < 25 ? title : title.substr(0, 25) + "...."}</h6>
          <ReactStars size={24} count={5} edit={false} value={rating} />
          <p className="price">
            <span className="red-p">&#8377; {price - 2000}</span>&nbsp;
            <strike>&#8377; {price}</strike>
          </p>
          <div className="discount-till d-flex align-items-center  gap-10">
            <p className="mb-0">
              <b>5 days</b>
            </p>
            <div className="d-flex gap-10 align-items-center">
              <span className="badge rounded-circle p-3  bg-danger" style={{ padding: '2vw' }}>1</span>:
              <span className="badge rounded-circle p-3 bg-danger" style={{ padding: '2vw' }}>2</span>:
              <span className="badge rounded-circle p-3 bg-danger" style={{ padding: '2vw' }}>3</span>
            </div>
          </div>
          <div className="prod-count mt-3">
            <p className="mb-0">In Stock: {quantity - sold}</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: (quantity / (quantity + sold)) * 100 + '%' }}
                aria-valuenow={(quantity / (quantity + sold)) * 100}
                aria-valuemin={quantity}
                aria-valuemax={quantity + sold}
              ></div>
            </div>
          </div>
          <Link
            className="button mt-3"
            style={{ height: "50px", padding: "10px", transformStyle: "1" }}
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  </Col>
  );
};

export default SpecialProduct;
