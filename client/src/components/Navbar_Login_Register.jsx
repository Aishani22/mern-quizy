// import { NavLink } from "react-router";
// import { useAuth } from "../store/auth";

// const NavbarLR = () => {
//     return (
//         <header className="navbar bg-white">
//             <div className="container">
//                 <nav>
//                     <ul style={{ display: "flex", alignItems: "center", width: "100%" }}>
//                         <li>
//                             <div className = "logo">
//                                 <NavLink>
//                                     <img src="/images/Quizy.png" alt="Home" style={{ height: "40px"}} />
//                                 </NavLink>
//                             </div>
//                         </li>
                    
//                         <>
//                             <div className = "loggedOut">
//                                 <li>
//                                     <NavLink to="/register" style={{fontSize: "20px"}}>Register</NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to="/login" style={{fontSize: "20px"}}>Login</NavLink>
//                                 </li>
//                             </div>

//                         </>
                        
//                     </ul>
//                 </nav>
//             </div>
//         </header>
//     )
// }

// export default NavbarLR;


import { NavLink } from "react-router";

const NavbarLR = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                <NavLink>
                    <img src="/images/Quizy.png" alt="Home" className="h-10" />
                </NavLink>
                <nav>
                    <ul className="flex gap-4 items-center">
                        <li>
                            <NavLink
                                to="/register"
                                className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold shadow-sm hover:bg-gray-200 transition"
                            >
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/login"
                                className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold shadow-sm hover:bg-gray-200 transition"
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavbarLR;