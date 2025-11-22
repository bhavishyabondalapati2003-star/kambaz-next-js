"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import { Provider } from "react-redux";
import store from "./store";
import Session from "./Account/Session";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kambaz" className="d-flex">
          
          <div style={{ width: "0px" }}>
            <KambazNavigation />
          </div>

          
          <div className="wd-main-content-offset p-3 flex-fill">
            {children}
          </div>
        </div>
      </Session>
    </Provider>
  );
}