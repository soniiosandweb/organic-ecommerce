import { useEffect, useState } from 'react';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';

const footerLinks = [
  {
    title: "about",
    links: [
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
          <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12 bg-primary-darkBlue text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-12/12 flex flex-col sm:flex-row">

              {footerLinks.map((el, i) => (
                <div className="w-full sm:w-1/5 flex flex-col gap-2 my-3 sm:my-6 ml-5" key={i}>
                  <h2 className="text-primary-grey mb-2 uppercase">{el.title}</h2>
                  {el.links.map((item, i) => (
                    <a href={item.redirect} target="_blank" rel="noreferrer" className="hover:underline" key={i}>{item.name}</a>
                  ))}

                </div>
              ))}

            </div>

            <div className="border-gray-600 h-36 w-1 border-l mr-5 mt-6 hidden sm:block"></div>
            <div className="w-full sm:w-5/12 my-6 mx-5 sm:mx-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
              
              <div className="w-full sm:w-1/2">
                <h2 className="text-primary-grey">Registered Office Address:</h2>
                <p className="mt-2 leading-5">
                  Zirakpur, 140603,<br />
                  Punjab, India <br />
                  Telephone: <a className="text-primary-blue" href="tel:18002029898">1800 202 9898</a>
                </p>
              </div>
            </div>

          </footer>
          {/* <!-- footer ends --> */}

          <div className="px-16 py-6 w-full bg-primary-darkBlue hidden sm:flex justify-between items-center text-sm text-white">
            

            <span>&copy; 2007-{new Date().getFullYear()} Organic.com</span>
            <img draggable="false" src={paymentMethods} alt="Card Payment" />
          </div>
        </>
      )}
    </>
  )
};

export default Footer;
