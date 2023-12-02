import React, { useEffect, useState } from 'react'
import {Link,NavLink, useNavigate} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getCart } from '../features/user/userSlice'
const Header = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
      };
    
      const closeNav = () => {
        setIsNavOpen(false);
      };


    const dispatch = useDispatch()
    const {userCart} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const [CartProducts,setCartProducts] = useState(userCart)


    const productState = useSelector(state=>state?.product?.productList)

    const [productOpt,setProductOpt] = useState([])

    // Typeahead
    const [paginate,setPaginate] = useState(null)

    useEffect(()=>{
        setCartProducts(userCart)
    },[userCart])

    const cartButton = ()=>{
        navigate('/cart')
        window.location.reload()
    }

    let CartCount = 0;
    let CartTotal = 0;

    if(Array.isArray(CartProducts))
      CartCount = Object.keys(userCart).length

    if(Array.isArray(CartProducts))
    {
        CartProducts?.forEach(element=>{
            CartTotal += element?.productId?.price * element?.orderedQuantity;
        })
    }

    const handleLogOut = ()=>{
        localStorage.removeItem('user')
        window.location.reload()
    }

    useEffect(()=>{
        if(productState !==undefined)
        {
        let data = []
        for (let index = 0; index < productState.length; index++) {
            const element = productState[index];
            data.push({
                id:index,
                prodId:element?._id,
                name:element?.title
            })
        }
        setProductOpt(data)
    }
    },[productState])   

    useEffect(()=>{
        dispatch(getCart(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))?._id:""))
    },[])
  return (
    <>
    <header className="header-top-strip py-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-6">
                    <p className='text-white mb-0'>Save Upto 40% On Each Item On Sale</p>
                </div>
                <div className="col-6">
                    <p className='text-end text-white mb-0'>Customer Support: <a className='text-white' href="(+91-08644-9839022)">(+91-08644-9839022)</a> </p>
                </div>
            </div>
        </div>
    </header>

    <header className="header-upper py-3">
    <div className="container-xxl">
        <div className="row align-items-center">
            <div className="col-md-2 col-12 order-md-1 order-2 mb-3 mb-md-0 d-flex justify-content-center">
                <h1>
                    <Link className='text-white'>AppC</Link>
                </h1>
            </div>
            
            <div className="col-md-4 col-12 order-md-2 order-1 mb-3 mb-md-0 d-flex justify-content-center ">
                <div className="input-group ">
                    {productOpt && (
                        <Typeahead
                            id='pagination-example'
                            onPaginate={() => console.log(`Results Hee`)}
                            options={productOpt}
                            paginate={paginate}
                            labelKey={"name"}
                            minLength={2}
                            onChange={(selected) => {
                                navigate(`/product/${selected[0]?.prodId}`)
                            }}
                            placeholder='Search AppC.in'
                        />
                    )}
                    <span className="input-group-text p-3" id="basic-addon2">
                        <BsSearch className='fs-6'/>
                    </span>
                </div>
            </div>
            <div className='col-md-6 col-12 order-md-3 order-3 d-flex flex-column justify-content-center align-items-center'>
                <div className='header-upper-links d-flex flex-column flex-md-row align-items-center justify-content-md-end'>
                    <Link className='d-flex align-items-center gap-10 mx-3 text-white mb-2 mb-md-0' to={"compare-product"}>
                        <img src='../images/compare.svg' alt='compare'/>
                        <p className='mb-0'>Compare Products</p>
                    </Link>
                    <Link className='d-flex align-items-center gap-10 text-white mb-2 mb-md-0' to={"wishlist"}>
                        <img src="../images/wishlist.svg" alt='wishlist'/>
                        <p className='mb-0'>Favorite Wishlist</p>
                    </Link>
                    <Link className='d-flex align-items-center gap-10 text-white mb-2 mb-md-0' to={"login"}>
                        <img src="/images/user.svg" alt="user" />
                        <p className='mb-0'>Welcome,&nbsp;
                            {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.firstname : "Login"}
                        </p>
                    </Link>
                    <button className='d-flex align-items-center gap-10 btn text-white mb-2 mb-md-0' onClick={cartButton}>
                        <img src="/images/cart.svg" alt="cart" />
                        <div className="d-flex flex-column">
                            <span className='badge bg-white text-dark'>{CartCount}</span>
                            <p className='mb-0'>&#8377; {CartTotal} </p>
                        </div>
                    </button>
                </div>
            </div>


        </div>
    </div>
</header>

<header className='header-bottom'>
    <div className="container-xxl">
        <div className="row">
            <div className="col-12">
                <div className="menu-bottom d-flex align-items-center justify-content-around flex-column flex-md-row gap-30">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Show Categories
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
                            <li className="w-100"><Link className="dropdown-item text-white w-100" to="#">Action</Link></li>
                            <li className="w-100"><Link className="dropdown-item text-white w-100" to="#">Another action</Link></li>
                            <li className="w-100"><Link className="dropdown-item text-white w-100" to="#">Something else here</Link></li>
                        </ul>
                    </div>
                    <div className='menu-links'>
                        <div className="d-flex flex-column flex-md-row align-items-center gap-15">
                            <NavLink className="text-white fs-6 mb-2 mb-md-0" to="/">Home</NavLink>
                            <NavLink className="text-white fs-6 mb-2 mb-md-0" to="/store">Our Store</NavLink>
                            <NavLink className="text-white fs-6 mb-2 mb-md-0" to="/blogs">Blogs</NavLink>
                            <NavLink className="text-white fs-6 mb-2 mb-md-0" to="/contact">Contact</NavLink>
                            {
                                localStorage.getItem('user') && <button className="bg-transparent border-0 text-white fs-5" onClick={handleLogOut}>LogOut</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>


    </>
  )
}

export default Header