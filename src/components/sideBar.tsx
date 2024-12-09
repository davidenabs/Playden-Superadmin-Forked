import { useDispatch, useSelector } from "react-redux";
import {
    profileImage,
    pitch,
    pitchAdmin,
    booking,
    finance,
    playPoint,
    setting,
    user,
    dashboard,
    cancle,
    logout as logoutIcon,
} from "../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../redux/authSlice"; 
import { RootState } from "../redux/store";

const Sidebar: React.FC = () => {
    const [activeLink, setActiveLink] = useState("Dashboard");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { admin } = useSelector((state: RootState) => state.adminUser);

    const handleLogout = () => {
        // Dispatch logout action to clear Redux state and localStorage
        dispatch(logout());

        // Navigate to login page
        navigate("/login");
    };

    return (
        <div className="h-screen w-[275px] shadow-2xl mt-16 font-poppins p-6 fixed flex flex-col text-playden-primary bg-[#8F55A21A] transition-all duration-300">
            {/* Top Section: Profile */}
            <div className="pt-5 flex items-center gap-2">
                <img src={profileImage} alt="profile" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-xs">{admin?.name || "Pitch Admin"}</p>
                    <p className="text-xs font-semibold"> {admin?.user_id || "admin@example.com"}</p>
                </div>
            </div>

            {/* Dashboard Link */}
            <div className="mt-2">
                <a
                    href="/"
                    onClick={() => setActiveLink("Dashboard")}
                    className={`flex items-center gap-4 px-4 mt-8 py-2 text-xs font-bold rounded-md hover:bg-[#35354C] hover:text-white ${
                        activeLink === "Dashboard" ? "bg-[#35354C] text-white relative" : ""
                    }`}
                >
                    <img
                        src={dashboard}
                        alt="Dashboard Icon"
                        className="w-4 h-4"
                        style={{
                            filter:
                                activeLink === "Dashboard"
                                    ? "brightness(0) invert(1)"
                                    : "brightness(0) invert(0.2)",
                        }}
                    />
                    <span>Dashboard</span>
                </a>
            </div>

            {/* Middle Section: Navigation Links */}
            <div className="flex flex-col gap-1 mt-2">
                <h1 className="font-bold text-xs">MENU</h1>

                {/* Menu Links */}
                {[
                    { name: "Pitch Listing", icon: pitch, route: "/pitch-listing" },
                    { name: "Booking Management", icon: booking, route: "/booking-management" },
                    { name: "Cancellation", icon: cancle, route: "/cancellation-management" },
                    { name: "Play Points", icon: playPoint, route: "/play-point" },
                    { name: "Financials & Analytics", icon: finance, route: "/finances" },
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.route}
                        onClick={() => setActiveLink(item.name)}
                        className={`flex items-center gap-3 px-2 py-2 text-sm font-bold rounded-md hover:bg-[#35354C] hover:text-white ${
                            activeLink === item.name ? "bg-[#35354C] text-white relative" : ""
                        }`}
                    >
                        <img
                            src={item.icon}
                            alt={`${item.name} Icon`}
                            className="w-4 h-4"
                            style={{
                                filter: activeLink === item.name ? "brightness(0) invert(1)" : "",
                            }}
                        />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>

            {/* Third Section: Profile Links */}
            <div className="flex flex-col gap-2 mt-4">
                <h1 className="font-bold text-xs">PROFILE</h1>

                {/* Profile Links */}
                {[
                    { name: "User Management", icon: user, route: "/user-management" },
                    { name: "Pitch Admin Management", icon: pitchAdmin, route: "/pitch-admin-management" },
                    { name: "Settings", icon: setting, route: "/account-settings" },
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.route}
                        onClick={() => setActiveLink(item.name)}
                        className={`flex items-center gap-3 px-2 py-2 text-sm font-bold rounded-md hover:bg-[#35354C] hover:text-white ${
                            activeLink === item.name ? "bg-[#35354C] text-white relative" : ""
                        }`}
                    >
                        <img
                            src={item.icon}
                            alt={`${item.name} Icon`}
                            className="w-4 h-4"
                            style={{
                                filter: activeLink === item.name ? "brightness(0) invert(1)" : "",
                            }}
                        />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>

            {/* Bottom Section: Logout */}
            <div
                onClick={handleLogout}
                className="flex items-center gap-1 px-2 font-bold py-2 rounded-md text-red-500 cursor-pointer"
            >
                <img src={logoutIcon} alt="Logout Icon" className="w-4 h-4" />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;
