import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);

  const [mobileToggleClass, setMobileToggleClass ] = useState(true);

  const menuLinks = [
    {
      name: "About Us",
      redirect: "/",
    },
    {
      name: "Shop",
      redirect: "/products",
    },
    {
      name: "Blogs",
      redirect: "/",
    },
    {
      name: "Contact Us",
      redirect: "/",
    },
  ]

  return (

    <header className="bg-white sticky top-0 py-4 w-full z-50 shadow">

      {/* <!-- navbar container --> */}
      <div className="w-full sm:w-11/12 px-4 m-auto flex justify-between items-center relative">

        {/* <!-- logo & nav container --> */}
        <div className="flex items-center">

          <div className="xl:hidden flex items-center mr-3 md:mr-6">
            <button className="mobile-menu-button" onClick={() => setMobileToggleClass(!mobileToggleClass)}>
              <MenuIcon />
            </button>
          </div>
          <Link className="h-16 mr-3 md:mr-6" to="/">
            <img draggable="false" className="h-full w-full object-contain" src={logo} alt="Organic Logo" />
          </Link>

          <nav className={`${mobileToggleClass ? 'hidden' : 'flex'} xl:flex xl:flex-row flex-col navigation-menu items-start flex-1 gap-5 sm:gap-7 absolute w-full top-16 xl:relative xl:top-0 bg-white py-5 px-5`}>
            {menuLinks.map((item, i) => (
              <Link to={item.redirect} className="text-black font-semibold cursor-pointer" key={i}>{item.name}</Link>
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
                <span className="userDropDown flex items-center text-black font-semibold gap-1 cursor-pointer" onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}>{user.name && user.name.split(" ", 1)}
                  <span>{togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
                </span>
              )
            }

            {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}
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
  )
};

export default Header;
