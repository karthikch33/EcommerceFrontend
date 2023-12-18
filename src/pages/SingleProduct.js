import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ReactStars from 'react-rating-stars-component';
import ProductCard from '../components/ProductCard';
import ReactImageZoom from 'react-image-zoom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Space } from 'antd';
import Color from '../components/Color';
import { BiGitCompare } from 'react-icons/bi';
import { BsFillBalloonHeartFill } from 'react-icons/bs';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, getProducts, getSingleProduct } from '../features/products/productSlice';
import { addCompareItem, addToCart, getCart, getCompareItems, getWishlist } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import LoadingPage from '../components/Loading';

const SingleProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getProductId = location.pathname.split('/')[2];

  const { singleProduct,productList } = useSelector((state) => state.product);
  const { wishlist, compareItemsList, userCart } = useSelector((state) => state.user);

  const navigate = useNavigate()

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

  const [tag,setTag] = useState(null)
  const [category,setCategory] = useState(null)
  // const {productList} = useSelector(state=>state?.product)

const getAllProducts = ()=>{
    dispatch(getProducts({category}))
}

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
    setCategory(singleProduct?.category)
    setTag(singleProduct?.tag)
  }, [singleProduct]);

  useEffect(()=>{
    getAllProducts()
  },[currentProduct])

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

  const buyNowThisItem = (productId)=>{
      navigate(`/checkout/${productId}`)
  }

  const smoothScroll = () => {
      const smoothScrollTo = document.querySelector('.review-form');
      smoothScrollTo.scrollIntoView({ behavior: 'smooth' });
    };

   const [currentImage,setCurrentImage] = useState(0)


  return (
    <>
      <Meta title={'Product Name'} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper">
        <div className="row">
          <div className="col-md-6 mb-4 order-md-1 order-2 d-none d-md-flex flex-column">
            <div className="main-product-image">
              <div className="d-flex justify-content-center align-items-center" style={{maxHeight:"500px",minHeight:"500px"}}>
                <img
                  src={
                    currentProduct !== undefined
                      ? Array.isArray(currentProduct?.images)
                        ? currentProduct?.images[currentImage].url
                        : '../images/tab.jpg'
                      : '../images/tab.jpg'
                  }
                  className="img-fluid"
                  style={{maxHeight:"400px",minHeight:"400px"}}
                  alt=""
                />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-3 justify-content-center align-items-center">
              {currentProduct?.images &&
                currentProduct?.images.map((image, index) => (
                  <div key={index} >
                    <img src={image.url} className="img-fluid" onClick={()=>setCurrentImage(index)} style={{ objectFit: 'contain' }} alt="" />
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
                <label className="text-dark mb-3 writeareview"onClick={smoothScroll} style={{cursor:"pointer"}}>
                  Write a Review
                </label>
              </div>
            <div className='d-flex gap-3 d-lg-none scroll d-md-none' style={{ maxHeight:"500px",minHeight:"500px", overflowX: 'scroll' }}>
              {currentProduct?.images &&
                currentProduct?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    className="img-fluid"
                    style={{ objectFit: 'contain', marginRight: '10px' }}  // Add margin to create space between images
                    alt=""
                  />
                ))}
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
                <div className="d-none gap-2 flex-column">
                  <h3 className="product-heading mt-3">Size:</h3>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge border border-1 bg-white text-dark border-info">S</span>
                    <span className="badge border border-1 bg-white text-dark border-info">M</span>
                    <span className="badge border border-1 bg-white text-dark border-info">XL</span>
                    <span className="badge border border-1 bg-white text-dark border-info">XXL</span>
                  </div>
                </div>
                <div className="d-none gap-2 mt-3 mb-4 flex-row align-items-center">
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
                    <button className="button" onClick={()=>buyNowThisItem(currentProduct?._id)}>Buy Now</button>
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
                  <p className="product-data mb-0"> "Shipping and returns: Where convenience meets confidence. Your satisfaction, delivered."</p>
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
                <div className="col-12 scroll" style={{maxHeight:"500px",overflow:"scroll"}}>
                <h4 className="fs-2 ps-4 pt-2">Description</h4>
                <p className="bg-white p-3" dangerouslySetInnerHTML={{ __html: currentProduct?.description }}></p>
            </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
                <div className="col-12">
                <section className="reviews-wrapper home-wrapper-2 scroll"  style={{maxHeight:"500px",overflow:"scroll"}}>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="review-head mt-4 d-flex justify-content-between align-items-end">
                                <div>
                                    <h5>Customer Reviews</h5>
                                    <div className="d-flex gap-10 align-items-center">
                                    <ReactStars
                                    size={20}
                                    count={5}
                                    value={4}
                                    edit={false}
                                    />
                                    <p className='mb-0'>Based On 2 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="review-form">
                            <h4>Write Your Review</h4>
                        <form action="" className='gap-15 d-flex flex-column'>
                            <div className="form-floating gap-15 ">
                                <textarea name="" id="" cols="30" rows="10" className='w-100 form-control' placeholder='Comments'></textarea>
                                <label htmlFor="name" className='form-label'>Comments</label>
                            </div>
                            <div className='d-flex justify-content-end'>
                            <button type='submit' className='button'>Submit Review</button>
                            </div>
                        </form>
                        </div>

                        <div className="reviews">
                            <div className="review mt-4">
                                <div className="d-flex align-items-center gap-10">
                                    <h6 className='mb-0 '>Karthik</h6>
                            <ReactStars
                                    size={20}
                                    count={5}
                                    value={4}
                                    edit={false}
                                    />
                                </div>
                            <p className='mt-3 mb-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto enim temporibus iure. Atque nobis itaque, placeat molestiae temporibus laudantium quod laborum exercitationem est eveniet. Iure itaque voluptatem esse cum numquam.</p>
                            </div>
                            <div className="review mt-4">
                                <div className="d-flex align-items-center gap-10">
                                    <h6 className='mb-0 '>Yogendra</h6>
                            <ReactStars
                                    size={20}
                                    count={5}
                                    value={4}
                                    edit={false}
                                    />
                                </div>
                            <p className='mt-3 mb-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto enim temporibus iure. Atque nobis itaque, placeat molestiae temporibus laudantium quod laborum exercitationem est eveniet. Iure itaque voluptatem esse cum numquam.</p>
                            </div>
                            <div className="review mt-4">
                                <div className="d-flex align-items-center gap-10">
                                    <h6 className='mb-0 '>Aditya</h6>
                            <ReactStars
                                    size={20}
                                    count={5}
                                    value={4}
                                    edit={false}
                                    />
                                </div>
                            <p className='mt-3 mb-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto enim temporibus iure. Atque nobis itaque, placeat molestiae temporibus laudantium quod laborum exercitationem est eveniet. Iure itaque voluptatem esse cum numquam.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                </div>
          </div>
                <h3 className='section-heading mt-4'>Similar Products</h3>
          <div className="row mt-4 scroll"  style={{overflowX:'scroll',maxWidth:"90vw",maxHeight:"500px"}}>
              <div className="col-12 d-flex">
              <ProductCard datalist={productList} hover={false}/>
              </div>
            </div>
      </Container>
    </>
  );
};

export default SingleProduct;
