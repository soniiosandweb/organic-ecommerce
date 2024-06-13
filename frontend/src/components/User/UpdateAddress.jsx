import MetaData from "../Layouts/MetaData"
import Sidebar from "./Sidebar"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { saveShippingInfo } from "../../actions/cartAction";
import states from "../../utils/states";

const UpdateAddress = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [country, setCountry] = useState('IN');
    const [state, setState] = useState(shippingInfo.state);
    const [pincode, setPincode] = useState(shippingInfo.pincode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }
        dispatch(saveShippingInfo({ address, city, country, state, pincode, phoneNo }));
    }

    return(
        <>
            <MetaData title="Manage Address | Organic" />

            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex gap-3.5 sm:w-11/12 flex-col lg:flex-row sm:mt-4 m-auto mb-7">
                    <Sidebar activeTab={"address"} />

                    {/* <!-- Address column --> */}
                    <div className="flex-1 overflow-hidden border border-gray-300 shadow bg-white">

                        <h2 className="font-medium text-xl px-4 sm:px-8 py-4 border-b">Manage Address</h2>

                        <form onSubmit={shippingSubmit} autoComplete="off" className="flex flex-col justify-start gap-5 w-full px-1 sm:px-8 py-4">

                            <TextField
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                                label="Address"
                                variant="outlined"
                                required
                            />

                            <div className="flex gap-6">
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
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    type="number"
                                    label="Phone No"
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </div>

                            <div className="flex gap-6">
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
                                />
                            </div>

                            <div className="flex gap-6">

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
                                    <InputLabel id="state-select">State</InputLabel>
                                    <Select
                                        labelId="state-select"
                                        id="state-select"
                                        value={state}
                                        label="State"
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                    >
                                        {states.map((item) => (
                                            <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <button type="submit" className="block w-full lg:w-max text-md font-medium text-white px-10 py-3 rounded-full shadow-lg capitalize my-4 bg-primary-green hover:bg-black">Update Address</button>
                        </form>

                    </div>
                    {/* <!-- Address column --> */}
                </div>

            </main>
        </>
    )
}

export default UpdateAddress