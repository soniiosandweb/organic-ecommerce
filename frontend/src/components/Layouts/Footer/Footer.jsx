import { useEffect, useState } from 'react';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo-white.png';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const footerLinks = [
  {
    title: "about",
    links: [
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
        redirect: "/",
      },
      {
        name: "Contact Us",
        redirect: "/contact",
      },
    ]
  },
  {
    title: "help",
    links: [
      {
        name: "Shipping",
        redirect: "/",
      },
      {
        name: "Cancellation & Returns",
        redirect: "/",
      },
      {
        name: "FAQ",
        redirect: "/",
      }
    ]
  },
  {
    title: "policy",
    links: [
      {
        name: "Terms Of Use",
        redirect: "/terms-and-conditions",
      },
      {
        name: "Privacy",
        redirect: "/privacy-policy",
      },
    ]
  },
  {
    title: "social",
    links: [
      {
        name: "Facebook",
        redirect: "/",
      },
      {
        name: "Twitter",
        redirect: "/",
      },
      {
        name: "YouTube",
        redirect: "/",
      }
    ]
  }
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
          <footer className="w-full bg-black text-white text-md flex flex-col overflow-hidden">
            <div className="w-full sm:w-11/12 px-2 py-14 m-auto flex flex-col md:flex-row justify-between items-center md:items-start relative border-b border-gray-600">
              <div className="w-full sm:w-5/12 px-2 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
                
                <div className="w-full sm:w-1/1 text-center md:text-left">

                  <Link className="h-20 md:h-24 mb-4 flex w-max mx-auto md:mx-0" to="/">
                    <LazyLoadImage 
                      src={logo} 
                      alt="Fresh Organic Grocery"
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  <p className="mt-2 leading-5">SCO 30, First Floor, Near Devaji Plaza, <br/>VIP Road, Zirakpur, PB (India).</p>

                  <p className="mt-2 leading-5">
                    Phone: <a className="text-primary-green" href="tel:+919915841204">+91 9915841204</a>
                  </p>
                  <p className="mt-2 leading-5">
                    Email: <a className="text-primary-green" href="mailto:info@freshorganicgrocery.com">info@freshorganicgrocery.com</a>
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-12/12 px-2 flex flex-col md:flex-row mt-4 md:mt-0">

                {footerLinks.map((el, i) => (
                  <div className="w-full md:w-1/4 flex flex-col gap-2 mb-3 sm:mb-6 md:ml-5 items-center md:items-start" key={i}>
                    <h2 className="text-white mb-5 text-lg font-semibold capitalize">
                      <span className='text-primary-green visible md:hidden'>~ </span> 
                      {el.title} 
                      <span className='text-primary-green'> ~</span>
                    </h2>
                    {el.links.map((item, i) => (
                      <a href={item.redirect} rel="noreferrer" className="hover:text-primary-green" key={i}>{item.name}</a>
                    ))}

                  </div>
                ))}

              </div>
            </div>
            <div className="py-6 sm:w-11/12 m-auto px-4 w-full flex justify-center md:justify-between items-center text-sm text-white flex-col md:flex-row">
              <span className='text-center md:text-left'>&copy; {new Date().getFullYear()} <a href="/">Fresh Organic Grocery</a>. All Rights Reserved.</span>
              <LazyLoadImage 
                src={paymentMethods} 
                alt="Card Payment" 
                className='pt-3 md:pt-0'
              />
            </div>
          </footer>
          {/* <!-- footer ends --> */}
 
        </>
      )}
    </>
  )
};

export default Footer;
