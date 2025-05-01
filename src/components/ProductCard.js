import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AiTwotoneHeart } from "react-icons/ai";
import { message } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { addToWishlist } from "../features/products/productSlice";
import { addCompareItem,getCompareItems,getWishlist,reset} from "../features/user/userSlice";
import LoadingPage from "./Loading";
const ProductCard = React.memo((props) => {
  const dispatch = useDispatch();
  let location = useLocation();
  
  const { grid, datalist } = props;
  
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?._id
    : "null";

  const [wish, setWish] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(getWishlist(user))
    .then((response)=>{
      setWish(response?.payload);
    })
  }, []);

  const handleWishlist = (productId) => {
    messageApi?.open({
      key : 'updatable',
      type : 'loading',
      content: 'Loading...'
    })
    dispatch(addToWishlist(productId))
    .then((response)=>{
      const status = response?.payload?.status
      dispatch(getWishlist(user)) // no need of two api's here check after
      .then((response)=>{
        setWish(response?.payload);
        messageApi?.open({
          key : 'updatable',
          type : 'success',
          content: status
        })
      })
    })

  };

  const handleCompare = (productId) => {
    const key = 'updatable';
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    dispatch(addCompareItem(productId))
    .then((response)=>{
      const status = response?.payload['status']
      if(status === 200){
        messageApi?.open({
          key,
          type: 'success',
          content: 'Added To Compare List',
          duration : 3,
        })
      }
      else if(status === 403){
        messageApi?.open({
          key,
          type: 'success',
          content: 'Removed From Compare List',
          duration : 3,
        })
      }
    })
  };
  
  const smoothScroll = () => {
    window.scrollTo({
      top: "0",
      behavior: "smooth",
    });
  };
  // alert(grid)

  return (
    <>
    {contextHolder}
      {Array.isArray(datalist) ? (
        datalist?.map((element, i) => {
          return (
            <div
              className={` ${
                location.pathname === "/store"
                  ? `gr-${grid}`
                  : "col-12 col-sm-6 col-md-4 col-lg-3"
              } `}
              key={i}
            >
              <div
                className="position-relative product-card"
                onClick={
                  location.pathname.startsWith("/product") ? smoothScroll : null
                }
                style={{ minHeight: "350px", maxHeight: "350px",width:'289px' }}
              >
                <div className="wishlist-icon position-absolute">
                  {Array.isArray(wish) &&
                  wish?.some((item) => item?._id?.includes(element?._id)) ? (  // worst case of doing like this
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => handleWishlist(element?._id)}
                    >
                      <AiTwotoneHeart
                        className="fs-3"
                        style={{ color: "red" }}
                      />
                    </button>
                  ) : (
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => handleWishlist(element?._id)}
                    >
                      <img
                        src="../images/wish.svg"
                        alt=""
                        style={{ width: "30px" }}
                      />{" "}
                    </button>
                  )}
                </div>
                <Link className="" to={`/product/${element?._id}`}>
                  <div className="product-image d-flex align-items-center justify-content-center w-100">
                    <img
                      src={element?.images[0]?.url}
                      className=""
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "contain",
                      }}
                      alt=""
                    />
                    <img
                      src={element?.images[1]?.url}
                      className=""
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "contain",
                      }}
                      alt=""
                    />
                  </div>
                  <div className={`product-details`}>
                    <h6 className="brand">{element?.brand}</h6>
                    <h5 className="product-title">
                      <p className="fs-6">
                        {grid === 12
                          ? element?.title
                          : element?.title.substr(0, 35) + "....."}
                      </p>
                    </h5>
                    <ReactStars
                      count={5}
                      size={20}
                      value={parseInt(element?.totalrating)}
                      edit={false}
                    /> 
                    {/* when  */}
                    <p className="price">&#8377;{element?.price}</p>
                    <p
                      className={`description ${
                        grid === 12 ? "d-block" : "d-none"
                      }`}
                      dangerouslySetInnerHTML={{ __html: element?.description }}
                    ></p>
                  </div>
                </Link>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <Link to={`/product/${element?._id}`}>
                      <button className="border-0 bg-transparent">
                        <img src="../images/view.svg" alt="view" />
                      </button>
                    </Link>
                    <button className="border-0 bg-transparent">
                      <img
                        src="../images/prodcompare.svg"
                        alt=""
                        onClick={() => handleCompare(element?._id)}
                      />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src="../images/add-cart.svg" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <LoadingPage height={"40vh"} />
      )}
    </>
  );
});

export default ProductCard;
