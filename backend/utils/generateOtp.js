export const generateOTP = () => {
  try {
    return Math.floor(100000 + Math.random() * 900000).toString();
  } catch (error) {
    throw new ErrorHandler("Failed to generate OTP", 500);
  }
};
