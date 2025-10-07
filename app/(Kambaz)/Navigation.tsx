"use client";

import { useState } from "react";
import { FaComputer } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { MdAccountCircle, MdInbox } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { RiDashboard3Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";

export default function KambazNavigation() {
  const [activeId, setActiveId] = useState("wd-account-link");

  const links = [
    { href: "/Account", id: "wd-account-link", label: "Account", icon: <MdAccountCircle /> },
    { href: "/Dashboard", id: "wd-dashboard-link", label: "Dashboard", icon: <RiDashboard3Line /> },
    { href: "/Dashboard", id: "wd-courses-link", label: "Courses", icon: <IoBookSharp /> },
    { href: "/Calendar", id: "wd-calendar-link", label: "Calendar", icon: <SlCalender /> },
    { href: "/Inbox", id: "wd-inbox-link", label: "Inbox", icon: <MdInbox /> },
    { href: "/Labs", id: "wd-labs-link", label: "Labs", icon: <FaComputer /> },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
     

      id="wd-kambaz-navigation">
      <ListGroupItem className="bg-black border-0 text-center" as="a" target="_blank"
        href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/NEU.jpg" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      {links.map((link) => {
        const isActive = activeId === link.id;
        const isAccount = link.id === "wd-account-link";

        const bgColor = isActive ? "bg-white" : "bg-black";
        
        // Text is white when inactive, red when active.
        const linkTextColor = isActive ? "text-danger" : "text-white";

        // Icon color logic:
        let iconColor;
        if (isAccount) {
          // Account icon: red when active, white when inactive.
          iconColor = isActive ? "text-danger" : "text-white";
        } else {
          // All other icons: always red (based on the previous request's logic).
          iconColor = "text-danger";
        }

        return (
          <ListGroupItem
            key={link.id}
            className={`border-0 text-center ${bgColor}`}
            onClick={() => setActiveId(link.id)}
          >
            <Link
              href={link.href}
              id={link.id}
              className={`text-decoration-none d-block`}
            >
              {/* Apply icon color */}
              <div className={`fs-1 ${iconColor}`}>
                  {link.icon}
              </div>
              {/* Apply text color */}
              <div className={linkTextColor}>
                {link.label}
              </div>
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}