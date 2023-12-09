import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ReactStars from 'react-rating-stars-component';
import ProductCard from '../components/ProductCard';
import ReactImageZoom from 'react-image-zoom';
import { Link, useLocation } from 'react-router-dom';
import { Alert, Space } from 'antd';
import Color from '../components/Color';
import { BiGitCompare } from 'react-icons/bi';
import { BsFillBalloonHeartFill } from 'react-icons/bs';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, getSingleProduct } from '../features/products/productSlice';
import { addCompareItem, addToCart, getCart, getCompareItems, getWishlist } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import LoadingPage from '../components/Loading';

const SingleProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getProductId = location.pathname.split('/')[2];

  const { singleProduct } = useSelector((state) => state.product);
  const { wishlist, compareItemsList, userCart } = useSelector((state) => state.user);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [wish, setWish] = useState(wishlist);
  const [compareItems, setCompareItems] = useState(null);

  const [copied, setCopied] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);

  const handleWishlist = (getProductId) => {
    dispatch(addToWishlist(getProductId));
    setTimeout(() => {
      dispatch(getWishlist(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : ''));
    }, [300]);
  };

  const handleCompareList = (getProductId) => {
    dispatch(addCompareItem(getProductId));
    setTimeout(() => {
      dispatch(getCompareItems(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : ''));
    }, [300]);
  };

  const addProductToCart = (productId) => {
    dispatch(
      addToCart({
        productId: productId,
        color: color,
        orderedQuantity: quantity,
      })
    );
    setTimeout(() => {
      dispatch(getCart(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?._id : ''));
    }, 500);
  };

  useEffect(() => {
    setWish(wishlist);
    setCompareItems(compareItemsList);
  }, [wishlist, compareItemsList]);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getSingleProduct(getProductId));
    }
  }, [getProductId]);

  useEffect(() => {
    setCurrentProduct(singleProduct);
  }, [singleProduct]);

  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
    textField.remove();
  };

  return (
    <>
      <Meta title={'Product Name'} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper">
        <div className="row">
          <div className="col-md-6 mb-4 order-md-1 order-2">
            <div className="main-product-image">
              <div className="d-flex justify-content-center align-items-center">
                {/* <ReactImageZoom {...props} /> */}
                <img
                  src={
                    currentProduct !== undefined
                      ? Array.isArray(currentProduct?.images)
                        ? currentProduct?.images[0].url
                        : '../images/tab.jpg'
                      : '../images/tab.jpg'
                  }
                  className="img-fluid h-100"
                  alt=""
                />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-3 justify-content-center align-items-center">
              {currentProduct?.images &&
                currentProduct?.images.map((image, index) => (
                  <div key={index}>
                    <img src={image.url} className="img-fluid" style={{ objectFit: 'contain' }} alt="" />
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-6 order-md-2 order-1">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{currentProduct?.title}</h3>
              </div>
              <div className="border-bottom">
                <p className="price">&#8377; {currentProduct?.price}</p>
                <div className="d-flex align-items-center gap-2">
                  <ReactStars size={20} count={5} value={currentProduct?.totalrating ? currentProduct?.totalrating : 2} edit={false} />
                  <p className="mb-0">(2 Reviews)</p>
                </div>
                <a href="#" className="text-dark mb-3">
                  Write a Review
                </a>
              </div>
              <div className="border-bottom">
                <div className="d-flex gap-2 align-items-center">
                  <h3 className="product-heading">Brand:</h3>
                  <p className="product-data mb-0">{currentProduct?.brand}</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <h3 className="product-heading">Category:</h3>
                  <p className="product-data mb-0">{currentProduct?.category}</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <h3 className="product-heading">Tags:</h3>
                  <p className="product-data mb-0">{currentProduct?.tags}</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <h3 className="product-heading">Availability:</h3>
                  <p className="product-data mb-0">
                    {currentProduct?.quantity > 0 ? (
                      <p style={{ color: 'green' }} className="mb-0">
                        IN STOCK
                      </p>
                    ) : (
                      <p style={{ color: 'red' }} className="mb-0">
                        Out Of Stock
                      </p>
                    )}
                  </p>
                </div>
                <div className="d-flex gap-2 flex-column">
                  <h3 className="product-heading mt-3">Size:</h3>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge border border-1 bg-white text-dark border-info">S</span>
                    <span className="badge border border-1 bg-white text-dark border-info">M</span>
                    <span className="badge border border-1 bg-white text-dark border-info">XL</span>
                    <span className="badge border border-1 bg-white text-dark border-info">XXL</span>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3 mb-4 flex-row align-items-center">
                  <h3 className="product-heading mb-0">Color:</h3>
                  <Color setColor={setColor} className="" colorlist={currentProduct?.color} />
                </div>
                <div className="d-flex gap-2 flex-row align-items-center mt-3">
                  <h3 className="product-heading">Quantity:</h3>
                  <div className="d-flex">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      style={{ width: '60px', height: '30px' }}
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <button className="btn button" onClick={() => addProductToCart(currentProduct?._id)}>
                      Add To Cart
                    </button>
                    <button className="button">Buy Now</button>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center mt-3">
                  <div>
                    {Array.isArray(compareItems) && compareItems?.some((item) => item?._id?.includes(getProductId)) ? (
                      <button className="border-0 bg-transparent">
                        <BiGitCompare /> Added To Compare
                      </button>
                    ) : (
                      <button className="border-0 bg-transparent" onClick={() => handleCompareList(getProductId)}>
                        <BiGitCompare /> Add To Compare
                      </button>
                    )}
                  </div>
                  <div>
                    {Array.isArray(wish) && wish?.some((item) => item?._id?.includes(getProductId)) ? (
                      <button
                        className="border-0 bg-transparent"
                        onClick={() => handleWishlist(getProductId)}
                      >
                        <BsFillBalloonHeartFill className="fs-5" style={{ color: 'red' }} /> Remove From Wishlist
                      </button>
                    ) : (
                      <button className="border-0 bg-transparent" onClick={() => handleWishlist(getProductId)}>
                        <img src="../images/wish.svg" alt="" style={{ width: '30px' }} /> Add To WishList
                      </button>
                    )}
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center mt-3">
                  <h3 className="product-heading mb-0">Shipping & Returns </h3>
                  <p className="product-data mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit Corporis</p>
                </div>
                <div className="d-flex gap-2 align-items-center my-4">
                  <h3 className="product-heading mb-0 fs-6"> Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    className="text-dark"
                    onClick={() => copyToClipboard(window.location.href)}
                  >
                    Copy Product Link
                  </a>
                  {copied && (
                    <Space direction="vertical" style={{ width: '30%' }}>
                      <Alert message="Link Copied " type="success" showIcon />
                    </Space>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
