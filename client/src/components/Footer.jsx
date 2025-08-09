import { NavLink } from "react-router";

const Footer = () => {
    return (
        <footer className="footer bg-white sticky shadow-xl" style={{
                boxShadow: "0 2px 5px 0 rgba(0,0,0,0.18), 0 -4px 10px 0 rgba(0,0,0,0.10)"
            }}>
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4">
                <div className="text-md text-gray-500 items-center justify-center">
                    Copyright &copy; {new Date().getFullYear()} Quizy. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;