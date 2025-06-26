import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Clock,
  Eye,
} from "lucide-react";
import { getAllBlogs, clearAllBlogErrors } from "../../store/slice/blogSlice";
import { cn } from "../../lib/utils";

const AllBlogs = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { blogs, loading, error, pagination } = useSelector(
    (state) => state.blog
  );

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const fetchBlogs = useCallback(
    (params) => {
      dispatch(getAllBlogs(params));
    },
    [dispatch]
  );

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 6,
    };

    fetchBlogs(params);

    const urlParams = new URLSearchParams();
    if (currentPage > 1) {
      urlParams.set("page", currentPage);
    }
    setSearchParams(urlParams);
  }, [currentPage, fetchBlogs, setSearchParams]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearAllBlogErrors());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + "...";
  };

  if (loading && blogs.length === 0) {
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-purple-100/50 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 dark:from-purple-400 dark:via-purple-300 dark:to-purple-500 bg-clip-text text-transparent">
              All Blog Posts
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover insightful articles, tutorials, and stories from our
            community of experts
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-8 backdrop-blur-sm">
            <p className="text-red-700 dark:text-red-400 font-medium">
              {error}
            </p>
          </div>
        )}

        {blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-lg dark:shadow-none overflow-hidden hover:border-purple-300 dark:hover:border-purple-400/40 hover:shadow-xl dark:hover:shadow-none transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-purple-600 dark:text-purple-300 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(blog.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="text-xs">5 min read</span>
                      </div>
                    </div>

                    {blog.author && (
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-600/20 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {blog.author.name || "Anonymous"}
                        </span>
                      </div>
                    )}

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {truncateContent(blog.content)}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full border border-purple-200 dark:border-purple-500/30"
                          >
                            #{tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs rounded-full border border-purple-200 dark:border-purple-500/20">
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {isAuthenticated && (
                      <Link
                        to={`/blog/${blog._id}`}
                        className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold group-hover:translate-x-1 transition-all duration-200"
                      >
                        Read Full Article
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage || loading}
                  className="flex items-center px-6 py-3 text-sm font-medium text-purple-600 dark:text-purple-300 bg-white/80 dark:bg-black/40 border border-purple-200 dark:border-purple-500/30 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transition-all duration-200 shadow-lg dark:shadow-none"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                <div className="flex space-x-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  )
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === pagination.totalPages ||
                        Math.abs(page - currentPage) <= 2
                    )
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-4 py-3 text-sm text-purple-400 dark:text-purple-500">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          disabled={loading}
                          className={`px-4 py-3 text-sm font-medium rounded-xl disabled:opacity-50 transition-all duration-200 ${
                            currentPage === page
                              ? "text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg transform scale-105"
                              : "text-purple-600 dark:text-purple-300 bg-white/80 dark:bg-black/40 border border-purple-200 dark:border-purple-500/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-400/50 backdrop-blur-sm shadow-lg dark:shadow-none"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNextPage || loading}
                  className="flex items-center px-6 py-3 text-sm font-medium text-purple-600 dark:text-purple-300 bg-white/80 dark:bg-black/40 border border-purple-200 dark:border-purple-500/30 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transition-all duration-200 shadow-lg dark:shadow-none"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}
          </>
        ) : (
          !loading && (
            <div className="text-center py-16">
              <div className="bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-lg dark:shadow-none p-12 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No blogs found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                  There are no blog posts available at the moment. Check back
                  soon for new content!
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
