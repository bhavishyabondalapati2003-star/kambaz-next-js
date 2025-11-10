"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  return (
    <div id="wd-account-navigation" className="p-3">
      
      {!currentUser && (
        <>
          <Link href="/Account/Signin" className="text-danger d-block mb-2">
            Signin
          </Link>
          <Link href="/Account/Signup" className="text-danger d-block mb-2">
            Signup
          </Link>
        </>
      )}

      
      {currentUser && (
        <Link href="/Account/Profile" className="text-danger d-block">
          Profile
        </Link>
      )}
    </div>
  );
}
