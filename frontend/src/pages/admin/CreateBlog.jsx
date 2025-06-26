import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Eye, Tag, X, FileText } from "lucide-react";
import {
  createBlog,
  clearBlogMessage,
  clearAllBlogErrors,
} from "../../store/slice/blogSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    status: "published",
  });
  const [tagInput, setTagInput] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (message && message.includes("created")) {
      setTimeout(() => {
        navigate("/admin/manage-blogs");
      }, 2000);
    }
  }, [message, navigate]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearAllBlogErrors());
      }, 5000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearBlogMessage());
      }, 5000);
    }
  }, [message, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    dispatch(
      createBlog({
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags,
        status: formData.status,
      })
    );
  };

  const handleSaveAsDraft = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    dispatch(
      createBlog({
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags,
        status: "draft",
      })
    );
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

        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-500/20 dark:to-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Create New Blog Post
                </h1>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-50/90 dark:hover:bg-gray-800/90"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
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

          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50 shadow-xl">
            {!isPreview ? (
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Title *
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your blog title..."
                      className="text-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tags
                    </label>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200/80 dark:hover:bg-blue-900/50 transition-colors duration-200"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 h-auto p-0 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Input
                      placeholder="Add tags (press Enter to add)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="content"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Content *
                    </label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={18}
                      placeholder="Write your blog content here..."
                      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-blue-500 dark:focus:border-blue-400 resize-vertical"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                    >
                      <Link to="/admin">Cancel</Link>
                    </Button>

                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSaveAsDraft}
                        disabled={
                          loading ||
                          !formData.title.trim() ||
                          !formData.content.trim()
                        }
                        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                      >
                        Save as Draft
                      </Button>

                      <Button
                        type="submit"
                        disabled={
                          loading ||
                          !formData.title.trim() ||
                          !formData.content.trim()
                        }
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        {formData.status === "published"
                          ? "Publish Blog"
                          : "Save Blog"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            ) : (
              <CardContent className="p-6">
                <div className="border-b border-gray-200/50 dark:border-gray-700/50 pb-6 mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {formData.title || "Blog Title"}
                  </h1>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Badge
                    variant={
                      formData.status === "published" ? "default" : "secondary"
                    }
                    className={
                      formData.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }
                  >
                    {formData.status.charAt(0).toUpperCase() +
                      formData.status.slice(1)}
                  </Badge>
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {formData.content ||
                      "Your blog content will appear here..."}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
