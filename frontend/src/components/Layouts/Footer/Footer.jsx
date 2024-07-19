import { useEffect, useState } from 'react';
import paymentMethods from '../../../assets/images/Footer/payment-method.png';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InstagramIcon from '@mui/icons-material/Instagram';
import product from '../../../assets/images/Footer/product.svg';
import delivery from '../../../assets/images/Footer/delivery.svg';
import discount from '../../../assets/images/Footer/discount.svg';
import market from '../../../assets/images/Footer/market.svg';

const footerLinks = [
  {
    title: "about",
    links: [
      {
        name: "About Us",
        redirect: "/about-us",
        target: "",
      },
      {
        name: "Shop",
        redirect: "/products",
        target: "",
      },
      {
        name: "Blogs",
        redirect: "/blogs",
        target: "",
      },
      {
        name: "Contact Us",
        redirect: "/contact",
        target: "",
      },
    ]
  },
  {
    title: "help",
    links: [
      {
        name: "Shipping",
        redirect: "/shipping-policy",
        target: "",
      },
      {
        name: "Cancellation & Returns",
        redirect: "/cancellation-return",
        target: "",
      },
      {
        name: "FAQ",
        redirect: "/#faq",
        target: "",
      }
    ]
  },
  {
    title: "policy",
    links: [
      {
        name: "Terms Of Use",
        redirect: "/terms-and-conditions",
        target: "",
      },
      {
        name: "Privacy",
        redirect: "/privacy-policy",
        target: "",
      },
    ]
  },
]

