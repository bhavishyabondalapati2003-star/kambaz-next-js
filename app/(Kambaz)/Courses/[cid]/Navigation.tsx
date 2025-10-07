"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function CourseNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Courses/1234/Home", id: "wd-course-home-link", label: "Home" },
    { href: "/Courses/1234/Modules", id: "wd-course-modules-link", label: "Modules" },
    { href: "/Courses/1234/Piazza", id: "wd-course-piazza-link", label: "Piazza" },
    { href: "/Courses/1234/Zoom", id: "wd-course-zoom-link", label: "Zoom" },
    { href: "/Courses/1234/Assignments", id: "wd-course-assignments-link", label: "Assignments" },
    { href: "/Courses/1234/Quizzes", id: "wd-course-quizzes-link", label: "Quizzes" },
    { href: "/Courses/1234/Grades", id: "wd-course-grades-link", label: "Grades" },
    { href: "/Courses/1234/People", id: "wd-course-people-link", label: "People" },
  ];

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // If pathname is the course root or invalid, default to Home
    const match = links.find(link => link.href === pathname);
    if (!match) {
      setActiveId("wd-course-home-link");
    } else {
      setActiveId(match.id);
    }
  }, [pathname]);

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(link => {
        const isActive = activeId === link.id;
        const textClass = isActive ? "active text-black" : "text-danger";

        return (
          <Link
            key={link.id}
            href={link.href}
            id={link.id}
            className={`list-group-item border-0 ${textClass}`}
            onClick={() => setActiveId(link.id)}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
