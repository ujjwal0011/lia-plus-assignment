import { Blog } from "../../models/blog.model.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/error.js";

export const getAllBlogs = catchAsyncErrors(async (req, res, next) => {
  const { page = 1, limit = 10, status } = req.query;
  const query = {};

  if (req.user?.role !== "admin") {
    query.status = "published";
  } else if (status) {
    query.status = status;
  }

  try {
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("author", "name email");

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalBlogs: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    return next(new ErrorHandler("Error fetching blogs", 500));
  }
});

export const getBlogById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return next(new ErrorHandler("Blog post not found", 404));
  }

  if (req.user?.role !== "admin" && blog.status !== "published") {
    return next(new ErrorHandler("Blog post not found", 404));
  }

  res.json({
    success: true,
    blog,
  });
});
