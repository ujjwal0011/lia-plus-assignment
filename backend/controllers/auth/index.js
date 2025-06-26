export {
  register,
  verifyEmail,
  resendVerificationOTP,
} from "./registration.controller.js";

export { login, logout, getCurrentUser } from "./authentication.controller.js";

export {
  updatePassword,
  forgotPassword,
  resetPassword,
} from "./password.controller.js";
