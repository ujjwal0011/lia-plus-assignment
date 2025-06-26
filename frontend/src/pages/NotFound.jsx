import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Home, FileX } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
          <div className="mx-auto h-20 w-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-6">
            <FileX className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          </div>

          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              The page you're looking for doesn't exist.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Try searching for what you need
              </span>
            </div>
            <div className="flex space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span>• Blogs</span>
              <span>• Profile</span>
              <span>• Admin Dashboard</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </button>

            <button
              onClick={() => navigate("/blogs")}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse All Blogs
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => navigate("/")}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/blogs")}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                All Blogs
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Error Code: 404 - Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
