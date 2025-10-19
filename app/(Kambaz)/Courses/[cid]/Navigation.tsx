"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function CourseNavigation() {
  const pathname = usePathname();

  // Dynamically extract the course ID from the path (e.g., /Courses/RS101/Home)
  const segments = pathname.split("/");
  const cid = segments[2] || "1234";

  // Replace hardcoded list with a data-driven array
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Determine which link is active based on the current pathname
    let match = links.find((label) =>
  pathname.toLowerCase().includes(`/${label.toLowerCase()}`)
);
if (!match) match = "Home";
setActiveId(`wd-course-${match.toLowerCase()}-link`);

  }, [pathname]);

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const id = `wd-course-${label.toLowerCase()}-link`;
        const href = `/Courses/${cid}/${label}`;
        const isActive = activeId === id;
        const textClass = isActive ? "active text-black" : "text-danger";

        return (
          <Link
            key={id}
            href={href}
            id={id}
            className={`list-group-item border-0 ${textClass}`}
            onClick={() => setActiveId(id)}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
