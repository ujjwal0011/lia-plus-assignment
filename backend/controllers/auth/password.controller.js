import { User } from "../../models/user.model.js";
import { PasswordResetRequest } from "../../models/passwordResetRequest.model.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/error.js";
import { sendToken } from "../../utils/jwt.token.js";
import { emailContent } from "../../utils/otp.message.js";
import { sendEmail } from "../../utils/send.email.js";
import { generateOTP } from "../../utils/generateOtp.js";

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please provide old and new password", 400));
    }

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (newPassword.length < 8 || newPassword.length > 32) {
      return next(
        new ErrorHandler("Password must be between 8 and 32 characters", 400)
      );
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res, "Password updated successfully");
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Please provide email address", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found with this email", 404));
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await PasswordResetRequest.findOneAndDelete({ userId: user._id });

    await PasswordResetRequest.create({
      userId: user._id,
      otp,
      otpExpires,
    });

    const subject = "Verify Your Email";
    const content = emailContent(otp);
    await sendEmail({
      email,
      subject,
      message: content,
    });

    res.status(200).json({
      success: true,
      message: `OTP sent to ${email}`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { otp, newPassword, confirmPassword } = req.body;

    if (!otp || !newPassword || !confirmPassword) {
      return next(new ErrorHandler("Please Provide complete details", 400));
    }

    if (newPassword !== confirmPassword) {
      return next(
        new ErrorHandler("New password and confirm password do not match", 400)
      );
    }

    const otpDetails = await PasswordResetRequest.findOne({ otp });

    if (!otpDetails) {
      return next(new ErrorHandler("Please enter correct otp", 400));
    }

    if (otpDetails.otpExpires < Date.now()) {
      return next(new ErrorHandler("OTP has expired", 400));
    }

    const user = await User.findById(otpDetails.userId).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPassworSame = await user.comparePassword(newPassword);

    if (isPassworSame) {
      return next(new ErrorHandler("Password is already same", 400));
    }

    user.password = newPassword;
    await user.save();

    await PasswordResetRequest.deleteOne({ otp });

    sendToken(user, 200, res, "Password reset successful");
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
