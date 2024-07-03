import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [mobileToggleClass, setMobileToggleClass ] = useState(true);

  const [adminRoute, setAdminRoute] = useState(false);

  const location = useLocation();

  const menuLinks = [
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;

    setAdminRoute(location.pathname.split("/", 2).includes("admin"))

  }, [open, location]);

  return (
    <>
      {!adminRoute && (
        <header className="bg-white sticky top-0 py-2 w-full shadow" style={{zIndex: 1500}}>

          {/* <!-- navbar container --> */}
          <div className="w-full sm:w-11/12 px-4 m-auto flex justify-between items-center relative">

            {/* <!-- logo & nav container --> */}
            <div className="flex items-center">

              <div className="xl:hidden flex items-center mr-3 md:mr-6">
                <button className="mobile-menu-button" onClick={() => setMobileToggleClass(!mobileToggleClass)}>
                  <MenuIcon />
                </button>
              </div>
              <Link className="h-16 xl:h-20 mr-2 md:mr-3 focus-visible:outline-0" to="/">
                <LazyLoadImage 
                  className="h-full w-full object-contain" src={logo} alt="Fresh Organic Grocery"
                />
              </Link>

              <nav className={`${mobileToggleClass ? 'hidden' : 'flex'} xl:flex xl:flex-row flex-col navigation-menu items-start flex-1 gap-5 sm:gap-7 absolute drop-shadow xl:drop-shadow-none left-0 w-full xl:relative bg-white py-5 px-5`}>
                {menuLinks.map((item, i) => (
                  <NavLink to={item.redirect} key={i} className="text-black font-semibold cursor-pointer hover:text-primary-green" onClick={() => setMobileToggleClass(!mobileToggleClass)}>{item.name}</NavLink>
                ))}
              </nav>

            </div>
            {/* <!-- logo & nav container --> */}


            {/* <!-- right navs and searchbar --> */}
            <div className="flex flex-1 items-center justify-end ml-1 sm:ml-0 gap-5 sm:gap-7 relative">

              <Searchbar />

              <div className='flex relative'>
                {isAuthenticated === false ?
                  <Link to="/login" className="text-black font-semibold cursor-pointer uppercase">Login</Link>
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


              <Link to="/wishlist" className="flex items-center text-black font-semibold gap-2 relative">
                <span><FavoriteBorderOutlinedIcon /></span>
                
                <div className="w-5 h-5 p-2 bg-primary-green text-white text-md rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                  {wishlistItems.length}
                </div>

              </Link>


              <Link to="/cart" className="flex items-center text-black font-semibold gap-2 relative">
                <span><LocalMallOutlinedIcon /></span>
              
                <div className="w-5 h-5 p-2 bg-primary-green text-white text-md rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                  {cartItems.length}
                </div>
              </Link>
            </div>
            {/* <!-- right navs and searchbar --> */}

          </div>
          {/* <!-- navbar container --> */}
        </header>
      )}
    </>
    
  )
};

export default Header;
