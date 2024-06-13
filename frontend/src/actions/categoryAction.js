import axios from "axios";
import { CLEAR_ERRORS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_SUCCESS } from "../constants/categoryConstants";


// New Category ---ADMIN
export const createCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CATEGORY_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/admin/category/add`, categoryData, config);

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}