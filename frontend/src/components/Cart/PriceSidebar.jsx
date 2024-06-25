import { useDispatch, useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { getAllCoupons, clearErrors, setCouponCode, emptyCouponCode } from "../../actions/couponAction";
import DiscountIcon from '@mui/icons-material/Discount';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { setTotalAmount } from "../../actions/cartAction";

const PriceSidebar = ({ cartItems }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { isAuthenticated } = useSelector((state) => state.user);
    const { coupons, error } = useSelector((state) => state.allCoupons);
    const { appliedCoupon } = useSelector((state) => state.appliedCode);
    const { totalAmount } = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const [coupon, setCoupon] = useState("");

    const handlePopupOpen = () => {
        setOpen(true);
    };

    const handlePopupClose = () => {
        setOpen(false);
    };

    const applyCouponHandler = () => {
        if (!coupon.trim()) {
            enqueueSnackbar("Empty Coupon", { variant: "error" });
            return;
        }

        let couponm = coupon.trim().toUpperCase();
        let couponVal = coupons.find((obj) => obj.name === couponm);
        
        if(couponVal === undefined)
        {
            enqueueSnackbar("Coupon is not applicable", { variant: "error" });
            return;
        } else{
            dispatch(setCouponCode(couponVal));
            enqueueSnackbar("Coupon added successfully", { variant: "success" });
            handlePopupClose();
        }
    }

    const applyCouponCode = (couponCode) => {
        dispatch(setCouponCode(couponCode));
        setCoupon(couponCode.name);
        enqueueSnackbar("Coupon added successfully", { variant: "success" });
        handlePopupClose();
    }

    const removeCouponCode = () => {
        dispatch(emptyCouponCode());
        setCoupon("");
    }


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if(cartItems){

            if(isAuthenticated && appliedCoupon && appliedCoupon._id){

                const price = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString();

                if(appliedCoupon.percentage){
                    let discount = (price/100)*(appliedCoupon.discount);
                    let newPrice = (price-discount).toLocaleString();
                    dispatch(setTotalAmount(newPrice))
                } else {
                    let newPrice = (price-appliedCoupon.discount).toLocaleString();
                    dispatch(setTotalAmount(newPrice))
                }
            } else {
                let newPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString();
                dispatch(setTotalAmount(newPrice))
            }
            
        }
        
        dispatch(getAllCoupons());
    }, [dispatch, error, enqueueSnackbar, cartItems, appliedCoupon, isAuthenticated]);

    return (
        <div className="flex flex-col md:w-4/12 md:px-1">

            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-gray-100 rounded-sm border border-gray-300 sticky top-24 ">
                <h1 className="px-6 py-3 border-b text-xl border-gray-300 font-semibold text-black">Cart Totals</h1>

                <div className="flex flex-col gap-4 p-6 pb-3 font-medium">
                    <p className="flex justify-between">Price ({cartItems.length} item)
                        <span>
                            <span>₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
                            {cartItems.cuttedPrice !== 0 &&
                                <span className="pl-2 text-gray-500 line-through font-normal">₹{cartItems.reduce((sum, item) => sum + (item.cuttedPrice * item.quantity), 0).toLocaleString()}</span>
                            }
                        </span>
                    </p>
                    <p className="flex justify-between">Discount <span className="text-primary-green">₹{cartItems.reduce((sum, item) => sum + (((item.cuttedPrice !== 0 ? item.cuttedPrice : item.price) * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()}</span></p>
                    
                    <p className="flex justify-between">Delivery Charges <span className="text-primary-green">FREE</span></p>

                    {isAuthenticated && appliedCoupon && appliedCoupon._id &&
                        <p className="flex justify-between"><span>Coupon Applied (<span className="text-primary-green font-semibold">{appliedCoupon.name}</span>)</span> <span className="text-primary-green">-{appliedCoupon.discount}{appliedCoupon.percentage && '%'}</span></p>
                    }

                    {isAuthenticated && cartItems.length > 0 &&
                    (
                        <button className="bg-primary-green w-full my-2 px-4 py-3 text-md font-semibold text-white shadow hover:bg-black rounded-sm capitalize outline-none flex justify-between items-center" onClick={handlePopupOpen}>
                            <span>
                                <DiscountIcon /> Apply Coupon
                            </span>
                            <KeyboardArrowRightIcon />
                        </button>
                    )}

                    <div className="border border-dashed border-gray-300"></div>
                   
                    <p className="flex justify-between text-lg font-semibold">Total Amount <span>₹{totalAmount}</span></p>
                    
                    <div className="hidden border border-dashed border-gray-300"></div>

                    <p className="hidden font-semibold text-primary-green">You will save ₹{cartItems.reduce((sum, item) => sum + (((item.cuttedPrice !== 0 ? item.cuttedPrice : item.price) * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()} on this order</p>

                </div>

            </div>
            {/* <!-- nav tiles --> */}

            <Dialog
                open={open}
                onClose={handlePopupClose}
                className="coupon_popup w-full"
            >
                <DialogTitle className="border-b flex justify-between items-center">Coupon Code <CloseIcon onClick={handlePopupClose} className="cursor-pointer" /></DialogTitle>
                <DialogContent className="flex flex-col m-1 gap-4">
                    
                    <div className="justify-between items-center shadow bg-white rounded-sm overflow-hidden flex">
                        <input name="coupon_code" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="py-4 px-6 text-md flex-1 outline-none border-none placeholder-gray-500" type="text" placeholder="Coupon Code" />
                        
                        <button onClick={applyCouponHandler} className="py-4 px-6 rounded-sm bg-primary-green hover:bg-black text-white shadow uppercase">Submit</button>
                    </div>
                    <div className="flex flex-col mt-4">
                        {coupons && coupons.map((coupon, index) => (
                            <div className="w-full py-3 flex justify-between items-center gap-3 border-b" key={index}>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-md">{coupon.name}</p>
                                    <p className="font-medium text-md">{coupon.discount} {coupon.percentage ? "%" : null }</p>
                                </div>
                                {appliedCoupon && appliedCoupon._id === coupon._id ?
                                    <button className="text-md font-semibold p-3 hover:text-black text-red-700 uppercase" onClick={()=> removeCouponCode()}>Remove</button>
                                :
                                    <button className="text-md font-semibold p-3 hover:text-black text-primary-green uppercase" onClick={()=> applyCouponCode(coupon)}>Apply</button>
                                }
                                
                            </div>
                            
                        ))}
                    </div>
                </DialogContent>
                
            </Dialog>

        </div>
    );
};

export default PriceSidebar;
