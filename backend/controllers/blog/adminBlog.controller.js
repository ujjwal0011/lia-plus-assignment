import { Blog } from "../../models/blog.model.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/error.js";

export const createBlog = catchAsyncErrors(async (req, res, next) => {
  const { title, content, tags, status } = req.body;

  if (!title || !content) {
    return next(new ErrorHandler("Title and content are required", 400));
  }

  if (req.user.role !== "admin" && !req.user) {
    return next(new ErrorHandler("Not authorized to create a blog post", 403));
  }

  const blog = await Blog.create({
    title,
    content,
    author: req.user._id,
    tags: tags || [],
    status: status || "published",
  });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    blog,
  });
});

export const updateBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, tags, status } = req.body;

  let blog = await Blog.findById(id);

  if (!blog) {
    return next(new ErrorHandler("Blog post not found", 404));
  }

  if (blog.author._id.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("Not authorized to update this blog post", 403)
    );
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.tags = tags !== undefined ? tags : blog.tags;
  blog.status = status || blog.status;

  await blog.save();

  res.json({
    success: true,
    message: "Blog updated successfully",
    blog,
  });
});

export const deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (blog.author._id.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("Not authorized to delete this blog post", 403)
    );
  }

  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  await Blog.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Blog deleted successfully",
  });
});

export const getAdminBlogs = catchAsyncErrors(async (req, res, next) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = { author: req.user._id };

  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Not authorized to view admin blogs", 403));
  }

  if (status) query.status = status;

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Blog.countDocuments(query);

  res.status(200).json({
    success: true,
    blogs,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalBlogs: total,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  });
});

export const getBlogStats = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin can access blog statistics", 403));
  }

  const authorQuery = { author: req.user._id };

  const totalBlogs = await Blog.countDocuments(authorQuery);

  const publishedBlogs = await Blog.countDocuments({
    ...authorQuery,
    status: "published",
  });

  const draftBlogs = await Blog.countDocuments({
    ...authorQuery,
    status: "draft",
  });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentBlogs = await Blog.countDocuments({
    ...authorQuery,
    createdAt: { $gte: thirtyDaysAgo },
  });

  const topTags = await Blog.aggregate([
    { $match: authorQuery },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      recentBlogs,
      topTags,
    },
  });
});
