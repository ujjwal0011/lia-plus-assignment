import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the blog."],
      minLength: [3, "Title must contain at least 3 characters."],
      maxLength: [200, "Title cannot exceed 100 characters."],
    },
    content: {
      type: String,
      required: [true, "Please provide content for the blog."],
      minLength: [10, "Content must contain at least 10 characters."],
      maxlength: [10000, "Content cannot exceed 10000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name email",
  });
  next();
});

export const Blog = mongoose.model("Blog", blogSchema);
