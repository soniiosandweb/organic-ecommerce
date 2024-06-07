import { useEffect, useState } from 'react';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo-white.png';
import { Link } from 'react-router-dom';

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
        name: "Return Policy",
        redirect: "/",
      },
      {
        name: "Terms Of Use",
        redirect: "/",
      },
      {
        name: "Privacy",
        redirect: "/",
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

                  <Link className="h-20 mb-6 flex w-max mx-auto md:mx-0" to="/">
                    <img draggable="false" className="h-full w-full object-contain" src={logo} alt="Organic Logo" />
                  </Link>

                  <p className="mt-2 leading-5">Zirakpur, 140603,<br />Punjab, India</p>

                  <p className="mt-2 leading-5">
                    Phone: <a className="text-primary-green" href="tel:18002029898">1800 202 9898</a>
                  </p>
                  <p className="mt-2 leading-5">
                    Email: <a className="text-primary-green" href="mailto:test@gmail.com">test@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-12/12 px-2 flex flex-col md:flex-row mt-4 md:mt-0">

                {footerLinks.map((el, i) => (
                  <div className="w-full md:w-1/4 flex flex-col gap-2 mb-3 sm:mb-6 md:ml-5 items-center md:items-start" key={i}>
                    <h2 className="text-white mb-5 text-lg font-semibold capitalize">{el.title} <span className='text-primary-green'>~</span></h2>
                    {el.links.map((item, i) => (
                      <a href={item.redirect} rel="noreferrer" className="hover:text-primary-green" key={i}>{item.name}</a>
                    ))}

                  </div>
                ))}

              </div>
            </div>
            <div className="py-6 sm:w-11/12 m-auto px-4 w-full flex justify-between items-center text-sm text-white flex-col md:flex-row">
              <span>&copy; {new Date().getFullYear()} Organic.com. All Rights Reserved.</span>
              <img draggable="false" src={paymentMethods} alt="Card Payment" className='pt-3 md:pt-0' />
            </div>
          </footer>
          {/* <!-- footer ends --> */}
 
        </>
      )}
    </>
  )
};

export default Footer;
