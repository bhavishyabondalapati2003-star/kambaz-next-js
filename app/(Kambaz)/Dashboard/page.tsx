import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const courses = [
    { id: "CS1234", name: "React JS", desc: "Full Stack software developer", img: "/images/reactjs.jpg" },
    { id: "CS2345", name: "Node JS", desc: "Backend Development", img: "/images/nodejs.jpg" },
    { id: "CS3456", name: "Python", desc: "Data Science Basics", img: "/images/python.jpg" },
    { id: "CS4567", name: "C++", desc: "Algorithms and Data Structures", img: "/images/cpp.jpg" },
    { id: "CS5678", name: "Java", desc: "Object Oriented Programming", img: "/images/java.jpg" },
    { id: "CS6789", name: "AI/ML", desc: "Machine Learning", img: "/images/ai.jpg" },
    { id: "CS7890", name: "Web Dev", desc: "Frontend Basics", img: "/images/webdev.jpg" },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        {courses.map(course => (
          <div key={course.id} className="wd-dashboard-course">
            <Link href={`/Courses/${course.id}`} className="wd-dashboard-course-link">
              <Image src={course.img} width={200} height={150} alt={course.name} />
              <div>
                <h5>{course.id} {course.name}</h5>
                <p className="wd-dashboard-course-title">{course.desc}</p>
                <button>Go</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
