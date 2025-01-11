import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();

   const { login } = useAuthStore();

   
    const [formData, setFormData] = useState({
  
      email: "",
      password: "",
    });

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
     const handleLogin = (e) => {
       e.preventDefault();
       login(formData);
       navigate('/');
     };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section with Image */}
      <div className="hidden md:flex w-full md:w-1/2  items-center justify-center">
        <img
          src="https://i.pinimg.com/originals/89/29/e8/8929e801e61c00035c84b6f02a28622f.jpg"
          alt="Illustration"
          className="max-w-sm"
        />
      </div>

      {/* Right Section with Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
             Login Here
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="saroj@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 underline">
              Create New
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
