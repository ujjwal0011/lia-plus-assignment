import { User } from "../../models/user.model.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/error.js";
import { sendToken } from "../../utils/jwt.token.js";

export const login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    if (!user.isVerified) {
      return next(
        new ErrorHandler("Please verify your email before logging in", 401)
      );
    }

    sendToken(user, 200, res, "Login successful!");
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
      })
      .json({
        success: true,
        message: "Logged out successfully.",
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -otp -otpExpires"
    );
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
