import MetaData from "../Layouts/MetaData"
import Sidebar from "./Sidebar"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import states from "../../utils/states";
import { createShipping, getAddressDetails, updateShipping } from "../../actions/shippingAction";
import { clearErrors } from "../../actions/wishlistAction";
import { NEW_SHIPPING_RESET, UPDATE_SHIPPING_RESET } from "../../constants/shippingConstants";

const UpdateAddress = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { addressInfo, loading } = useSelector((state) => state.address);
    const { success, error } = useSelector((state) => state.newShipping);
    const { isUpdated, error: updateError } = useSelector((state) => state.shipping);

    const [editAddress, setEditAddress] = useState(true);

    const [addressId, setAddressId] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('IN');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [landmark, setLandmark] = useState('');

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
    }

    useEffect(() => {
        if(error){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            dispatch({ type: NEW_SHIPPING_RESET });
            enqueueSnackbar("Address Updated Successfully", { variant: "success" });
            dispatch(getAddressDetails(user._id));
            setEditAddress(true);
        }

        if(updateError){
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            dispatch({ type: UPDATE_SHIPPING_RESET });
            enqueueSnackbar("Address Updated Successfully", { variant: "success" });
            dispatch(getAddressDetails(user._id));
            setEditAddress(true);
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
       
    }, [dispatch, user, enqueueSnackbar, error, success, addressInfo, loading, updateError, isUpdated]);

    return(
        <>
            <MetaData title="Manage Address | Fresh Organic Grocery" />

            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex gap-3.5 sm:w-11/12 flex-col lg:flex-row sm:mt-4 m-auto mb-7">
                    <Sidebar activeTab={"address"} />

                    {/* <!-- Address column --> */}
                    <div className="flex-1 overflow-hidden border border-gray-300 shadow bg-white">

                        <h2 className="font-medium text-lg px-4 sm:px-8 py-4 border-b">Manage Address <button type="button" className="text-md text-primary-green font-medium ml-8 cursor-pointer" onClick={() => setEditAddress(!editAddress)}>Edit</button></h2>

                        <form onSubmit={shippingSubmit} autoComplete="off" className="flex flex-col justify-start gap-5 w-full px-4 sm:px-8 py-4">

                            <TextField
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                                label="Address"
                                required
                                InputProps={{
                                    readOnly: editAddress,
                                }}
                                variant={editAddress ? "filled" : "outlined"}
                            />

                            <div className="flex flex-col sm:flex-row gap-6">
                                <TextField
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    type="number"
                                    label="Pincode"
                                    fullWidth
                                    required
                                    InputProps={{
                                        readOnly: editAddress,
                                    }}
                                    variant={editAddress ? "filled" : "outlined"}
                                />
                                <TextField
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    type="number"
                                    label="Phone No"
                                    fullWidth
                                    required
                                    InputProps={{
                                        readOnly: editAddress,
                                    }}
                                    variant={editAddress ? "filled" : "outlined"}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <TextField
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    label="City"
                                    fullWidth
                                    required
                                    InputProps={{
                                        readOnly: editAddress,
                                    }}
                                    variant={editAddress ? "filled" : "outlined"}
                                />
                                <TextField
                                    label="Landmark (Optional)"
                                    fullWidth
                                    value={landmark}
                                    onChange={(e) => setLandmark(e.target.value)}
                                    InputProps={{
                                        readOnly: editAddress,
                                    }}
                                    variant={editAddress ? "filled" : "outlined"}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">

                                <FormControl fullWidth className={`${editAddress ? "filled-select" : "outline-select" }`}>
                                    <InputLabel id="country-select-label">Country</InputLabel>
                                    <Select
                                        labelId="country-select-label"
                                        id="country-select"
                                        defaultValue={country}
                                        disabled
                                        label="Country"
                                        onChange={(e) => setCountry(e.target.value)}
                                        variant={editAddress ? "filled" : "outlined"}
                                    >
                                        <MenuItem value={'IN'}>India</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth disabled={country ? false : true} className={`${editAddress ? "filled-select" : "outline-select" }`}>
                                    <InputLabel id="state-select-label">State *</InputLabel>
                                    <Select
                                        labelId="state-select-label"
                                        id="state-select"
                                        value={state}
                                        label="State "
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                        disabled={editAddress}
                                        variant={editAddress ? "filled" : "outlined"}
                                    >
                                        {states.map((item) => (
                                            <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <button type="submit" className={`block w-full lg:w-max ${editAddress ? "bg-gray-500 cursor-not-allowed" : "bg-primary-green hover:bg-black"} text-md font-medium text-white px-10 py-3 rounded-sm shadow-lg capitalize my-4`} disabled={editAddress}>Update Address</button>
                        </form>

                    </div>
                    {/* <!-- Address column --> */}
                </div>

            </main>
        </>
    )
}

export default UpdateAddress