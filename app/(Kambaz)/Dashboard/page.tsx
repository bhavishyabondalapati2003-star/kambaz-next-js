import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">

        {/* React JS */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Node JS */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS2345" className="wd-dashboard-course-link">
            <Image src="/images/nodejs.jpg" width={200} height={150} alt="Node JS" />
            <div>
              <h5> CS2345 Node JS </h5>
              <p className="wd-dashboard-course-title">Backend Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Python */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS3456" className="wd-dashboard-course-link">
            <Image src="/images/python.jpg" width={200} height={150} alt="Python" />
            <div>
              <h5> CS3456 Python </h5>
              <p className="wd-dashboard-course-title">Data Science Basics</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* C++ */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS4567" className="wd-dashboard-course-link">
            <Image src="/images/cpp.jpg" width={200} height={150} alt="C++" />
            <div>
              <h5> CS4567 C++ </h5>
              <p className="wd-dashboard-course-title">Algorithms and Data Structures</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Java */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS5678" className="wd-dashboard-course-link">
            <Image src="/images/java.jpg" width={200} height={150} alt="Java" />
            <div>
              <h5> CS5678 Java </h5>
              <p className="wd-dashboard-course-title">Object Oriented Programming</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* AI/ML */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS6789" className="wd-dashboard-course-link">
            <Image src="/images/ai.jpg" width={200} height={150} alt="AI/ML" />
            <div>
              <h5> CS6789 AI/ML </h5>
              <p className="wd-dashboard-course-title">Machine Learning</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Web Dev */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS7890" className="wd-dashboard-course-link">
            <Image src="/images/webdev.jpg" width={200} height={150} alt="Web Dev" />
            <div>
              <h5> CS7890 Web Dev </h5>
              <p className="wd-dashboard-course-title">Frontend Basics</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* css */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS8901" className="wd-dashboard-course-link">
            <Image src="/images/css.jpg" width={200} height={150} alt="css" />
            <div>
              <h5> CS8901 css </h5>
              <p className="wd-dashboard-course-title">css</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}

