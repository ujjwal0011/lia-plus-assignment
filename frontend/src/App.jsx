import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import { getCurrentUser } from "./store/slice/authSlice";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import BlogDetail from "./pages/blog/BlogDetail";
import AllBlogs from "./pages/blog/AllBlogs";

import Profile from "./pages/user/Profile";
import UpdatePassword from "./pages/user/UpdatePassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateBlog from "./pages/admin/CreateBlog";
import ManageBlogs from "./pages/admin/ManageBlogs";
import EditBlog from "./pages/admin/EditBlog";
import BlogStats from "./pages/admin/BlogStats";

import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blog/:id" element={<BlogDetail />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/create-blog"
              element={
                <AdminRoute>
                  <CreateBlog />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/manage-blogs"
              element={
                <AdminRoute>
                  <ManageBlogs />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/edit-blog/:id"
              element={
                <AdminRoute>
                  <EditBlog />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/stats"
              element={
                <AdminRoute>
                  <BlogStats />
                </AdminRoute>
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
