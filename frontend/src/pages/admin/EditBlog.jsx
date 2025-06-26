import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getBlogById,
  updateBlog,
  clearBlogMessage,
  clearAllBlogErrors,
} from "../../store/slice/blogSlice";
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Tag,
  Settings,
  AlertCircle,
  CheckCircle,
  Loader2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const EditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog, loading, error, message } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    status: "published",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getBlogById(id));
    }

    return () => {
      dispatch(clearBlogMessage());
      dispatch(clearAllBlogErrors());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
        status: blog.status || "published",
      });
    }
  }, [blog]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearBlogMessage());
        navigate("/admin/manage-blogs");
      }, 2000);
    }
  }, [message, dispatch, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.trim().length < 50) {
      newErrors.content = "Content must be at least 50 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const blogData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      tags: tagsArray,
      status: formData.status,
    };

    try {
      await dispatch(updateBlog(id, blogData));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    window.open(`/blog/${id}`, "_blank");
  };

  if (loading && !blog) {
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
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="text-gray-700 dark:text-gray-300">
              Loading blog...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!blog && !loading) {
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
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Blog Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The blog post you're looking for doesn't exist or you don't have
              permission to edit it.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-700"
            >
              <Link to="/admin/manage-blogs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Manage Blogs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <Link to="/admin/manage-blogs">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Manage Blogs
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 dark:from-orange-500/30 dark:to-red-500/30 rounded-lg">
                  <Edit className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 dark:from-white dark:via-orange-200 dark:to-red-200 bg-clip-text text-transparent">
                    Edit Blog Post
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Update content and settings
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>

          {message && (
            <Alert className="mb-4 bg-green-50/90 dark:bg-green-900/20 backdrop-blur-sm border-green-200/50 dark:border-green-800/50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-700 dark:text-green-400">
                {message}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-4 bg-red-50/90 dark:bg-red-900/20 backdrop-blur-sm border-red-200/50 dark:border-red-800/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-700 dark:text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50 shadow-xl">
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FileText className="h-4 w-4 mr-2" />
                    Title *
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog title..."
                    className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-blue-500 dark:focus:border-blue-400 ${
                      errors.title ? "border-red-500 dark:border-red-400" : ""
                    }`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <FileText className="h-4 w-4 mr-2" />
                      Content *
                    </label>
                    <Badge variant="outline" className="text-xs">
                      {formData.content.length} chars
                    </Badge>
                  </div>
                  <Textarea
                    name="content"
                    rows={12}
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                    className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-blue-500 dark:focus:border-blue-400 resize-vertical ${
                      errors.content ? "border-red-500 dark:border-red-400" : ""
                    }`}
                  />
                  {errors.content && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {errors.content}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Tag className="h-4 w-4 mr-2" />
                        Tags
                      </label>
                      <Badge variant="outline" className="text-xs">
                        {formData.tags
                          ? formData.tags.split(",").filter((tag) => tag.trim())
                              .length
                          : 0}{" "}
                        tags
                      </Badge>
                    </div>
                    <Input
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="technology, web development, react"
                      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Settings className="h-4 w-4 mr-2" />
                      Status
                    </label>
                    <Select
                      value={formData.status}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50">
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formData.status === "published"
                        ? "Visible to all users"
                        : "Saved as draft, not visible to users"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <Button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Update Blog
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
