import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AiTwotoneHeart } from "react-icons/ai";
import { message } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { addToWishlist } from "../features/products/productSlice";
import {
  addCompareItem,
  getCompareItems,
  getWishlist,
  reset,
} from "../features/user/userSlice";
import LoadingPage from "./Loading";
const ProductCard = React.memo((props) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const { grid, datalist } = props;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))._id
    : "null";

  const { wishlist } = useSelector((state) => state.user, shallowEqual);
  const { alreadyExist } = useSelector((state) => state.user);

  const [wish, setWish] = useState(wishlist);
  const [duplicateSuccess, setDuplicateSuccess] = useState(true);

  useEffect(() => {
    dispatch(getWishlist(user));
    dispatch(getCompareItems(user));
  }, []);

  useEffect(() => {
    setWish(wishlist);
  }, [wishlist, dispatch]);

  const handleWishlist = (productId) => {
    dispatch(addToWishlist(productId));
    setTimeout(() => {
      dispatch(getWishlist(user));
    }, 300);
  };

  const handleCompare = (productId) => {
    dispatch(addCompareItem(productId));
  };

  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const key2 = 'updatable2';

  useEffect(() => {
    if (alreadyExist === true && duplicateSuccess) {
      setDuplicateSuccess(false);
      messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });
      setTimeout(() => {
        messageApi.open({
          key,
          type: 'success',
          content: 'Added Successfully!',
          duration: 2,
        });
        setDuplicateSuccess(false);
          dispatch(reset());
      }, 1000);

    } else if (alreadyExist === true && duplicateSuccess) {
      setDuplicateSuccess(false);
      messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });
      setTimeout(() => {
        messageApi.open({
          key2,
          type: 'success',
          content: 'Already This Item Exists In Compare List',
          duration: 2,
        });
        setDuplicateSuccess(true);
          dispatch(reset());
      }, 1000);
    }
  }, [alreadyExist, dispatch, duplicateSuccess]);

  const smoothScroll = () => {
    window.scrollTo({
      top: "0",
      behavior: "smooth",
    });
  };

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
                style={{ minHeight: "400px", maxHeight: "400px" }}
              >
                <div className="wishlist-icon position-absolute">
                  {Array.isArray(wish) &&
                  wish?.some((item) => item?._id?.includes(element?._id)) ? (
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
                  <div className="product-details">
                    <h6 className="brand">{element?.brand}</h6>
                    <h5 className="product-title">
                      <p>
                        {grid === 12
                          ? element?.title
                          : element?.title.substr(0, 100) + "....."}
                      </p>
                    </h5>
                    <ReactStars
                      count={5}
                      size={20}
                      value={parseInt(element?.totalrating)}
                      edit={false}
                    />

                    <p
                      className={`description ${
                        grid === 12 ? "d-block" : "d-none"
                      }`}
                      dangerouslySetInnerHTML={{ __html: element?.description }}
                    ></p>
                    <p className="price">&#8377;{element?.price}</p>
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
