import axios from "axios";
import { CONTACT_US_REQUEST, CONTACT_US_SUCCESS, CONTACT_US_FAIL } from "../constants/contactUsConstants";

// Contact Form Submit
export const contactFormData = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CONTACT_US_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post('/api/v1/contact', formData, config);

        dispatch({
            type: CONTACT_US_SUCCESS,
            payload: data,
        })

        console.log(data)

    } catch (error) {
        dispatch({
            type: CONTACT_US_FAIL,
            payload: error.response.data.message,
        });
    }
};