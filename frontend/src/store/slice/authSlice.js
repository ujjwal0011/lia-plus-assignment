import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isAuthenticated: false,
  isVerified: false,
  user: {},
  error: null,
  message: null,
  otpSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
      state.otpSent = false;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = null;
      state.message = action.payload.message;
      state.otpSent = true;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
      state.otpSent = false;
    },

    verifyEmailRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    verifyEmailSuccess(state, action) {
      state.loading = false;
      state.isVerified = true;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null;
      state.otpSent = false;
    },
    verifyEmailFailed(state, action) {
      state.loading = false;
      state.isVerified = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    resendOtpRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.otpSent = false;
    },
    resendOtpSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.otpSent = true;
      state.error = null;
    },
    resendOtpFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.otpSent = false;
    },

    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.message = null;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isVerified = action.payload.user.isVerified;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
      state.isAuthenticated = false;
    },

    logoutRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.isVerified = false;
      state.user = {};
      state.message = action.payload.message;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },

    getCurrentUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getCurrentUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isVerified = action.payload.user.isVerified;
      state.user = action.payload.user;
      state.error = null;
    },
    getCurrentUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    updatePasswordRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    forgotPasswordRequest(state) {
      state.loading = true;
      state.message = null;
      state.otpSent = false;
      state.error = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.otpSent = true;
      state.error = null;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.otpSent = false;
      state.error = action.payload;
    },

    resetPasswordRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isVerified = action.payload.user.isVerified;
      state.error = null;
      state.otpSent = false;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllErrors(state) {
      state.error = null;
    },

    clearMessage(state) {
      state.message = null;
    },
  },
});

export const register = (userData) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
      userData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(authSlice.actions.registerSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.registerFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const verifyEmail = (verificationData) => async (dispatch) => {
  dispatch(authSlice.actions.verifyEmailRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verify-email`,
      verificationData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(authSlice.actions.verifyEmailSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.verifyEmailFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const resendVerificationOTP = (emailData) => async (dispatch) => {
  dispatch(authSlice.actions.resendOtpRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/resend-verification`,
      emailData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(authSlice.actions.resendOtpSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.resendOtpFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const login = (loginData) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
      loginData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(authSlice.actions.loginSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.loginFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`,
      {
        withCredentials: true,
      }
    );
    dispatch(authSlice.actions.logoutSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.logoutFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const getCurrentUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getCurrentUserRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/profile`,
      {
        withCredentials: true,
      }
    );
    dispatch(authSlice.actions.getCurrentUserSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.getCurrentUserFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const updatePassword = (passwordData) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/update-password`,
      passwordData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(authSlice.actions.updatePasswordSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.updatePasswordFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const forgotPassword = (emailData) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/forgot-password`,
      emailData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(authSlice.actions.forgotPasswordSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.forgotPasswordFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const resetPassword = (resetData) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/reset-password`,
      resetData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(authSlice.actions.resetPasswordSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      authSlice.actions.resetPasswordFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const clearAllAuthErrors = () => (dispatch) => {
  dispatch(authSlice.actions.clearAllErrors());
};

export const clearAuthMessage = () => (dispatch) => {
  dispatch(authSlice.actions.clearMessage());
};

export default authSlice.reducer;
