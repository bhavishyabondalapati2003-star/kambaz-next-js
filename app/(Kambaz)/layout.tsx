"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz" className="d-flex">
      {/* Sidebar */}
      <div style={{ width: "0px" }}>
        <KambazNavigation />
      </div>

      {/* Main content */}
      <div className="wd-main-content-offset p-3 flex-fill">
        {children}
      </div>
    </div>
  );
}
