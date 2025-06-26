import { User } from "../../models/user.model.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/error.js";
import { emailContent } from "../../utils/otp.message.js";
import { sendEmail } from "../../utils/send.email.js";
import { generateOTP } from "../../utils/generateOtp.js";
import { sendToken } from "../../utils/jwt.token.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const userRole = role || "user";

    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
      otp,
      otpExpires,
    });

    const content = emailContent(otp);
    const subject = "Verify Your Email";
    await sendEmail({
      email: user.email,
      subject,
      message: content,
    });

    res.status(200).json({
      success: true,
      email: user.email,
      message: "Registration successful. Verification email sent.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const verifyEmail = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new ErrorHandler("Email and OTP are required", 400));
    }

    const user = await User.findOne({ email }).select("+otp +otpExpires");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (user.isVerified) {
      return next(new ErrorHandler("Email already verified", 400));
    }

    if (!user.otp || !user.otpExpires) {
      return next(new ErrorHandler("OTP expired or not generated", 400));
    }

    if (user.otp !== otp) {
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    if (user.otpExpires < new Date()) {
      return next(new ErrorHandler("OTP has expired", 400));
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    sendToken(user, 200, res, "Email verified successfully!");
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resendVerificationOTP = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return next(new ErrorHandler("Email is required", 400));
      }

      const user = await User.findOne({ email });
      if (!user) {
        return next(new ErrorHandler("User not found with this email", 404));
      }

      if (user.isVerified) {
        return next(new ErrorHandler("Email already verified", 400));
      }

      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();

      const subject = "Account Verification OTP";
      const content = emailContent(otp);
      await sendEmail({
        email,
        subject,
        message: content,
      });

      res.status(200).json({
        success: true,
        message: `New OTP sent to ${email}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
