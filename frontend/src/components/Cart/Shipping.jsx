import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import states from '../../utils/states';
import { createShipping, getAddressDetails, updateShipping } from '../../actions/shippingAction';
import { clearErrors } from '../../actions/wishlistAction';
import { NEW_SHIPPING_RESET, UPDATE_SHIPPING_RESET } from '../../constants/shippingConstants';

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { addressInfo, loading } = useSelector((state) => state.address);
    const { success, error } = useSelector((state) => state.newShipping);
    const { isUpdated, error: updateError } = useSelector((state) => state.shipping);

    const [addressId, setAddressId] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('IN');
    const [state, setState] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }

        if(addressId){
            dispatch(updateShipping(addressId, { address, city, country, state, pincode, phoneNo, landmark }));
        } else {
            dispatch(createShipping({ address, city, country, state, pincode, phoneNo, landmark }));
        }
        
        //navigate("/order/confirm");
    }

    useEffect(() => {
        if(error){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            dispatch({ type: NEW_SHIPPING_RESET });
            dispatch(getAddressDetails(user._id));
            navigate("/order/confirm");
        }

        if(updateError){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            dispatch({ type: UPDATE_SHIPPING_RESET });
            dispatch(getAddressDetails(user._id));
            navigate("/order/confirm");
        }

        if(loading === undefined){
            dispatch(getAddressDetails(user._id));
        } 
        if(addressInfo.length > 0 ){
            setAddressId(addressInfo[0]._id);
            setAddress(addressInfo[0].address);
            setCity(addressInfo[0].city);
            setCountry(addressInfo[0].country);
            setState(addressInfo[0].state);
            setPincode(addressInfo[0].pincode);
            setPhoneNo(addressInfo[0].phoneNo);
            setLandmark(addressInfo[0].landmark);
        }
       
    }, [dispatch, user, navigate, enqueueSnackbar, error, success, addressInfo, loading, updateError, isUpdated]);

    return (
        <>
            <MetaData title="Fresh Organic Grocery: Shipping Details" />
            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex flex-col lg:flex-row gap-3.5 w-full sm:w-11/12 mt-0 md:mt-4 m-auto md:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        <Stepper activeStep={1}>
                            <div className="w-full bg-white">

                                <form onSubmit={shippingSubmit} autoComplete="off" className="flex flex-col justify-start gap-5 w-full px-3 sm:px-8 py-8">

                                    <TextField
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                        required
                                    />

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <TextField
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                            type="number"
                                            label="Pincode"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                        <TextField
                                            value={phoneNo}
                                            onChange={(e) => setPhoneNo(e.target.value.slice(0, 10))}
                                            type="number"
                                            label="Phone No"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <TextField
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            label="City"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                        <TextField
                                            label="Landmark (Optional)"
                                            fullWidth
                                            variant="outlined"
                                            value={landmark}
                                            onChange={(e) => setLandmark(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">

                                        <FormControl fullWidth>
                                            <InputLabel id="country-select">Country</InputLabel>
                                            <Select
                                                labelId="country-select"
                                                id="country-select"
                                                defaultValue={country}
                                                disabled
                                                label="Country"
                                                onChange={(e) => setCountry(e.target.value)}
                                            >
                                                <MenuItem value={'IN'}>India</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth disabled={country ? false : true}>
                                            <InputLabel id="state-select-label">State *</InputLabel>
                                            <Select
                                                labelId="state-select-label"
                                                id="state-select"
                                                value={state}
                                                label="State "
                                                onChange={(e) => setState(e.target.value)}
                                                required
                                            >
                                                {states.map((item) => (
                                                    <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    </div>

                                    <button type="submit" className="bg-primary-green w-full sm:w-1/3 my-2 py-3.5 text-md font-semibold text-white shadow hover:bg-black rounded-sm capitalize outline-none">save and deliver here</button>
                                </form>
                            </div>
                        </Stepper>
                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Shipping;
