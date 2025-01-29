import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Loader2, ArrowLeft, User, Lock, Building, Tags } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "employee",
    category: "animal-feeding",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { value: "animal-feeding", label: "Animal Feeding" },
    { value: "fresh-oil", label: "Fresh Oil" },
    { value: "godown", label: "Godown" },
    { value: "hardware", label: "Hardware" },
    { value: "printing", label: "Printing" },
    { value: "stationery", label: "Stationery" },
  ];

  const roles = [
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Admin" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("User created successfully!");
        setTimeout(() => navigate("/admin/users"), 1500);
      } else {
        toast.error(data.message || "Failed to create user");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, label, error, ...props }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          {...props}
          className={`
            block w-full pl-10 pr-3 py-2 
            border rounded-md shadow-sm
            focus:ring-2 focus:ring-green-500 focus:border-green-500
            ${error ? "border-red-500" : "border-gray-300"}
          `}
          autoComplete="off"
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );

  const SelectField = ({ icon: Icon, label, options, ...props }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <select
          {...props}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Users
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-green-600 p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Add New User
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <InputField
              icon={User}
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              error={errors.email}
              autoComplete="off"
              required
            />

            <InputField
              icon={Lock}
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              error={errors.password}
              autoComplete="off"
              required
            />

            <SelectField
              icon={Building}
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roles}
            />

            <SelectField
              icon={Tags}
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categories}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 flex items-center justify-center
                text-white font-medium rounded-md
                bg-green-600 hover:bg-green-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                disabled:bg-gray-400 disabled:cursor-not-allowed
                transition-colors duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Creating User...
                </>
              ) : (
                "Create User"
              )}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AddUserPage;
