import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { useLoader } from "./LoaderContext";

const Icons = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {user} = location.state;
    const {token} = location.state;
    const { showLoader, hideLoader } = useLoader();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleClick = async (iconPath) => {
        try{
            showLoader();
            const response = await fetch(`${apiUrl}/api/auth/setIcon`, {
                method: "PUT",
                headers: {"Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId: user._id, icon: iconPath }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Icon selected!");
                navigate("/login"); // or wherever you want
            } else {
                toast.error(data.message || "Failed to set icon.");
            }
        }
        catch(error) {
            console.error("Error while selecting icon:", error);
        }
        finally{
            hideLoader();
        }
    };

    return(
        <>
            <div>
           <div className="max-w-xl mt-20 mx-auto p-6 rounded-2xl shadow-xl bg-gray-300 space-y-6 text-gray-800">
            <h2 className="text-2xl font-bold text-center">Choose Your Icon!</h2>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/cat.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={() => handleClick("/iconImages/cat.png")}/>
                <p className="text-xl font-bold text-green-500"></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/chick.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={() => handleClick("/iconImages/chick.png")}/>
                <p className="text-xl font-bold text-red-500"></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/corgi.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={() => handleClick("/iconImages/corgi.png")}/>
                <p className="text-xl font-bold text-gray-500"></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/jellyfish.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={() => handleClick("/iconImages/jellyfish.png")}/>
                <p className="text-xl font-bold text-gray-500"></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/lion.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={() => handleClick("/iconImages/lion.png")}/>
                <p className="text-xl font-bold text-gray-500"></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/mouse.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={() => handleClick("/iconImages/mouse.png")}/>
                <p className="text-xl font-bold text-gray-500"></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/penguin.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={() => handleClick("/iconImages/penguin.png")}/>
                <p className="text-xl font-bold text-gray-500"></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/turtle.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110"onClick={() => handleClick("/iconImages/turtle.png")}/>
                <p className="text-xl font-bold text-gray-500"></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <img src="/iconImages/whale.png" alt="Bee Icon" className="w-12 h-12 mx-auto mb-2 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={() => handleClick("/iconImages/whale.png")}/>
                <p className="text-xl font-bold text-gray-500"></p>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}

export default Icons;