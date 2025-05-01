import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getCart } from "../features/user/userSlice";
import Timer from "./Timer";
import { message } from "antd";
  const SpecialProduct = (props) => {
  const dispatch = useDispatch()
  const [color, setColor] = useState(null);
  const [status ,setStatus] = useState(false);
  const { title, price, brand, image, rating, quantity, sold , id, alreadyAdded} = props;

  useEffect(()=>{
    // alert(alreadyAdded)
    setStatus(alreadyAdded)
  },[alreadyAdded])

  const addProductToCart = (productId) => {
    const cartData = {
      productId: productId,
      color: color,
      orderedQuantity: 1,
    }
    dispatch(addToCart(cartData))
    .then((response)=>{
      const Cart_message = response?.payload?.message;
      message.success(Cart_message)
      dispatch(getCart(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?._id : ''))
      setStatus(true);
    })
  };
  
  return (
    <Col xs={12} sm={6} md={6} lg={4}>
    <div className="special-product-card p-4" > {alreadyAdded}
      <div className="d-flex flex-column flex-md-row justify-content-around">
        <Link to={`/product/${id}`}>
        <div className="mb-3 mb-md-0">
          <img src={image} className="img-fluid" alt={title} style={{marginTop:"-10px"}}/>
          <Link
            className="mt-3"
            style={{ backgroundColor : "#232f3e",padding : "2px", transformStyle: "1",color:"white",borderRadius:"5px" }}
            onClick={() => addProductToCart(id)}
          >
            {!status ? 'Add To Cart' : 'Add To Inc'}
          </Link>
        </div>
        </Link>
        <div className="special-product-content ml-md-4 ms-5">
          <h5 className="brand">{brand}</h5>
          <h6 className="title">{title.length < 25 ? title : title.substr(0, 25) + "...."}</h6>
          <ReactStars size={24} count={5} edit={false} value={rating} />
          <p className="price">
            <span className="red-p">&#8377; {price - 2000}</span>&nbsp;
            <strike>&#8377; {price}</strike>
          </p>
         <Timer/>
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
        </div>
      </div>
    </div>
  </Col>
  );
};

export default SpecialProduct;
