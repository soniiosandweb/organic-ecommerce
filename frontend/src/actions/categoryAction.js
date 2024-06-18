import axios from "axios";
import { ALL_CATEGORY_FAIL, ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS, CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, LIMIT_CATEGORY_FAIL, LIMIT_CATEGORY_REQUEST, LIMIT_CATEGORY_SUCCESS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS } from "../constants/categoryConstants";


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

// Get All Categories
export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST });

        const { data } = await axios.get('/api/v1/categories');

        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data.categories,
        })

    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Limited Categories
export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: LIMIT_CATEGORY_REQUEST });

        const { data } = await axios.get('/api/v1/limitcat');

        dispatch({
            type: LIMIT_CATEGORY_SUCCESS,
            payload: data.categories,
        })

    } catch (error) {
        dispatch({
            type: LIMIT_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Category Details
export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/category/${id}`);

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data.category,
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Category ---ADMIN
export const updateCategory = (id, categoryData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1/admin/category/${id}`, categoryData, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Category ---ADMIN
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}