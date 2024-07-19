import MetaData from "../../Layouts/MetaData";
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { createCoupon, clearErrors } from "../../../actions/couponAction";
import { useEffect } from "react";
import BackdropLoader from "../../Layouts/BackdropLoader";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { NEW_COUPON_RESET } from "../../../constants/couponConstants";
import MenuItem from '@mui/material/MenuItem';
import { getAllUsersOnly } from "../../../actions/userAction";
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { createFilterOptions } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const NewCoupon = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newCoupon);

    const { usersall } = useSelector((state) => state.usersOnly);

    const [name, setName] = useState("");
    const [discount, setDiscount] = useState(0);
    const [percentage, setPercentage] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const newCouponSubmitHandler = (e) => {
        e.preventDefault();

        if (selectedUsers.length <= 0) {
            enqueueSnackbar("Select Users", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("discount", discount);
        formData.set("percentage", percentage);

        selectedUsers.forEach((h) => {
            formData.append("usersId", JSON.stringify(h));
        });
       
        dispatch(createCoupon(formData));

    }

    const couponUsersChange = (selected) => {
        const valuesArray = [];
        selected.forEach(valueTag => {
            valuesArray.push({
                _id: usersall.filter(tag => valueTag._id === tag._id).shift()._id,
                name: usersall.filter(tag => valueTag._id === tag._id).shift().name
            });
        });
        setSelectedUsers(valuesArray)
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Category Created successfully", { variant: "success" });
            dispatch({ type: NEW_COUPON_RESET });
            navigate("/admin/coupons");
        }

        dispatch(getAllUsersOnly());

    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return(
        <>
            <MetaData title="Admin: New Coupon | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}

            <Link to="/admin/coupons" className="ml-1 flex w-max items-center gap-0 font-semibold text-primary-green uppercase hover:text-black"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

            <form onSubmit={newCouponSubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white border border-gray-300 gap-5 shadow p-3 lg:p-5" id="couponform">

                <div className="flex flex-col gap-3 w-full lg:w-2/3">
                    <TextField
                        label="Coupon Name"
                        variant="outlined"
                        size="medium"
                        required
                        value={name}
                        name='coupon_name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                </div>

                <div className="flex flex-col gap-3 w-full lg:w-2/3">
                    <TextField
                        label="Discount"
                        type="number"
                        variant="outlined"
                        size="medium"
                        name="discount"
                        InputProps={{
                            inputProps: {
                                min: 1
                            }
                        }}
                        required
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className='flex-1'
                    />
                    
                </div>

                <div className="flex flex-col gap-3 w-full lg:w-2/3">
                    <TextField
                        label="Discount Type"
                        select
                        fullWidth
                        variant="outlined"
                        size="medium"
                        required
                        name="percentage"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                    >
                        <MenuItem value={false}>Flat</MenuItem>
                        <MenuItem value={true}>% Percentage</MenuItem>
                    </TextField>
                    
                </div>

                <div className="flex flex-col gap-3 w-full lg:w-2/3">

                    <Autocomplete
                        multiple
                        id="users"
                        options={usersall}
                        disableCloseOnSelect
                        value={selectedUsers}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {

                            // Check if 'All' option is clicked
                            if (newValue.find((option) => option._id === "0")) {
                              // Check if all options are selected
                              if (usersall.length === selectedUsers.length) {
                                setSelectedUsers([]);
                              } else {
                                couponUsersChange(usersall)
                              }
                            } else {
                                couponUsersChange(newValue)
                            }
                        }}

                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        filterOptions={(options, params) => {
                            const filtered = createFilterOptions()(options, params);
                            let optionName =
                            usersall.length === selectedUsers.length ? "Remove All" : "All";
                            return [{ _id: "0", name: optionName }, ...filtered];
                        }}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={option.name === "Remove All" ? true : selected}
                                value={option._id}
                              />
                              {option.name}
                            </li>
                          )}
                        size="medium"
                        renderInput={(params) => (
                            <TextField {...params} label="Users" placeholder="Select User" />
                        )}
                    />
                    
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/3">
                    <input form="couponform" type="submit" className="bg-primary-green uppercase p-3 text-white font-medium rounded-sm shadow hover:bg-black cursor-pointer" value="Submit" />
                </div>

            </form>

        </>
    )
}

export default NewCoupon;