import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/auth";
import { use } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router";
import { useLoader } from "./LoaderContext";

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { showLoader, hideLoader } = useLoader();

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleChange = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name] : value
        })
    }

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try{
            showLoader();
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const res_data = await response.json();
            console.log("Response from server: ", res_data);
            if(response.ok) {
                //store token in local storage
                storeTokenInLS(res_data.token);
                toast.success("Login successful!");
                setUser({
                    email: "",
                    password: "",
                })
                navigate("/home");
            }
            else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        }
        catch(error) {
            console.log(error);
        } 
        finally{
            hideLoader();
        }
    }

    return (
    <>
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-400 flex items-center justify-center px-4">
        <main className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
            {/* <div className="login-container"> */}
            <div className="md:w-1/2 hidden md:block">
                <img
                    src="/images/registerBg.png"
                    alt="Register"
                    className="h-full w-full object-cover"
                />
            </div>
                <div className="md:w-1/2 p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                        Login
                    </h1>
                    <br/>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" placeholder="Enter Your Email" id="email" required autoComplete="off" value={user.email} onChange={handleChange}
                            className="mt-1 mb-3 w-full p-3 bg-gray-300 text-gray-600 border border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" placeholder="Enter Your Password" id="password" required autoComplete="off" value={user.password} onChange={handleChange}
                            className="mt-1 w-full p-3 bg-gray-300 text-gray-600 border border-gray-200 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </div>
                        <div>
                        <NavLink to="/register" className="hover:text-gray-800">Don't have an account?</NavLink>
                        </div>
                        <button type="submit"
                        className="mt-10 w-full py-3 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-semibold rounded-xl shadow-md hover:from-gray-600 hover:to-gray-800 transition-all duration-300"
                        >Submit</button>
                    </form>
                </div>
            {/* </div> */}
        </main>
    </section>
    </>
    );
}

export default Login;