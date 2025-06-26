import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAdminBlogs,
  deleteBlog,
  clearBlogMessage,
  clearAllBlogErrors,
} from "../../store/slice/blogSlice";
import {
  Edit,
  Trash2,
  Eye,
  Plus,
  Filter,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ManageBlogs = () => {
  const dispatch = useDispatch();
  const { adminBlogs, adminPagination, loading, message, error } = useSelector(
    (state) => state.blog
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    dispatch(
      getAdminBlogs({
        page: currentPage,
        limit: 10,
        status: statusFilter,
      })
    );
  }, [dispatch, currentPage, statusFilter]);

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(clearBlogMessage()), 3000);
    }
    if (error) {
      setTimeout(() => dispatch(clearAllBlogErrors()), 3000);
    }
  }, [message, error, dispatch]);

  const handleDelete = async (blogId) => {
    dispatch(deleteBlog(blogId));
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-black">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div
          className="absolute inset-0 opacity-0 dark:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-gradient-to-r from-green-500/5 to-blue-500/5 dark:from-green-500/15 dark:to-blue-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-500/30 dark:to-pink-500/30 rounded-xl">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
                  Manage Blogs
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Edit, delete, and manage your blog posts
                </p>
              </div>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link to="/admin/create-blog">
                <Plus className="h-4 w-4 mr-2" />
                Create New Blog
              </Link>
            </Button>
          </div>

          {message && (
            <Alert className="mb-4 bg-green-50/90 dark:bg-green-900/20 backdrop-blur-sm border-green-200/50 dark:border-green-800/50">
              <AlertDescription className="text-green-700 dark:text-green-400">
                {message}
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="mb-4 bg-red-50/90 dark:bg-red-900/20 backdrop-blur-sm border-red-200/50 dark:border-red-800/50">
              <AlertDescription className="text-red-700 dark:text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Card className="mb-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter by status:
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant={statusFilter === "" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusFilter("")}
                    className={
                      statusFilter === ""
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    }
                  >
                    All
                  </Button>
                  <Button
                    variant={
                      statusFilter === "published" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleStatusFilter("published")}
                    className={
                      statusFilter === "published"
                        ? "bg-gradient-to-r from-green-600 to-green-700"
                        : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    }
                  >
                    Published
                  </Button>
                  <Button
                    variant={statusFilter === "draft" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusFilter("draft")}
                    className={
                      statusFilter === "draft"
                        ? "bg-gradient-to-r from-yellow-600 to-orange-600"
                        : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    }
                  >
                    Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Loading blogs...
                </p>
              </CardContent>
            </Card>
          ) : adminBlogs.length === 0 ? (
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No blogs found.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 mb-6">
              {adminBlogs.map((blog) => (
                <Card
                  key={blog._id}
                  className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                              {blog.title}
                            </h3>
                            <div className="flex items-center space-x-4 mb-3">
                              <Badge className={getStatusBadge(blog.status)}>
                                {blog.status}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(blog.createdAt)}
                              </div>
                            </div>
                            {blog.tags && blog.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {blog.tags.slice(0, 3).map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs"
                                  >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                                {blog.tags.length > 3 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-gray-100/80 dark:bg-gray-800/80"
                                  >
                                    +{blog.tags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="hover:bg-blue-100/80 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          <Link to={`/blog/${blog._id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="hover:bg-green-100/80 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300"
                        >
                          <Link to={`/admin/edit-blog/${blog._id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setBlogToDelete(blog);
                            setShowDeleteModal(true);
                          }}
                          className="hover:bg-red-100/80 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {adminPagination.totalPages > 1 && (
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing {(adminPagination.currentPage - 1) * 10 + 1} to{" "}
                    {Math.min(
                      adminPagination.currentPage * 10,
                      adminPagination.totalBlogs
                    )}{" "}
                    of {adminPagination.totalBlogs} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handlePageChange(adminPagination.currentPage - 1)
                      }
                      disabled={!adminPagination.hasPrevPage}
                      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm text-gray-700 dark:text-gray-300 px-3">
                      Page {adminPagination.currentPage} of{" "}
                      {adminPagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handlePageChange(adminPagination.currentPage + 1)
                      }
                      disabled={!adminPagination.hasNextPage}
                      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">
                  Delete Blog Post
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete "{blogToDelete?.title}"? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setBlogToDelete(null);
                  }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(blogToDelete._id)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
