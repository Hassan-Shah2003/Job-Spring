import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import images from "../../../assets/images/images.png";
import { LoaderCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../../Auth/AuthContext';
import ProfilePage from '../../../pages/ProfilePage/ProfilePage';
import supaBase from '../../../services/supabaseClient';
// import DashboardStats from '../../dashboard/DashboardStats';

const Navbar = ({ transparent }) => {
  const location = useLocation();
  const [open, setopen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, signOutUser } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAboutPage = location.pathname === "/about";
  const isContactPage = location.pathname === "/contactus";
  const [scrolled, setScrolled] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState("")
  const role = user?.user_metadata?.role;
  // const navigate = useNavigate();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOutUser();
    setShowLogoutModal(false);
    setopen(false);
  };
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user) return;
      // console.log(user, "---------user");

      const { data, error } = await supaBase
        .from("profiles")
        .select("avatar")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (error) {
        // console.error("Error fetching avatar:", error);
        return;
      }
      if (data) {
        setAvatarUrl(data?.avatar || null);
      } else {
        // console.warn("No avatar found for this user");
        setAvatarUrl(null);
      }
    };

    fetchAvatar();
  }, [user]);
  const handlePostJobClick = () => {
    setPostLoading(true);
    setTimeout(() => {
      navigate("/post-job")
      setPostLoading(false);
    }, 1500);
  }
  // const handleLogoutClick = () => {
  //   setLogoutLoading(true);
  //   setTimeout(() => {
  //     setShowLogoutModal(true);
  //     setLogoutLoading(false);
  //   }, 2000);
  // };
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contactus" },
    { name: "Blogs", path: "/blogs" },
  ];

  const sideAction = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contactus" },
    // { name: "Login", path: "/login" },
    { name: "Post Job", path: "/post-job" },
    // { name: "Profile", path: "/profile" }
  ];


  return (
    <nav
      style={{
        backgroundColor:
          (isAboutPage || isContactPage || transparent) && !scrolled
            ? "transparent"
            : "#244034",
      }}
      className={`flex justify-between items-center h-20 fixed top-0 left-0 w-full px-4 z-50 transition-all duration-500 ${(isAboutPage || isContactPage || transparent) && !scrolled
        ? ""
        : ""
        }`}
    >
      {/* LEFT: Logo + Menu Icon (for mobile) */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setopen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        <Link to="/">
          <img src={images} className="w-auto h-14 md:m-2" alt="Logo" />
        </Link>
      </div>

      {/* CENTER: Desktop Menu */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <ul className="flex gap-2 lg:gap-7">
          {menuItems.map((item, i) => {
            const isBlogDetail = location.pathname.startsWith("/blog/");
            return (
              <li key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-base font-bold rounded-2xl transition duration-300 p-3 cursor-pointer ${isActive || (isBlogDetail && item.path === "/blogs")
                      ? "bg-[#c5f542] text-black"
                      : "text-white hover:bg-[#c5f542] hover:text-black"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* RIGHT: Profile avatar (always visible) */}
      <div className="flex items-center gap-3">
        {user?.user_metadata?.role === "company" && (
          <button
            onClick={handlePostJobClick}
            disabled={postLoading}
            className={`hidden md:flex text-base font-bold rounded-2xl transition duration-300 p-3 items-center justify-center gap-2 ${postLoading
              ? "bg-[#c5f542]/70 text-gray-700 cursor-wait"
              : "bg-[#c5f542] hover:text-white cursor-pointer"
              }`}
          >
            {postLoading ? (
              <>
                <LoaderCircle className="animate-spin" size={20} />
                <span>Loading...</span>
              </>
            ) : (
              "Post Job"
            )}
          </button>
        )}

        {user ? (
          <li className="relative">
            {/* Profile button */}
            <button
              className="profile-button cursor-pointer"
              onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#c5f542] flex items-center justify-center bg-blue-600 text-white font-bold uppercase">
                {avatarUrl ? (
                  <img
                    src={`${avatarUrl}?t=${new Date().getTime()}`}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {user?.user_metadata?.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </span>
                )}
              </div>
            </button>

            {/* Dropdown + Overlay */}
            {openProfileDropdown && (
              <>
                {/* invisible overlay behind dropdown */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpenProfileDropdown(false)}
                />

                {/* dropdown itself */}
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-50">
                  <p className="font-semibold">{user?.displayName}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <Link
                    to="/profile"
                    className="block mt-2 text-[#244034] hover:underline hover:text-green-500"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-2 cursor-pointer w-full bg-red-500 text-white rounded-lg py-1"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </li>

        ) : (
          <Link
            to="/login"
            className="text-base font-bold bg-[#c5f542] hover:text-white rounded-2xl transition duration-300 p-3"
          >
            Login
          </Link>
        )}
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <>
          {/* Overlay behind the mobile menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setopen(false)}
          />

          {/* Mobile menu */}
          <div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden z-50">
            <ul className="flex flex-col items-center space-y-4 py-4 text-gray-800 font-semibold">
              {sideAction
                .filter(item => item.name !== "Post Job" || role === "company") // filter Post Job based on role
                .map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path}
                      className="text-base font-bold hover:bg-[#c5f542] rounded-2xl transition duration-300 p-3"
                      onClick={() => setopen(false)} // menu item click closes menu
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>

          </div>
        </>
      )}

    </nav>

  );
};

export default Navbar;
