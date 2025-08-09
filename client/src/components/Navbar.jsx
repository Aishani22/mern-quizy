import { NavLink } from "react-router";
import { useAuth } from "../store/auth";

const Navbar = () => {
    const {isLoggedIn} = useAuth();
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                <NavLink to="/home">
                    <img src="/images/Quizy.png" alt="Home" style={{ height: "40px"}} />
                </NavLink>
                <nav>
                    <ul style={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <>
                        <div className="loggedIn">
                            <li>
                                <NavLink to="/logout" className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold shadow-sm hover:bg-gray-200 transition">Logout</NavLink>
                            </li>
                        </div>
                        </>
                        
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;