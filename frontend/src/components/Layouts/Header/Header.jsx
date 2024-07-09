import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
// import facebook from '../../../assets/images/facebook.png';
// import twitter from '../../../assets/images/twitter.png';
// import youtube from '../../../assets/images/youtube.png';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.allCategories);

  const { cartItems } = useSelector(state => state.cart);

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [mobileToggleClass, setMobileToggleClass ] = useState(true);

  const [adminRoute, setAdminRoute] = useState(false);

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
      redirect: "/blog",
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

    dispatch(getAllCategories());

  }, [open, location, openCat, dispatch]);

  return (
    <>
      {!adminRoute && (
        <>
          <div className='top-header py-2 bg-primary-green'>
            <div className="w-full sm:w-11/12 m-auto px-4 flex justify-between items-center relative">

              <div className="hidden items-center w-1/4 xl:flex">
                <p className='text-sm text-white font-medium flex items-center gap-1'><FmdGoodOutlinedIcon /> SCO 30, VIP Road, Zirakpur, PB (India)</p>
              </div>

              <div className="hidden md:flex flex-1 items-center justify-start xl:justify-center w-2/4">
                <p className='text-sm text-white font-medium'>Something you love is now on sale! <a href="/shop" className='font-semibold underline'>Buy Now!</a></p>
              </div>
              <div className="flex items-center justify-end gap-3 sm:gap-5 w-full md:w-1/4">
                {/* <a href="https://www.facebook.com/" rel="noreferrer" className="w-4" target="_blank">
                  <img src={facebook} alt='facebook'></img>
                </a>
                <a href="https://www.twitter.com/" rel="noreferrer" className="w-4" target="_blank">
                  <img src={twitter} alt="twitter"></img>
                </a>
                <a href="https://www.youtube.com/" rel="noreferrer" className="w-4" target="_blank">
                  <img src={youtube} alt='youtube'></img>
                </a> */}
              </div>
              
            </div>
          </div>

          {/* main header */}
          <header className="bg-white sticky top-0 py-2 w-full" style={{zIndex: 1500}}>

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
                      <NavLink to={item.redirect} key={i} className="px-2 text-black text-lg font-medium cursor-pointer hover:text-primary-green" onClick={() => setMobileToggleClass(!mobileToggleClass)}>{item.name}</NavLink>
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
              <div className="flex w-1/2 lg:w-1/4 items-center justify-end ml-1 sm:ml-0 gap-5 sm:gap-7 relative">

                <Link to="tel:+919915841204" className="flex items-center gap-2 relative">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone-call text-gray"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
                </Link>

                <Link to="/wishlist" className="flex items-center gap-2 relative">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart text-gray"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                  
                  <div className="w-5 h-5 p-2 bg-red-500 text-white text-sm rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                    {wishlistItems.length}
                  </div>

                </Link>

                <Link to="/cart" className="flex items-center gap-2 relative">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart text-gray"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></span>
                
                  <div className="w-5 h-5 p-2 bg-red-500 text-white text-sm rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                    {cartItems.length}
                  </div>
                </Link>

                <div className='flex relative'>
                  {isAuthenticated === false ?
                    <Link to="/login" className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user text-gray"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </Link>
                    :
                    (
                      <div>
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

          <div className='hidden lg:block bottom-header py-2 lg:py-0'>
            <div className="w-full sm:w-11/12 px-4 gap-5 m-auto flex items-center relative">

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
                  className='z-10'
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
                            className="p-0 border border0gray-300 w-60"
                          >
                            {categories && categories.map((item, i) => (
                              <Link to={`/products?category=${item._id}`} key={i} onClick={handleCloseCat} className='px-3 py-2 border-b flex gap-3 items-center hover:bg-gray-50'>{item.name}</Link>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>

              {/* <!-- nav container --> */}
              <div className="flex flex-1 justify-start lg:justify-center items-center">

                <div className="lg:hidden flex items-center mr-3 md:mr-6">
                  <button className="mobile-menu-button" onClick={() => setMobileToggleClass(!mobileToggleClass)}>
                    <MenuIcon />
                  </button>
                </div>

                <nav className={`${mobileToggleClass ? 'hidden' : 'flex'} lg:flex lg:flex-row flex-col navigation-menu items-start justify-center flex-1 gap-5 sm:gap-7 absolute drop-shadow lg:drop-shadow-none left-0 w-full lg:static bg-white py-5 px-5 z-10`}>
                  {menuLinks.map((item, i) => (
                    <NavLink to={item.redirect} key={i} className="px-2 text-black text-lg font-medium cursor-pointer hover:text-primary-green" onClick={() => setMobileToggleClass(!mobileToggleClass)}>{item.name}</NavLink>
                  ))}
                </nav>

              </div>
              {/* <!-- nav container --> */}

              <div className='flex items-center'>
                <button className="bg-gray-100 w-full my-2 px-4 py-3 text-md font-semibold text-primary-green hover:bg-primary-green hover:text-white rounded-sm capitalize outline-none flex justify-between items-center" >
                    <ElectricBoltOutlinedIcon /> Deal Today
                  </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
    
  )
};

export default Header;
