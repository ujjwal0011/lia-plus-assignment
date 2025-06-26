import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  Eye,
  Share2,
  BookOpen,
  Shield,
} from "lucide-react";
import {
  getBlogById,
  clearCurrentBlog,
  deleteBlog,
  clearAllBlogErrors,
  clearBlogMessage,
} from "../../store/slice/blogSlice";
import { cn } from "../../lib/utils";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, loading, error, message } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getBlogById(id));
    }

    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearAllBlogErrors());
      }, 5000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      if (message.includes("deleted")) {
        navigate("/blogs");
      }
      setTimeout(() => {
        dispatch(clearBlogMessage());
      }, 3000);
    }
  }, [message, dispatch, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      dispatch(deleteBlog(id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canModify = user && blog && blog.author && blog.author._id === user._id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-black dark:via-purple-950/20 dark:to-black py-8">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 dark:border-purple-400 absolute top-0 left-0"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-black dark:via-purple-950/20 dark:to-black py-8">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-sm shadow-lg dark:shadow-none">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">
              Error Loading Blog
            </h2>
            <p className="text-red-600 dark:text-red-300 mb-8 text-lg">
              {error}
            </p>
            <Link
              to="/blogs"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-black dark:via-purple-950/20 dark:to-black py-8">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl p-8 text-center shadow-lg dark:shadow-none">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link
              to="/blogs"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-black dark:via-purple-950/20 dark:to-black py-8">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/40 dark:bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {message && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-xl p-4 mb-6 backdrop-blur-sm shadow-lg dark:shadow-none">
            <p className="text-green-700 dark:text-green-400 font-medium">
              {message}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <Link
            to="/blogs"
            className="inline-flex items-center text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>

          {canModify && (
            <div className="flex space-x-3">
              <Link
                to={`/admin/edit-blog/${blog._id}`}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>

        <article className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-xl dark:shadow-none overflow-hidden">
          <div className="p-8 border-b border-purple-200 dark:border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-purple-600 dark:text-purple-300">
                <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(blog.createdAt)}
                </div>
                {blog.author && (
                  <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                    <User className="w-4 h-4 mr-2" />
                    {blog.author.name || "Anonymous"}
                  </div>
                )}
                {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                  <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-2" />
                    Updated {formatDate(blog.updatedAt)}
                  </div>
                )}
              </div>

              {blog.status && (
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    blog.status === "published"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-500/30"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/30"
                  }`}
                >
                  {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full border border-purple-200 dark:border-purple-500/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors cursor-pointer"
                  >
                    <Tag className="w-3 h-3 mr-2" />#{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-black/60 border-t border-purple-200 dark:border-purple-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-sm text-purple-600 dark:text-purple-300">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Published on {formatDate(blog.createdAt)}
                  {blog.author && (
                    <span> by {blog.author.name || "Anonymous"}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>
                    Reading time: ~{Math.ceil(blog.content.length / 200)} min
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  to="/blogs"
                  className="text-sm text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 transition-colors font-medium"
                >
                  View All Blogs
                </Link>
                {user && user.role === "admin" && (
                  <Link
                    to="/admin/manage-blogs"
                    className="text-sm text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 transition-colors font-medium"
                  >
                    Manage Blogs
                  </Link>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