const Footer = () => {

  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <footer className="w-full px-4 bg-gray-100 text-black text-gray-600 text-md flex flex-col overflow-hidden">

            <div className='py-8 sm:w-11/12 m-auto w-full hidden md:flex justify-between flex-wrap gap-4 border-b border-dashed border-gray-400'>
              <div className='flex items-center gap-4 w-5/12 xl:w-auto'>
                <img src={product} alt='product' />
                <p className='text-black text-sm'>Every Fresh Products</p>
              </div>

              <span className='h-8 w-px border-r border-dashed border-gray-400'></span>

              <div className='flex items-center gap-4 w-5/12 xl:w-auto'>
                <img src={delivery} alt='delivery' />
                <p className='text-black text-sm'>Free Delivery For Order Over $50</p>
              </div>

              <span className='hidden xl:block h-8 w-px border-r border-dashed border-gray-400'></span>

              <div className='flex items-center gap-4 w-5/12 xl:w-auto'>
                <img src={discount} alt='discount' />
                <p className='text-black text-sm'>Daily Mega Discounts</p>
              </div>

              <span className='h-8 w-px border-r border-dashed border-gray-400'></span>

              <div className='flex items-center gap-4 w-5/12 xl:w-auto'>
                <img src={market} alt='market' />
                <p className='text-black text-sm'>Best Price On The Market</p>
              </div>
            </div>

            <div className="w-full sm:w-11/12 py-14 m-auto flex flex-col md:flex-row justify-between items-center md:items-start relative border-b border-dashed border-gray-400 flex-wrap">

              <div className="w-full md:w-4/12 xl:w-3/12 px-2 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
                
                <div className="w-full md:w-1/1 text-sm text-left">

                  <Link className="h-20 md:h-24 mb-4 flex w-max mx-auto md:mx-0" to="/">
                    <LazyLoadImage 
                      src={logo} 
                      alt="Fresh Organic Grocery"
                      className="h-full w-full object-contain"
                    />
                  </Link>
                  <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                  <p className="mt-4 flex gap-2 justify-start">
                    <svg style={{flex : "0 0 20px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    SCO 30, First Floor, Near Devaji Plaza, <br/>VIP Road, Zirakpur, PB (India).</p>

                  <p className="mt-2 flex gap-2 justify-start">
                    <svg style={{flex : "0 0 20px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <a className='hover:text-primary-green' href="mailto:info@freshorganicgrocery.com">info@freshorganicgrocery.com</a>
                  </p>
                </div>
              </div>

              <div className="w-full md:w-8/12 xl:w-6/12 px-2 flex flex-col sm:flex-row mt-4 md:mt-0">

                {footerLinks.map((el, i) => (
                  <div className="w-full sm:w-1/3 flex flex-col gap-2 mb-3 sm:mb-6 md:ml-5 items-start" key={i}>
                    <h2 className="mb-5 text-black text-lg font-semibold capitalize">
                      <span className='text-primary-green visible md:hidden'>~ </span> 
                      {el.title} 
                      <span className='text-primary-green'> ~</span>
                    </h2>
                    {el.links.map((item, i) => (
                      <a href={item.redirect} rel="noreferrer" className="text-sm hover:text-primary-green" key={i} target={item.target}>{item.name}</a>
                    ))}

                  </div>
                ))}

              </div>

              <div className="w-full mt-5 xl:mt-0 xl:w-3/12 px-2 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
                
                <div className="w-full sm:w-1/1 text-sm text-left">

                  <h2 className="mb-5 text-black text-lg font-semibold capitalize">
                    <span className='text-primary-green visible md:hidden'>~ </span> 
                    Contact Us
                    <span className='text-primary-green'> ~</span>
                  </h2>

                  <div className="w-full flex items-start gap-3 justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <div className="text-md">
                      <p className="text-sm">Hotline 24/7 :</p>
                      <a className="hover:text-primary-green text-sm font-semibold text-black" href="tel:+919915841204">+91 9915841204</a>
                    </div>
                  </div>

                  <div className='border-b border-dashed border-gray-400 h-px my-4 ml-10'></div>

                  <div className="w-full flex items-start gap-3 justify-start ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail w-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <div className="text-md">
                      <p className="text-sm">Email Address :</p>
                      <a className="hover:text-primary-green text-sm font-semibold text-black" href="mailto:info@freshorganicgrocery.com">info@freshorganicgrocery.com</a>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <div className="py-6 sm:w-11/12 m-auto w-full flex justify-center md:justify-between items-center text-xs flex-col lg:flex-row gap-2">

              <div className='flex items-center flex-1 justify-center lg:justify-start w-full lg:w-1/3'>
                <p className='text-center lg:text-left'>&copy; {new Date().getFullYear()} <a href="/" className='font-semibold text-primary-green'>Fresh Organic Grocery</a>. All Rights Reserved.</p>
              </div>
              
              <div className='flex items-center justify-center flex-1 w-full lg:w-1/3'>
                <LazyLoadImage 
                  src={paymentMethods} 
                  alt="Card Payment" 
                  className='pt-2 lg:pt-0'
                />
              </div>

              <div className='flex items-center gap-3 flex-1 w-full lg:w-1/3 justify-center lg:justify-end'>
                <span className='text-sm'>Stay connected :</span>
                <a href="https://www.facebook.com/" rel="noreferrer" className="" target="_blank">
                  <svg fill="#4a5568" className='w-5 h-5' width="64px" height="64px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"></path></g></svg>
                </a>
                <a href="https://twitter.com/" rel="noreferrer" className="" target="_blank">
                  <svg fill="#4a5568" className='w-5 h-5' width="64px" height="64px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.919 24.94c-2.548 0-4.921-.747-6.919-2.032a9.049 9.049 0 0 0 6.681-1.867 4.512 4.512 0 0 1-4.215-3.137c.276.054.559.082.848.082.412 0 .812-.056 1.193-.156a4.519 4.519 0 0 1-3.622-4.425v-.059a4.478 4.478 0 0 0 2.042.564 4.507 4.507 0 0 1-2.008-3.758c0-.824.225-1.602.612-2.268a12.811 12.811 0 0 0 9.303 4.715 4.517 4.517 0 0 1 7.692-4.115 9.107 9.107 0 0 0 2.866-1.094 4.542 4.542 0 0 1-1.983 2.498 9.08 9.08 0 0 0 2.592-.71 9.283 9.283 0 0 1-2.252 2.337c.008.193.014.388.014.583-.001 5.962-4.542 12.843-12.844 12.842"></path></g></svg>
                </a>
                <a href="http://instagram.com/" rel="noreferrer" className="" target="_blank">
                  <InstagramIcon sx={{ fontSize: "1rem" }}/>
                </a>
                
              </div>

            </div>
          </footer>
          {/* <!-- footer ends --> */}
 
        </>
      )}
    </>
  )
};

export default Footer;
