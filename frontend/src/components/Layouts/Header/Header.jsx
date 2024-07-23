import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Avatar from '@mui/material/Avatar';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import { getAllCategories } from '../../../actions/categoryAction';
import Slider from 'react-slick';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { getFeaturedProducts } from '../../../actions/productAction';
import { getDiscount } from '../../../utils/functions';
import { getWIshlistItems } from '../../../actions/wishlistAction';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading: categoriesLoading } = useSelector((state) => state.allCategories);

  const { featuredProducts, loading: featuredLoading } = useSelector((state) => state.featured);

  const { cartItems } = useSelector(state => state.cart);

  const { wishlists, loading: wishlistLoading } = useSelector((state) => state.wishlists);

  const [mobileToggleClass, setMobileToggleClass ] = useState(true);
  const [ headerBorder, setHeaderBorder ] = useState("shadow-none");

  const [adminRoute, setAdminRoute] = useState(false);

  const [dealsOpen, setDealsOpen] = useState(false);

  const handlePopupOpen = () => {
    setDealsOpen(true);
  };

  const handlePopupClose = () => {
    setDealsOpen(false);
  };

  const handleDealsClick = (id) => {
    setDealsOpen(false);
    navigate('/product/'+id);
  }

  const location = useLocation();

  const menuLinks = [
    {
      name: "Home",
      redirect: "/",
    },
    {
      name: "About Us",
      redirect: "/about-us",
    },
    {
      name: "Shop",
      redirect: "/products",
    },
    {
      name: "Blogs",
      redirect: "/blogs",
    },
    {
      name: "Contact Us",
      redirect: "/contact",
    },
  ]

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // category button
  const [openCat, setOpenCat] = useState(false);
  const anchorRefCat = useRef(null);

  const handleToggleCat = () => {
    setOpenCat((prevOpen) => !prevOpen);
  };

  const handleCloseCat = (event) => {
    if (anchorRefCat.current && anchorRefCat.current.contains(event.target)) {
      return;
    }

    setOpenCat(false);
  };

  function handleListKeyDownCat(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenCat(false);
    } else if (event.key === "Escape") {
      setOpenCat(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  const prevOpenCat = useRef(openCat);

  const listenScrollEvent = () => {
    if (window.scrollY > 100) {
      setHeaderBorder("shadow");
    } else {
      setHeaderBorder("shadow-none");
    }
    
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;

    if (prevOpenCat.current === true && openCat === false) {
      anchorRefCat.current.focus();
    }

    prevOpenCat.current = openCat;

    setAdminRoute(location.pathname.split("/", 2).includes("admin"));
   
    if(categoriesLoading === undefined){
      dispatch(getAllCategories());
    }

    if(featuredLoading === undefined){
      dispatch(getFeaturedProducts());
    }

    window.addEventListener("scroll", listenScrollEvent);

    if(user && user._id && wishlistLoading === undefined){
      dispatch(getWIshlistItems(user._id));
    }

  }, [open, location, openCat, dispatch, categoriesLoading, user, wishlistLoading, featuredLoading]);

  var settings = {
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    arrows: false,
    pauseOnHover: true,
  }

  return (
    <>
      {!adminRoute && (
        <>
          <div className='top-header py-2 bg-primary-green'>
            <div className="w-full sm:w-11/12 m-auto px-4 flex justify-between items-center relative">

              <div className="w-full items-center justify-center xl:justify-start xl:w-1/4 flex">
                <p className='text-xs sm:text-sm text-white flex items-center gap-1'><FmdGoodOutlinedIcon /> SCO 30, VIP Road, Zirakpur, PB (India)</p>
              </div>

              <div className="hidden xl:flex flex-1 items-center justify-center xl:w-2/4 overflow-hidden">
                <Slider {...settings} className="w-full">
                  <div>
                    <p className='text-sm text-white text-center'><span className='font-semibold'>Welcome to Fresh Organic Grocery</span> new offers every single day!</p>
                  </div>
                  <div>
                    <p className='text-sm text-white text-center'>Something you love is now on sale! <a href="/products" className='font-semibold underline'>Buy Now!</a></p>
                  </div>
                </Slider>
              </div>
              <div className="hidden xl:flex items-center justify-end gap-3 sm:gap-5 w-full md:w-1/4">
              </div>
              
            </div>
          </div>

          {/* main header */}
          <header className={`bg-white sticky top-0 py-2 w-full ${headerBorder}`} style={{zIndex: 1500}}>

            {/* <!-- navbar container --> */}
            <div className="w-full sm:w-11/12 px-4 m-auto flex justify-between items-center relative">

              {/* <!-- logo container --> */}
              <div className="flex w-1/2 lg:w-1/4 items-center">

                <Link className="w-16 lg:w-auto h-16 xl:h-20 mr-2 md:mr-3 focus-visible:outline-0" to="/">
                  <LazyLoadImage 
                    className="h-full w-full object-contain" src={logo} alt="Fresh Organic Grocery"
                  />
                </Link>

                {/* <!-- nav container --> */}
                <div className="flex lg:hidden flex-1 justify-start lg:justify-center items-center">

                  <div className="lg:hidden flex items-center mr-3 md:mr-6">
                    <button className="mobile-menu-button" onClick={() => setMobileToggleClass(!mobileToggleClass)}>
                      <MenuIcon />
                    </button>
                  </div>

                  <nav className={`${mobileToggleClass ? 'hidden' : 'flex'} lg:flex lg:flex-row flex-col navigation-menu items-start justify-center flex-1 gap-5 sm:gap-7 absolute drop-shadow lg:drop-shadow-none left-0 w-full lg:static bg-white py-5 px-5 z-10`}>
                    {menuLinks.map((item, i) => (
                      <NavLink to={item.redirect} key={i} className="px-2 text-black text-md cursor-pointer hover:text-primary-green" onClick={() => setMobileToggleClass(!mobileToggleClass)} reloadDocument={true}>{item.name}</NavLink>
                    ))}
                  </nav>

                </div>
                {/* <!-- nav container --> */}

              </div>
              {/* <!-- logo container --> */}

              <div className='flex w-2/4 items-center'>
                <Searchbar />
              </div>

              {/* <!-- right navs and searchbar --> */}
              <div className="flex w-1/2 lg:w-1/4 items-center justify-end ml-1 sm:ml-0 relative">

                <Link to="tel:+919915841204" className="hidden sm:flex items-center gap-2 relative px-4 border-r border-gray-400">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone-call text-gray"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
                </Link>

                <Link to="/wishlist" className="flex items-center gap-2 relative px-4 border-r border-gray-400">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart text-gray"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                  
                  {wishlists.length > 0 && (
                    <div className="w-4 h-4 p-2 bg-red-400 text-white text-xs rounded-sm absolute -top-2 right-2 flex justify-center items-center border">
                      {wishlists.length}
                    </div>
                  )}

                </Link>

                <Link to="/cart" className="flex items-center gap-2 relative px-4 border-r border-gray-400">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart text-gray"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></span>
                
                  {cartItems.length > 0 && (
                    <div className="w-4 h-4 p-2 bg-red-400 text-white text-xs rounded-sm absolute -top-2 right-2 flex justify-center items-center border">
                      {cartItems.length}
                    </div>
                  )}
                  
                </Link>

                <div className='flex relative'>
                  {isAuthenticated === false ?
                    <Link to="/login" className="cursor-pointer pl-2 sm:pl-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user text-gray"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </Link>
                    :
                    (
                      <div className='pl-0'>
                        <Button
                          ref={anchorRef}
                          id="userDropDown"
                          aria-controls={open ? "userDropDown-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                        >
                          {/* {user.name && user.name.split(" ", 1)} */}
                          <Avatar
                              alt="Avatar"
                              src={user.avatar && user.avatar.url}
                              sx={{ width: 32, height: 32 }}
                          />
                          <span>{open ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
                        </Button>
                        <Popper
                          open={open}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          placement="bottom-start"
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                boxShadow: "none",
                                transformOrigin:
                                  placement === "bottom-start" ? "left top" : "left bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={open}
                                    id="userDropDown-menu"
                                    aria-labelledby="userDropDown"
                                    onKeyDown={handleListKeyDown}
                                    className='p-0 border border0gray-300'
                                  >
                                    <PrimaryDropDownMenu setOpen={setOpen} user={user} />

                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </div>
                      
                    )
                  }

                </div>

              </div>
              {/* <!-- right navs and searchbar --> */}

            </div>
            {/* <!-- navbar container --> */}
          </header>
          {/* main header end */}

          <div className='block bottom-header pb-2'>
            <div className="w-full sm:w-11/12 px-4 gap-5 m-auto flex items-center justify-between relative">

              <div className='flex items-center'>
                <Button
                  ref={anchorRefCat}
                  id="userDropDownCat"
                  aria-controls={openCat ? "userDropDown-menuCat" : undefined}
                  aria-expanded={openCat ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggleCat}
                  className='bg-primary-green text-white'
                >
                  <SortOutlinedIcon /> All categories  
                </Button>
                
                <Popper
                  open={openCat}
                  anchorEl={anchorRefCat.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                  className='z-20'
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        boxShadow: "none",
                        transformOrigin:
                        placement === "bottom-start" ? "left top" : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleCloseCat}>
                          <MenuList
                            autoFocusItem={openCat}
                            id="userDropDown-menuCat"
                            aria-labelledby="userDropDownCat"
                            onKeyDown={handleListKeyDownCat}
                            className="p-0 border border-gray-300 w-60"
                          >
                            {categories && categories.map((item, i) => (
                              <Link to={`/products?category=${item._id}`} key={i} onClick={handleCloseCat} className='px-3 py-2 border-b flex gap-3 items-center hover:bg-gray-200' reloadDocument={true}>
                                {item.icon && (
                                  <img src={item.icon.url} alt={item.name} className='w-6 h-6 object-contain'/>
                                )}
                                {item.name}
                              </Link>
                              
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>

              {/* <!-- nav container --> */}
              <div className="hidden lg:flex flex-1 justify-start lg:justify-center items-center">

                <nav className={`${mobileToggleClass ? 'hidden' : 'flex'} lg:flex lg:flex-row flex-col navigation-menu items-start justify-center flex-1 gap-5 sm:gap-7 absolute drop-shadow lg:drop-shadow-none left-0 w-full lg:static bg-white py-2 px-5 z-10`}>
                  {menuLinks.map((item, i) => (
                    <NavLink to={item.redirect} key={i} className="px-2 text-black text-md cursor-pointer hover:text-primary-green" onClick={() => setMobileToggleClass(!mobileToggleClass)} reloadDocument={true}>{item.name}</NavLink>
                  ))}
                </nav>

              </div>
              {/* <!-- nav container --> */}

              <div className='flex items-center'>
                <button className="bg-green-100 w-full px-4 py-3 text-md font-bold text-primary-green hover:bg-primary-green hover:text-white rounded-sm capitalize outline-none gap-2 flex justify-between items-center" onClick={handlePopupOpen}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  <span className='hidden sm:block'>Deal Today</span>
                </button>
              </div>
            </div>
          </div>


          <Dialog
            open={dealsOpen}
            onClose={handlePopupClose}
            className="coupon_popup w-full"
          >
            <DialogTitle className="border-b flex justify-between items-center">
              <div>Deal Today <p className='text-sm'>Recommended deals for you.</p></div> <CloseIcon onClick={handlePopupClose} className="cursor-pointer" />
            </DialogTitle>
            <DialogContent className="flex flex-col m-1 gap-4">
              <ul className='flex flex-col gap-2'>
                {!featuredLoading && featuredProducts?.length === 0 && (
                  <li>No Product Found.</li>
                )}

                {featuredLoading ? null : (
                  featuredProducts?.map((product, i) => (
                    <li key={i} className='border border-gray-300 p-2 rounded'>
                      <div className="flex flex-row items-center text-center group w-full gap-4 cursor-pointer" onClick={()=> handleDealsClick(product._id)}>
                        <div className="w-20 sm:w-1/6 h-full bg-[#f4f4f4]">
                          <LazyLoadImage className="w-full h-full object-cover" src={product.images[0].url} alt={product.name} />
                        </div>
                        <div className='w-full sm:w-5/6 flex flex-col gap-2 items-start'>
                          <h2 className="text-sm sm:text-lg font-semibold group-hover:text-primary-green">{product.name.length > 50 ? `${product.name.substring(0, 50)}...` : product.name}</h2>

                          <div className="flex items-center gap-1.5 text-md font-medium">
                            <span>₹{product.price.toLocaleString()}</span>
                            {product.cuttedPrice !== 0 ?
                              <>
                                <span className="text-gray-500 line-through text-md">₹{product.cuttedPrice.toLocaleString()}</span>
                                <span className="text-md text-primary-green">{getDiscount(product.price, product.cuttedPrice)}%&nbsp;off</span>
                              </>
                              : null  
                            }
                          </div>
                        </div>
                            
                      </div>
                    </li>
                  ))
                                        
                )}
              </ul>
                    
            </DialogContent>
                
          </Dialog>

        </>
      )}
    </>
    
  )
};

export default Header;
