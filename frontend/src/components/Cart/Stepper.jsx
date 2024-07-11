import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const Stepper = ({ activeStep, children }) => {

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`;

    const steps = [
        {
            label: "Login",
            desc: <p className="font-medium text-sm">{isAuthenticated !== false ? user.name : null} <span className="text-sm font-normal">{isAuthenticated !== false ? user.email : null}</span></p>,
            link: "",
        },
        {
            label: "Delivery Address",
            desc: <p className="font-medium text-sm">{isAuthenticated !== false ? user.name : null} <span className="text-sm font-normal">{address}</span></p>,
            link: "/shipping",
        },
        {
            label: "Order Summary",
            desc: <p className="font-medium text-sm">{cartItems.length} Item</p>,
            link: "/order/confirm",
        },
        {
            label: "Payment Options",
            desc: <p className="font-medium text-sm">Paytm</p>,
            link: "",
        }
    ]

    return (
        <div className="flex flex-col gap-4">

            {steps.map((step, index) => {

                return (
                    <div key={index}>
                        {activeStep === index ? (
                            <div className="flex flex-col border border-gray-300 shadow rounded-sm">
                                <div className="flex items-center rounded-t-sm bg-black px-6 py-3 gap-4">
                                    <span className="h-5 w-5 flex items-center justify-center text-md font-medium bg-white rounded-sm text-black">{index + 1}</span>
                                    <h2 className="font-medium text-white">{step.label}</h2>
                                </div>
                                {children}
                            </div>
                        ) : (
                            <>
                                {activeStep > index ? (
                                    <Step isDesc={true} {...step} index={index} isLink={true} />
                                ) : (
                                    <Step isDesc={false} {...step} index={index} isLink={false}/>
                                )}
                            </>
                        )}
                    </div>
                )
            })}

        </div>
    );
};

const Step = ({ isDesc, label, desc, link, index, isLink}) => {
    return (
        <div className="flex bg-white border border-gray-300 px-4 py-3 pb-4 rounded-sm">
            <span className="mt-2 ml-2 mr-4 h-5 w-5 flex items-center justify-center text-md font-medium bg-primary-green rounded-sm text-white">{index + 1}</span>
            <div className="flex flex-col mt-1 gap-0.5">
                <h2 className="font-semibold text-black flex items-center gap-2">{label}
                    {isDesc && (
                        <span className="text-primary-green mb-1"><CheckIcon sx={{ fontSize: "20px" }} /></span>
                            
                    )}
                    {isLink && link !== "" && (
                        
                        <Link to={link}><span className="text-primary-green mb-1"><EditIcon sx={{ fontSize: "20px" }} /></span> </Link>
                    )}
                </h2>
                {isDesc && desc}
            </div>
        </div>
    )
}

export default Stepper;
