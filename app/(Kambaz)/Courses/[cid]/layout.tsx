"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  
  const { cid } = useParams();

  
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  
  const course = courses.find((course) => course._id === cid);

  
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center gap-2">
        
        <FaAlignJustify
          className="fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        
        <Breadcrumb course={course} />
      </h2>

      <hr />

      <div className="d-flex">
        
        {showSidebar && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}

        
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
