import { ADMIN_BLOGS_FAIL, ADMIN_BLOGS_REQUEST, ADMIN_BLOGS_SUCCESS, ALL_BLOGS_FAIL, ALL_BLOGS_REQUEST, ALL_BLOGS_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_RESET, DELETE_BLOG_SUCCESS, NEW_BLOG_FAIL, NEW_BLOG_REQUEST, NEW_BLOG_RESET, NEW_BLOG_SUCCESS, REMOVE_BLOG_DETAILS, UPDATE_BLOG_FAIL, UPDATE_BLOG_REQUEST, UPDATE_BLOG_RESET, UPDATE_BLOG_SUCCESS } from "../constants/blogConstants";

export const blogsReducer = (state = { blogs: [] }, { type, payload }) => {

    switch (type) {
        case ALL_BLOGS_REQUEST:
        case ADMIN_BLOGS_REQUEST:
            return {
                loading: true,
                blogs: [],
            };
        case ALL_BLOGS_SUCCESS:
            return {
                loading: false,
                blogs: payload.blogs,
                blogCount: payload.blogCount,
                resultPerPage: payload.resultPerPage,
                filteredBlogsCount: payload.filteredBlogsCount,
            };
        case ADMIN_BLOGS_SUCCESS:
            return {
                loading: false,
                blogs: payload,
            };
        case ALL_BLOGS_FAIL:
        case ADMIN_BLOGS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const blogDetailsReducer = (state = { blog: {} }, { type, payload }) => {

    switch (type) {
        case BLOG_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case BLOG_DETAILS_SUCCESS:
            return {
                loading: false,
                blog: payload,
            };
        case BLOG_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case REMOVE_BLOG_DETAILS:
            return {
                ...state,
                blog: {},
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// New Blog Reducer
export const newBlogReducer = (state = { blog: {} }, { type, payload }) => {
    switch (type) {
        case NEW_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_BLOG_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                blog: payload.blog,
            };
        case NEW_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_BLOG_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// Blog Reducer
export const blogReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_BLOG_REQUEST:
        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_BLOG_FAIL:
        case DELETE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_BLOG_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_BLOG_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
