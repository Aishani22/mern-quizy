
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { NavLink } from "react-router";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Registration successful!");
        navigate("/icons", { state: { user: res_data.user, token: res_data.token } });
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirm_password: "",
        });
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-400 flex items-center justify-center px-4">
      <main className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="/images/registerBg.png"
            alt="Register"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Your Username"
                value={user.username}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 w-full p-3 bg-gray-300 text-gray-600 border border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={user.email}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 w-full p-3 bg-gray-300 text-gray-600 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter Your Phone Number"
                value={user.phone}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 w-full p-3 bg-gray-300 text-gray-600 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={user.password}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 w-full p-3 bg-gray-300 text-gray-600 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Re-enter Your Password"
                value={user.confirm_password}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 mb-2 w-full p-3 bg-gray-300 text-gray-600 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <NavLink to="/login" className="hover:text-gray-800">Already have an account?</NavLink>
            {/* <p className="text-black">Already have an account?</p> */}

            <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-semibold rounded-xl shadow-md hover:from-gray-600 hover:to-gray-800 transition-all duration-300"
            >
            Submit
            </button>

          </form>
        </div>
      </main>
    </section>
  );
};

export default Register;
