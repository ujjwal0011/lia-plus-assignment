import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  blogs: [],
  blog: null,
  adminBlogs: [],
  blogStats: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalBlogs: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  adminPagination: {
    currentPage: 1,
    totalPages: 0,
    totalBlogs: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  error: null,
  message: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getAllBlogsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllBlogsSuccess(state, action) {
      state.loading = false;
      state.blogs = action.payload.data.blogs;
      state.pagination = action.payload.data.pagination;
      state.error = null;
    },
    getAllBlogsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.blogs = [];
    },

    getBlogByIdRequest(state) {
      state.loading = true;
      state.error = null;
      state.blog = null;
    },
    getBlogByIdSuccess(state, action) {
      state.loading = false;
      state.blog = action.payload.blog;
      state.error = null;
    },
    getBlogByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.blog = null;
    },

    createBlogRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createBlogSuccess(state, action) {
      state.loading = false;
      state.blogs = [action.payload.blog, ...state.blogs];
      state.message = action.payload.message;
      state.error = null;
    },
    createBlogFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    updateBlogRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateBlogSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;

      const updatedBlogIndex = state.blogs.findIndex(
        (blog) => blog._id === action.payload.blog._id
      );
      if (updatedBlogIndex !== -1) {
        state.blogs[updatedBlogIndex] = action.payload.blog;
      }

      if (state.blog && state.blog._id === action.payload.blog._id) {
        state.blog = action.payload.blog;
      }

      const adminBlogIndex = state.adminBlogs.findIndex(
        (blog) => blog._id === action.payload.blog._id
      );
      if (adminBlogIndex !== -1) {
        state.adminBlogs[adminBlogIndex] = action.payload.blog;
      }
    },
    updateBlogFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteBlogRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteBlogSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;

      state.blogs = state.blogs.filter(
        (blog) => blog._id !== action.payload.blogId
      );

      state.adminBlogs = state.adminBlogs.filter(
        (blog) => blog._id !== action.payload.blogId
      );

      if (state.blog && state.blog._id === action.payload.blogId) {
        state.blog = null;
      }
    },
    deleteBlogFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    getAdminBlogsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAdminBlogsSuccess(state, action) {
      state.loading = false;
      state.adminBlogs = action.payload.blogs;
      state.adminPagination = action.payload.pagination;
      state.error = null;
    },
    getAdminBlogsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.adminBlogs = [];
    },

    getBlogStatsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getBlogStatsSuccess(state, action) {
      state.loading = false;
      state.blogStats = action.payload.stats;
      state.error = null;
    },
    getBlogStatsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.blogStats = null;
    },

    clearCurrentBlog(state) {
      state.blog = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },

    clearMessage(state) {
      state.message = null;
    },

    resetBlogState(state) {
      return initialState;
    },
  },
});

export const getAllBlogs =
  (params = {}) =>
  async (dispatch) => {
    dispatch(blogSlice.actions.getAllBlogsRequest());
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.search) queryParams.append("search", params.search);
      if (params.tags) queryParams.append("tags", params.tags);
      if (params.status) queryParams.append("status", params.status);

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/blog?${queryParams.toString()}`,
        {
          withCredentials: true,
        }
      );
      dispatch(blogSlice.actions.getAllBlogsSuccess(response.data));
      dispatch(blogSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        blogSlice.actions.getAllBlogsFailed(
          error.response?.data?.message || error.message
        )
      );
    }
  };

export const getBlogById = (id) => async (dispatch) => {
  dispatch(blogSlice.actions.getBlogByIdRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(blogSlice.actions.getBlogByIdSuccess(response.data));
    dispatch(blogSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      blogSlice.actions.getBlogByIdFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  dispatch(blogSlice.actions.createBlogRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
      blogData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(blogSlice.actions.createBlogSuccess(response.data));
    dispatch(blogSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      blogSlice.actions.createBlogFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const updateBlog = (id, blogData) => async (dispatch) => {
  dispatch(blogSlice.actions.updateBlogRequest());
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
      blogData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(
      blogSlice.actions.updateBlogSuccess({
        ...response.data,
        blogId: id,
      })
    );
    dispatch(blogSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      blogSlice.actions.updateBlogFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  dispatch(blogSlice.actions.deleteBlogRequest());
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      blogSlice.actions.deleteBlogSuccess({
        ...response.data,
        blogId: id,
      })
    );
    dispatch(blogSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      blogSlice.actions.deleteBlogFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const getAdminBlogs =
  (params = {}) =>
  async (dispatch) => {
    dispatch(blogSlice.actions.getAdminBlogsRequest());
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.status) queryParams.append("status", params.status);

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/blog/admin/blogs?${queryParams.toString()}`,
        {
          withCredentials: true,
        }
      );
      dispatch(blogSlice.actions.getAdminBlogsSuccess(response.data));
      dispatch(blogSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        blogSlice.actions.getAdminBlogsFailed(
          error.response?.data?.message || error.message
        )
      );
    }
  };

export const getBlogStats = () => async (dispatch) => {
  dispatch(blogSlice.actions.getBlogStatsRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/admin/stats`,
      {
        withCredentials: true,
      }
    );
    dispatch(blogSlice.actions.getBlogStatsSuccess(response.data));
    dispatch(blogSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      blogSlice.actions.getBlogStatsFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const clearCurrentBlog = () => (dispatch) => {
  dispatch(blogSlice.actions.clearCurrentBlog());
};

export const clearAllBlogErrors = () => (dispatch) => {
  dispatch(blogSlice.actions.clearAllErrors());
};

export const clearBlogMessage = () => (dispatch) => {
  dispatch(blogSlice.actions.clearMessage());
};

export const resetBlogState = () => (dispatch) => {
  dispatch(blogSlice.actions.resetBlogState());
};

export default blogSlice.reducer;
