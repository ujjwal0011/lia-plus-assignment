import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogStats } from "../../store/slice/blogSlice";
import {
  PlusCircle,
  FileText,
  BarChart3,
  TrendingUp,
  Eye,
  Edit,
  Tag,
  Sparkles,
} from "lucide-react";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { blogStats, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogStats());
  }, [dispatch]);

  const quickActions = [
    {
      title: "Create New Blog",
      description: "Write and publish a new blog post",
      icon: PlusCircle,
      link: "/admin/create-blog",
      color: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      shadowColor: "shadow-blue-500/25",
    },
    {
      title: "Manage Blogs",
      description: "Edit, delete, and manage existing blogs",
      icon: FileText,
      link: "/admin/manage-blogs",
      color:
        "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      shadowColor: "shadow-green-500/25",
    },
    {
      title: "View Statistics",
      description: "Analyze blog performance and engagement",
      icon: BarChart3,
      link: "/admin/stats",
      color:
        "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      shadowColor: "shadow-purple-500/25",
    },
  ];

  const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <div className="group relative overflow-hidden">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300`}
      ></div>

      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {loading ? (
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-6 w-12 rounded"></div>
              ) : (
                value || 0
              )}
            </p>
          </div>
          <div
            className={`p-3 rounded-lg bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-500/15 dark:to-pink-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 rounded-xl">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Manage your blog platform and monitor performance
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Blogs"
              value={blogStats?.totalBlogs}
              icon={FileText}
              gradient="from-blue-500 to-blue-600"
            />
            <StatCard
              title="Published"
              value={blogStats?.publishedBlogs}
              icon={Eye}
              gradient="from-green-500 to-green-600"
            />
            <StatCard
              title="Drafts"
              value={blogStats?.draftBlogs}
              icon={Edit}
              gradient="from-yellow-500 to-orange-500"
            />
            <StatCard
              title="Recent (30d)"
              value={blogStats?.recentBlogs}
              icon={TrendingUp}
              gradient="from-purple-500 to-pink-500"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group relative overflow-hidden"
                >
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${action.color} rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300`}
                  ></div>

                  <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 p-5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {blogStats?.topTags && blogStats.topTags.length > 0 && (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-lg"></div>

              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-800/50 p-5">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg mr-3">
                    <Tag className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Top Tags
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {blogStats.topTags.slice(0, 10).map((tag, index) => (
                    <div
                      key={index}
                      className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-200/30 dark:border-gray-700/30"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          #{tag._id}
                        </span>
                        <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full font-medium">
                          {tag.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
