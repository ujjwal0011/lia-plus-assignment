import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogStats } from "../../store/slice/blogSlice";
import {
  ArrowLeft,
  FileText,
  BarChart3,
  TrendingUp,
  Eye,
  Edit,
  Tag,
  Calendar,
  PieChart,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BlogStats = () => {
  const dispatch = useDispatch();
  const { blogStats, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogStats());
  }, [dispatch]);

  const StatCard = ({ title, value, icon: Icon, gradient, description }) => (
    <div className="group relative overflow-hidden">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300`}
      ></div>
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-2">
          <div
            className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {loading ? (
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-6 w-12 rounded"></div>
              ) : (
                value || 0
              )}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  const getStatusPercentage = (count, total) => {
    if (!total || total === 0) return 0;
    return ((count / total) * 100).toFixed(1);
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

        <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-green-500/10 to-cyan-500/10 dark:from-green-500/20 dark:to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-500/15 dark:to-pink-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <Link to="/admin">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Blog Statistics
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Detailed analytics and insights
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <StatCard
              title="Total Blogs"
              value={blogStats?.totalBlogs}
              icon={FileText}
              gradient="from-blue-500 to-blue-600"
              description="All blogs created"
            />
            <StatCard
              title="Published"
              value={blogStats?.publishedBlogs}
              icon={Eye}
              gradient="from-green-500 to-green-600"
              description="Live and visible"
            />
            <StatCard
              title="Drafts"
              value={blogStats?.draftBlogs}
              icon={Edit}
              gradient="from-yellow-500 to-orange-500"
              description="Work in progress"
            />
            <StatCard
              title="Recent (30d)"
              value={blogStats?.recentBlogs}
              icon={TrendingUp}
              gradient="from-purple-500 to-pink-500"
              description="This month"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <PieChart className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Status Distribution
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Published
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {blogStats?.publishedBlogs || 0}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        (
                        {getStatusPercentage(
                          blogStats?.publishedBlogs,
                          blogStats?.totalBlogs
                        )}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Drafts
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {blogStats?.draftBlogs || 0}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        (
                        {getStatusPercentage(
                          blogStats?.draftBlogs,
                          blogStats?.totalBlogs
                        )}
                        %)
                      </span>
                    </div>
                  </div>
                </div>
                {blogStats?.totalBlogs > 0 && (
                  <div className="mt-3">
                    <Progress
                      value={Number.parseFloat(
                        getStatusPercentage(
                          blogStats?.publishedBlogs,
                          blogStats?.totalBlogs
                        )
                      )}
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Activity Summary
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-purple-50/80 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        This Month
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {blogStats?.recentBlogs || 0} blogs
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50/80 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Avg Tags
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {blogStats?.topTags && blogStats.topTags.length > 0
                        ? (
                            blogStats.topTags.reduce(
                              (sum, tag) => sum + tag.count,
                              0
                            ) / blogStats.totalBlogs
                          ).toFixed(1)
                        : 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {blogStats?.topTags && blogStats.topTags.length > 0 && (
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Most Used Tags
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {blogStats.topTags.slice(0, 10).map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-200/30 dark:border-gray-700/30"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                          #{tag._id}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {tag.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {!loading && (!blogStats || blogStats.totalBlogs === 0) && (
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No blogs yet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Start creating blog posts to see your statistics here.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link to="/admin/create-blog">Create Your First Blog</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogStats;
