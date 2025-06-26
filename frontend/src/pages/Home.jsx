import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  BookOpen,
  Users,
  Shield,
  Sparkles,
  TrendingUp,
  Clock,
  User,
  Zap,
  Globe,
  Star,
  Rocket,
} from "lucide-react";
import { cn } from "../lib/utils";

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    totalViews: 0,
  });

  useEffect(() => {
    setFeaturedBlogs([
      {
        id: 1,
        title: "Getting Started with Role-Based Access Control",
        excerpt:
          "Learn the fundamentals of implementing RBAC in modern web applications...",
        author: "John Doe",
        publishedAt: "2024-01-15",
        readTime: "5 min read",
        category: "Security",
        views: 1250,
      },
      {
        id: 2,
        title: "Advanced Authentication Patterns",
        excerpt:
          "Explore sophisticated authentication strategies for enterprise applications...",
        author: "Jane Smith",
        publishedAt: "2024-01-12",
        readTime: "8 min read",
        category: "Development",
        views: 980,
      },
      {
        id: 3,
        title: "Building Secure APIs with Node.js",
        excerpt:
          "Best practices for creating robust and secure backend services...",
        author: "Mike Johnson",
        publishedAt: "2024-01-10",
        readTime: "12 min read",
        category: "Backend",
        views: 1500,
      },
    ]);

    setStats({
      totalBlogs: 156,
      totalUsers: 2340,
      totalViews: 45600,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-black dark:via-purple-950/20 dark:to-black overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "animate-pulse"
        )}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-20 w-20 h-20 bg-gradient-to-r from-pink-400/35 to-purple-500/35 rounded-full blur-lg animate-pulse delay-500" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-indigo-400/25 to-purple-400/25 rounded-full blur-xl animate-pulse delay-1500" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200/40 dark:bg-purple-500/20 rounded-full blur-xl animate-bounce" />
            <div className="absolute top-32 right-20 w-16 h-16 bg-purple-300/50 dark:bg-purple-400/30 rounded-full blur-lg animate-bounce delay-1000" />
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-100/60 dark:bg-purple-600/15 rounded-full blur-2xl animate-bounce delay-2000" />

            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 mb-8 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/30 rounded-full backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-default">
                <Shield className="w-4 h-4 mr-2 animate-pulse" />
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Secure • Role-Based • Modern
                <Zap className="w-4 h-4 ml-2 animate-pulse" />
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl mb-6">
                <span className="block animate-fade-in">Unleash Your</span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient-x bg-300% animate-pulse">
                  Creative Power
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 text-gray-700 dark:text-gray-300 animate-fade-in-delayed">
                  with{" "}
                  <span className="font-extrabold bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-400 dark:to-purple-500 bg-clip-text text-transparent">
                    Lexxo
                  </span>
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300 animate-fade-in-delayed">
                🚀 Transform ideas into impact with our revolutionary content
                platform.
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {" "}
                  Where creativity meets security
                </span>{" "}
                - experience next-generation Role-Based Access Control designed
                for visionaries, creators, and innovators.
              </p>

              <div className="mt-12 flex items-center justify-center gap-x-6">
                {isAuthenticated ? (
                  <Link
                    to="/blogs"
                    className="group relative inline-flex items-center px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 rounded-xl shadow-2xl hover:shadow-purple-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  >
                    <Rocket className="mr-3 w-5 h-5 animate-bounce" />
                    Explore Blogs
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="group relative inline-flex items-center px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 rounded-xl shadow-2xl hover:shadow-purple-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    >
                      <Star className="mr-3 w-5 h-5 animate-spin" />
                      Start Your Journey
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </Link>
                    <Link
                      to="/login"
                      className="group text-base font-semibold leading-6 text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 transition-all duration-300 hover:scale-105"
                    >
                      Sign In
                      <span
                        aria-hidden="true"
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block"
                      >
                        →
                      </span>
                    </Link>
                  </>
                )}
              </div>

              <div className="mt-16 flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-purple-500" />
                  Global Platform
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  Enterprise Security
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                  Lightning Fast
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="group text-center p-8 bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-xl dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                {stats.totalBlogs.toLocaleString()}+
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-300 font-medium">
                Published Articles
              </div>
            </div>
            <div className="group text-center p-8 bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-xl dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                {stats.totalUsers.toLocaleString()}+
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-300 font-medium">
                Active Creators
              </div>
            </div>
            <div className="group text-center p-8 bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-xl dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                {stats.totalViews.toLocaleString()}+
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-300 font-medium">
                Monthly Reads
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Trending Stories
              </span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover cutting-edge insights from our community of tech
              innovators and industry leaders
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs.map((blog, index) => (
              <article
                key={blog.id}
                className="group relative bg-white/90 dark:bg-black/50 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl p-8 shadow-xl dark:shadow-none hover:border-purple-300 dark:hover:border-purple-400/40 hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-none transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center px-4 py-2 text-xs font-bold text-purple-800 dark:text-purple-200 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-full border border-purple-300 dark:border-purple-500/30">
                    {blog.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/40 px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3 mr-1" />
                    {blog.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                  {blog.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {blog.author}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {blog.publishedAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/40 px-3 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {blog.views.toLocaleString()}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/blogs"
              className="group inline-flex items-center px-8 py-4 text-base font-semibold text-purple-600 dark:text-purple-300 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore All Stories
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Why Creators Choose Us
              </span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge technology and designed for the future of
              content creation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group text-center p-8 bg-gradient-to-br from-purple-50 via-white to-purple-100/50 dark:from-purple-900/20 dark:via-black/40 dark:to-purple-800/10 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-xl dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 rounded-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 transition-colors">
                Enterprise Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Military-grade RBAC system with advanced encryption, ensuring
                your content and data remain protected at all times
              </p>
            </div>

            <div className="group text-center p-8 bg-gradient-to-br from-purple-50 via-white to-purple-100/50 dark:from-purple-900/20 dark:via-black/40 dark:to-purple-800/10 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-xl dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 rounded-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Sparkles className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 transition-colors">
                Stunning Interface
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Award-winning design with seamless dark/light mode, animations,
                and responsive layouts that adapt to any device
              </p>
            </div>

            <div className="group text-center p-8 bg-gradient-to-br from-purple-50 via-white to-purple-100/50 dark:from-purple-900/20 dark:via-black/40 dark:to-purple-800/10 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 rounded-2xl shadow-xl dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-600/20 dark:to-purple-500/20 rounded-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Zap className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 transition-colors">
                Lightning Performance
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Built with modern web technologies, optimized for speed and
                scalability to handle millions of users effortlessly
              </p>
            </div>
          </div>
        </div>
      </section>

      {!isAuthenticated && (
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <div className="relative bg-gradient-to-r from-purple-100 via-white to-purple-100 dark:from-purple-900/40 dark:via-black/60 dark:to-purple-900/40 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-3xl p-12 lg:p-16 shadow-2xl dark:shadow-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-3xl"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center px-6 py-3 mb-8 text-sm font-bold text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/30 rounded-full backdrop-blur-sm">
                  <Star className="w-4 h-4 mr-2 animate-spin" />
                  Join 10,000+ Happy Creators
                  <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
                </div>

                <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-400 bg-clip-text text-transparent">
                    Transform
                  </span>{" "}
                  Your Ideas?
                </h2>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of creators, writers, and innovators who trust
                  Lexxo to bring their vision to life.
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {" "}
                    Start your journey today
                  </span>{" "}
                  and discover what's possible.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 rounded-xl shadow-2xl hover:shadow-purple-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  >
                    <Rocket className="mr-3 w-6 h-6 animate-bounce" />
                    Create Your Account
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    to="/blogs"
                    className="group inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-purple-600 dark:text-purple-300 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <BookOpen className="mr-3 w-6 h-6" />
                    Explore Content
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center bg-white/60 dark:bg-black/20 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-green-500" />
                    SSL Secured
                  </div>
                  <div className="flex items-center bg-white/60 dark:bg-black/20 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    2M+ Users
                  </div>
                  <div className="flex items-center bg-white/60 dark:bg-black/20 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    5-Star Rated
                  </div>
                  <div className="flex items-center bg-white/60 dark:bg-black/20 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600">
                    <Zap className="w-4 h-4 mr-2 text-purple-500" />
                    99.9% Uptime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
