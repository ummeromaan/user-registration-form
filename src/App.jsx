import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulating API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSuccess("Account created successfully!");

    setForm(initialForm);
  };

  return (
    <div className="min-h-screen bg-[#2a385e] flex items-center justify-center p-4">

      <div className="w-full max-w-2xl rounded-2xl border-2 border-blue-700 bg-[#041133] p-6 shadow-2xl sm:p-8 md:p-12">

        <h1 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
          Create your Account
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm text-white"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`h-11 w-full rounded-lg border bg-gray-500/20 px-4 text-white outline-none placeholder:text-gray-400 focus:border-blue-500 ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-white"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`h-11 w-full rounded-lg border bg-gray-500/20 px-4 text-white outline-none placeholder:text-gray-400 focus:border-blue-500 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-white"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`h-11 w-full rounded-lg border bg-gray-500/20 px-4 text-white outline-none placeholder:text-gray-400 focus:border-blue-500 ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm text-white"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`h-11 w-full rounded-lg border bg-gray-500/20 px-4 text-white outline-none placeholder:text-gray-400 focus:border-blue-500 ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <label className="flex items-start gap-2 md:col-span-2">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4"
            />

            <span className="text-sm text-white">
              I agree to the{" "}
              <a
                href="#"
                className="text-blue-400 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Success Message */}
          {success && (
            <p className="text-center text-sm text-green-400 md:col-span-2">
              {success}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 px-4 py-3 font-semibold text-white transition hover:from-blue-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 md:col-span-2">
            <div className="flex-1 border-t border-gray-700" />
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-700" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">

            <button
              type="button"
              className="flex-1 rounded-lg border border-gray-600 px-4 py-3 text-white transition hover:bg-white hover:text-black"
            >
              Continue with Google
            </button>

            <button
              type="button"
              className="flex-1 rounded-lg border border-gray-600 px-4 py-3 text-white transition hover:bg-white hover:text-black"
            >
              Continue with GitHub
            </button>

          </div>

          {/* Login */}
          <p className="text-center text-sm text-gray-300 md:col-span-2">
            Already have an account?{" "}
            <a
              href="#"
              className="font-semibold text-blue-400 hover:underline"
            >
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}

export default App;