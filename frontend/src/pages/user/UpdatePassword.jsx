import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Shield,
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";
import {
  updatePassword,
  clearAllAuthErrors,
  clearAuthMessage,
} from "../../store/slice/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearAllAuthErrors());
      dispatch(clearAuthMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearAuthMessage());
        navigate("/profile");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch, navigate]);

  const validateForm = () => {
    const errors = {};

    if (!formData.oldPassword.trim()) {
      errors.oldPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters long";
    } else if (formData.newPassword.length > 32) {
      errors.newPassword = "Password must not exceed 32 characters";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (
      formData.oldPassword &&
      formData.newPassword &&
      formData.oldPassword === formData.newPassword
    ) {
      errors.newPassword =
        "New password must be different from current password";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAllAuthErrors());

    if (validateForm()) {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("oldPassword", formData.oldPassword);
      formDataToSubmit.append("newPassword", formData.newPassword);
      formDataToSubmit.append("confirmPassword", formData.confirmPassword);

      dispatch(updatePassword(formDataToSubmit));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;

    if (strength <= 25) return { strength, text: "Weak", color: "bg-red-500" };
    if (strength <= 50)
      return { strength, text: "Fair", color: "bg-orange-500" };
    if (strength <= 75)
      return { strength, text: "Good", color: "bg-yellow-500" };
    return { strength, text: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black px-4 py-8">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/profile")}
          className="mb-6 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Button>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
              Update Password
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Ensure your account is using a long, random password to stay
              secure.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="animate-in slide-in-from-top-2 duration-300 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {message && (
              <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50 text-green-800 dark:text-green-200 animate-in slide-in-from-top-2 duration-300">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="oldPassword"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type={showPassword.old ? "text" : "password"}
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                    className="pr-10 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-300 dark:focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-800 focus:ring-opacity-50 rounded-md shadow-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => togglePasswordVisibility("old")}
                  >
                    {showPassword.old ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {validationErrors.oldPassword && (
                  <p className="text-red-600 dark:text-red-400 text-sm animate-in slide-in-from-top-1 duration-200">
                    {validationErrors.oldPassword}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="pr-10 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-300 dark:focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-800 focus:ring-opacity-50 rounded-md shadow-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {showPassword.new ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {formData.newPassword && (
                  <div className="space-y-2 animate-in slide-in-from-top-1 duration-300">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Password Strength:
                      </span>
                      <span
                        className={`font-medium ${
                          passwordStrength.text === "Weak"
                            ? "text-red-600 dark:text-red-400"
                            : passwordStrength.text === "Fair"
                            ? "text-orange-600 dark:text-orange-400"
                            : passwordStrength.text === "Good"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                  </div>
                )}

                {validationErrors.newPassword && (
                  <p className="text-red-600 dark:text-red-400 text-sm animate-in slide-in-from-top-1 duration-200">
                    {validationErrors.newPassword}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter new password"
                    className="pr-10 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:border-purple-300 dark:focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-800 focus:ring-opacity-50 rounded-md shadow-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPassword.confirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-red-600 dark:text-red-400 text-sm animate-in slide-in-from-top-1 duration-200">
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Password Requirements:
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-3 transition-colors duration-200 ${
                        formData.newPassword.length >= 8
                          ? "bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                    <span
                      className={`transition-colors duration-200 ${
                        formData.newPassword.length >= 8
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      At least 8 characters long
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-3 transition-colors duration-200 ${
                        /[A-Z]/.test(formData.newPassword)
                          ? "bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                    <span
                      className={`transition-colors duration-200 ${
                        /[A-Z]/.test(formData.newPassword)
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      Contains uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-3 transition-colors duration-200 ${
                        /[a-z]/.test(formData.newPassword)
                          ? "bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                    <span
                      className={`transition-colors duration-200 ${
                        /[a-z]/.test(formData.newPassword)
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      Contains lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-3 transition-colors duration-200 ${
                        /[0-9]/.test(formData.newPassword) ||
                        /[^A-Za-z0-9]/.test(formData.newPassword)
                          ? "bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                    <span
                      className={`transition-colors duration-200 ${
                        /[0-9]/.test(formData.newPassword) ||
                        /[^A-Za-z0-9]/.test(formData.newPassword)
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      Contains number or special character
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Update Password
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;
