// src/App.js
import illustration from './assets/illustration.png'; // Add any image to your assets folder and update the path

function Signup() {
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
            Customer Signup
          </h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Saroj Adhikari"
              />
            </div>
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="saroj@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="9876543210"
              />
            </div>
              <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="phone"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Ilam Deumai-3"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              Sign up
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 underline">
            Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

// src/index.css (Tailwind CSS configuration should be set up)

