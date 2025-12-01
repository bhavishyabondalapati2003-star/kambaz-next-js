"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="p-3">
      {!currentUser && (
        <>
          <Link 
            href="/Account/Signin" 
            className={`text-danger d-block mb-2 ${pathname.includes("Signin") ? "fw-bold" : ""}`}
          >
            Signin
          </Link>
          <Link 
            href="/Account/Signup" 
            className={`text-danger d-block mb-2 ${pathname.includes("Signup") ? "fw-bold" : ""}`}
          >
            Signup
          </Link>
        </>
      )}

      {currentUser && (
        <>
          <Link 
            href="/Account/Profile" 
            className={`text-danger d-block mb-2 ${pathname.includes("Profile") ? "fw-bold" : ""}`}
          >
            Profile
          </Link>
          
          {currentUser.role === "ADMIN" && (
            <Link 
              href="/Account/Users" 
              className={`text-danger d-block mb-2 ${pathname.includes("Users") ? "fw-bold" : ""}`}
            >
              Users
            </Link>
          )}
        </>
      )}
    </div>
  );
}