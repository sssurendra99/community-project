// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { PhoneIcon, UserCircle, LogOut, LayoutDashboard, LogIn } from "lucide-react";
// import SearchBar from "../ui-tools/SearchBar";
// import MainNavBar from "../navigation/MainNavBar";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
// import { logout } from "@/action/logout";

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const[isLoggedOut, setIsLoggedOut] = useState(false);
//   const{data: session, update} = useSession();

//   useEffect(() => {
//     if (!session) {
//       setIsLoggedOut(false);
//       router.push('/');
//     }
//     // const user = localStorage.getItem("mock_user");
//     // setIsLoggedIn(!!user);
//   },[session, router]);

//   const handleLogOut = async() => {
//     try {
//       setIsLoggedOut(true);
//       await logout();
//       await update(null);
//       await signOut({redirect:false})
//       router.refresh();
//     } catch (error) {
//       console.error("Logout failed:", error);
//       setIsLoggedOut(false);
//       window.location.reload();
//     }
//   }

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("mock_user");
//     setIsLoggedIn(false);
//     setDropdownOpen(false);
//     router.push("/");
//   };
// const shouldShowLogout = !session || isLoggedOut;
//   return (
//     <header className="border-b border-gray-200 shadow-sm bg-white">
//       <div className="flex justify-between items-center px-6 py-4">
//         <div className="text-3xl font-extrabold tracking-wider">WearMe</div>

//         <div className="text-right">
//           <p className="flex items-center justify-end text-sm text-gray-600">
//             Customer Service
//             <span className="ml-2 flex items-center">
//               <PhoneIcon className="w-4 h-4 mx-2" />
//               +94 77 23 44 555
//             </span>
//           </p>
//           <SearchBar />
//         </div>

//         {/* Profile Dropdown */}
//         <div className="relative ml-6" ref={dropdownRef}>
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//           >
//             <UserCircle className="w-6 h-6 text-gray-700" />
//             <span className="text-sm font-medium text-gray-700">
//               {isLoggedIn ? "Admin" : "Guest"}
//             </span>
//           </button>

//           {dropdownOpen && (
//             // <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
//             //   {isLoggedIn ? (
//             //     <>
//             //       <Link
//             //         href="/dashboard/admin"
//             //         className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
//             //         onClick={() => setDropdownOpen(false)}
//             //       >
//             //         <LayoutDashboard className="w-4 h-4 mr-2" />
//             //         Admin Dashboard
//             //       </Link>
//             //       <button
//             //         onClick={handleLogout}
//             //         className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
//             //       >
//             //         <LogOut className="w-4 h-4 mr-2" />
//             //         Logout
//             //       </button>
//             //     </>
//             //   ) : (
//             //     <Link
//             //       href="/dashboard"
//             //       className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-green-600"
//             //       onClick={() => setDropdownOpen(false)}
//             //     >
//             //       <LogIn className="w-4 h-4 mr-2" />
//             //       Login
//             //     </Link>
//             //   )}
//             // </div>
//             <div className=" flex flex-row gap-x-3 ">
//               {!shouldShowLogout && session?.user ? (
//                 <>
//                 <Link href="/account">My account</Link> / <button
//                 onClick={handleLogout}
//                 >Log out</button> 
//                 </>
//               ) : (
//                 <>
//                 <Link href="/login">Sign In  or</Link>  <Link href="/register">Create an Account</Link> 
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <MainNavBar />
//     </header>
//   );
// };

// export default Header;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { PhoneIcon, UserCircle, LogOut, LayoutDashboard, LogIn } from "lucide-react";
import SearchBar from "../ui-tools/SearchBar";
import MainNavBar from "../navigation/MainNavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { logout } from "@/action/logout";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session, update } = useSession();

  // Handle logout functionality
  const handleLogOut = async () => {
    try {
      setIsLoggingOut(true);
      setDropdownOpen(false);
      
      // Call your custom logout action
      await logout();
      
      // Update session to null
      await update(null);
      
      // Sign out from NextAuth
      await signOut({ redirect: false });
      
      // Refresh the page
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
      // Fallback: reload the page
      window.location.reload();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine user display name
  const getUserDisplayName = () => {
    if (session?.user?.name) {
      return session.user.name;
    }
    return "Guest";
  };

  const isAuthenticated = !!session?.user;

  return (
    <header className="border-b border-gray-200 shadow-sm bg-white">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-3xl font-extrabold tracking-wider">
          <Link href="/" className="text-inherit hover:text-gray-700">
            WearMe
          </Link>
        </div>

        <div className="text-right">
          <p className="flex items-center justify-end text-sm text-gray-600">
            Customer Service
            <span className="ml-2 flex items-center">
              <PhoneIcon className="w-4 h-4 mx-2" />
              +94 77 23 44 555
            </span>
          </p>
          <SearchBar />
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-6" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            disabled={isLoggingOut}
          >
            <UserCircle className="w-6 h-6 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">
              {getUserDisplayName()}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard/admin"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    My Account
                  </Link>
                  {session?.user?.role === 'admin' && (
                    <Link
                      href="/dashboard/admin"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogOut}
                    disabled={isLoggingOut}
                    className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-red-600 disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {isLoggingOut ? 'Logging out...' : 'Log Out'}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-green-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-blue-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Create Account
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <MainNavBar />
    </header>
  );
};

export default Header;


