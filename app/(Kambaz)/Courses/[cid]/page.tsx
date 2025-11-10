"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";

export default function CoursesPage({ params }: { params: { cid: string } }) {
  const { cid } = params;
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  useEffect(() => {
    
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }

   
    const enrolledCourses = currentUser.enrolledCourses || [];
    if (!enrolledCourses.includes(cid)) {
      redirect("/Dashboard");
      return;
    }

   
    redirect(`/Courses/${cid}/Home`);
  }, [cid, currentUser]);

  
  return null;
}
