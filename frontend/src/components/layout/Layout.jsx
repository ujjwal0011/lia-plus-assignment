"use client";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  LogOut,
  User,
  Home,
  PlusCircle,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    ...(isAuthenticated && user?.role === "admin"
      ? [
          { name: "Dashboard", href: "/admin", icon: Settings },
          { name: "Create Blog", href: "/admin/create-blog", icon: PlusCircle },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50/30 dark:from-black dark:via-gray-950 dark:to-purple-950/20">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-purple-500/20 bg-white/90 dark:bg-black/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-black/80">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-transparent to-purple-100/50 dark:from-purple-600/10 dark:via-transparent dark:to-purple-600/10" />
        <div className="relative">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 flex-shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/25">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-purple-700 dark:from-white dark:to-purple-200 bg-clip-text text-transparent">
                  Lexxo
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group relative flex items-center space-x-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30 hover:text-gray-900 dark:hover:text-white"
                >
                  <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>{item.name}</span>
                  <div className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-300 dark:hover:border-purple-400/40 hover:scale-105 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-300 dark:hover:border-purple-400/40 hover:scale-105 transition-all duration-300"
                    >
                      <Avatar className="h-8 w-8 ring-2 ring-purple-300 dark:ring-purple-500/30">
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-800 text-white font-semibold text-sm">
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {user?.role === "admin" && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-gradient-to-r from-orange-500 to-red-500 border-0">
                          A
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-64 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200 dark:border-purple-500/30 shadow-2xl shadow-gray-500/10 dark:shadow-purple-500/10"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-semibold leading-none text-gray-900 dark:text-white">
                            {user?.name}
                          </p>
                          {user?.role === "admin" && (
                            <Badge className="text-xs bg-purple-100 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-400/30">
                              Admin
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-purple-500/20" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/profile")}
                        className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-gray-900 dark:hover:text-white focus:bg-purple-100 dark:focus:bg-purple-900/30 focus:text-gray-900 dark:focus:text-white"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      {user?.role === "admin" && (
                        <DropdownMenuItem
                          onClick={() => navigate("/admin")}
                          className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-gray-900 dark:hover:text-white focus:bg-purple-100 dark:focus:bg-purple-900/30 focus:text-gray-900 dark:focus:text-white"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-purple-500/20" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 focus:bg-red-100 dark:focus:bg-red-900/20 focus:text-red-700 dark:focus:text-red-300"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/login")}
                    className="hidden sm:flex text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-transparent hover:border-purple-300 dark:hover:border-purple-500/20"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 border-0"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-10 w-10 rounded-xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-300 dark:hover:border-purple-400/40 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-purple-500/20 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-gray-900 dark:hover:text-white active:scale-95"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}

                {!isAuthenticated && (
                  <div className="pt-4 border-t border-gray-200 dark:border-purple-500/20 space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400/40"
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/25"
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 relative">{children}</main>
    </div>
  );
};

export default Layout;
