"use client";

import Link from "next/link";
import { Row, Col, Card, Button, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 my-4">
          {/* Shared Style for All Courses */}
          {[
            {
              code: "CS1234",
              title: "React JS",
              desc: "Full Stack software developer",
              img: "/images/reactjs.jpg",
              link: "/Courses/CS1234",
            },
            {
              code: "CS2345",
              title: "Node JS",
              desc: "Backend Development",
              img: "/images/nodejs.jpg",
              link: "/Courses/CS2345",
            },
            {
              code: "CS3456",
              title: "Python",
              desc: "Data Science Basics",
              img: "/images/python.jpg",
              link: "/Courses/CS3456",
            },
            {
              code: "CS4567",
              title: "C++",
              desc: "Algorithms and Data Structures",
              img: "/images/cpp.jpg",
              link: "/Courses/CS4567",
            },
            {
              code: "CS5678",
              title: "Java",
              desc: "Object Oriented Programming",
              img: "/images/java.jpg",
              link: "/Courses/CS5678",
            },
            {
              code: "CS6789",
              title: "AI/ML",
              desc: "Machine Learning",
              img: "/images/ai.jpg",
              link: "/Courses/CS6789",
            },
            {
              code: "CS7890",
              title: "Web Dev",
              desc: "Frontend Basics",
              img: "/images/webdev.jpg",
              link: "/Courses/CS7890",
            },
            {
              code: "CS8901",
              title: "CSS",
              desc: "CSS Styling Essentials",
              img: "/images/css.jpg",
              link: "/Courses/CS8901",
            },
          ].map((course, index) => (
            <Col key={index} className="d-flex justify-content-center">
              <Card style={{ width: "300px", height: "100%" }} className="h-100">
                <Link
                  href={course.link}
                  className="text-decoration-none text-dark"
                >
                  <CardImg variant="top" src={course.img} height={160} />
                  <CardBody>
                    <CardTitle>{`${course.code} ${course.title}`}</CardTitle>
                    <CardText style={{ minHeight: "60px" }}>{course.desc}</CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
