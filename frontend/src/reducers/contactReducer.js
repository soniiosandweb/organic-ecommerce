import { CONTACT_US_REQUEST, CONTACT_US_SUCCESS, CONTACT_US_FAIL } from "../constants/contactUsConstants";

export const contactReducer = (state = {}, { type, payload }) =>{
    switch (type) {
        case CONTACT_US_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_US_SUCCESS:
            return {
                loading: false,
                contact: payload,
            };
        case CONTACT_US_FAIL:
            return {
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}