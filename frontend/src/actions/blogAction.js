import { ADMIN_BLOGS_FAIL, ADMIN_BLOGS_REQUEST, ADMIN_BLOGS_SUCCESS, ALL_BLOGS_FAIL, ALL_BLOGS_REQUEST, ALL_BLOGS_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, LATEST_BLOG_FAIL, LATEST_BLOG_REQUEST, LATEST_BLOG_SUCCESS, NEW_BLOG_FAIL, NEW_BLOG_REQUEST, NEW_BLOG_SUCCESS, UPDATE_BLOG_FAIL, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS } from "../constants/blogConstants";
import axios from "axios";

// Get All Blogs
export const getBlogs = (currentPage = 1,category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_BLOGS_REQUEST });

        let url = `/api/v1/blogs?page=${currentPage}`;

        if (category) {
            url = `/api/v1/blogs?category=${category}&page=${currentPage}`;
        }

        const { data } = await axios.get(url);

        dispatch({
            type: ALL_BLOGS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ALL_BLOGS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get Blog Details
export const getBlogDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/blog/${id}`);

        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data.blog,
        });
    } catch (error) {
        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Blogs ---ADMIN
export const getAdminBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_BLOGS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/blogs`);

        dispatch({
            type: ADMIN_BLOGS_SUCCESS,
            payload: data.blogs,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_BLOGS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Latest Blog
export const getLatestBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: LATEST_BLOG_REQUEST });

        const { data } = await axios.get(`/api/v1/blog/latest`);

        dispatch({
            type: LATEST_BLOG_SUCCESS,
            payload: data.blogs,
        });
    } catch (error) {
        dispatch({
            type: LATEST_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Blog ---ADMIN
export const createBlog = (blogData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_BLOG_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/admin/blog/new`, blogData, config);

        dispatch({
            type: NEW_BLOG_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Blog ---ADMIN
export const updateBlog = (id, blogData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BLOG_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/admin/blog/${id}`, blogData, config);

        dispatch({
            type: UPDATE_BLOG_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Blog ---ADMIN
export const deleteBlog = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BLOG_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/blog/${id}`);

        dispatch({
            type: DELETE_BLOG_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}