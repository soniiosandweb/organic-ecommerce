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
      name: "Contact Us",
      redirect: "/",
    },
    {
      name: "About Us",
      redirect: "/",
    },
    {
      name: "Careers",
      redirect: "/",
    },
    {
      name: "Organic Stories",
      redirect: "/",
    },
  ]

  return (

    <header className="bg-white sticky top-0 py-4 w-full z-10 shadow">

      {/* <!-- navbar container --> */}
      <div className="w-full sm:w-11/12 px-1 m-auto flex justify-between items-center relative">

        {/* <!-- logo & nav container --> */}
        <div className="flex items-center">

          <div className="xl:hidden flex items-center mr-6">
            <button className="mobile-menu-button" onClick={() => setMobileToggleClass(!mobileToggleClass)}>
              <MenuIcon />
            </button>
          </div>
          <Link className="h-12 mr-6" to="/">
            <img draggable="false" className="h-full w-full object-contain" src={logo} alt="Organic Logo" />
          </Link>

          <nav className={`${mobileToggleClass ? 'hidden' : 'flex'} xl:flex xl:flex-row flex-col navigation-menu items-center flex-1 gap-0.5 sm:gap-7 absolute w-full top-16 xl:relative xl:top-0 bg-white`}>
            {menuLinks.map((item, i) => (
              <Link to={item.redirect} className="text-black font-medium cursor-pointer" key={i}>{item.name}</Link>
            ))}
          </nav>

        </div>
        {/* <!-- logo & nav container --> */}


        {/* <!-- right navs and searchbar --> */}
        <div className="flex flex-1 items-center justify-end ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">

          <Searchbar />

          {isAuthenticated === false ?
            <Link to="/login" className="text-black font-medium cursor-pointer uppercase">Login / Register</Link>
            :
            (
              <span className="userDropDown flex items-center text-black font-medium gap-1 cursor-pointer" onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}>{user.name && user.name.split(" ", 1)}
                <span>{togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
              </span>
            )
          }

          {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}

          <Link to="/cart" className="flex items-center text-black font-medium gap-2 relative">
            <span><FavoriteBorderOutlinedIcon /></span>
            
            <div className="w-5 h-5 p-2 bg-primary-green text-white text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
              {wishlistItems.length}
            </div>

          </Link>


          <Link to="/cart" className="flex items-center text-black font-medium gap-2 relative">
            <span><LocalMallOutlinedIcon /></span>
           
            <div className="w-5 h-5 p-2 bg-primary-green text-white text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
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
