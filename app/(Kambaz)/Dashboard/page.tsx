"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollCourse, unenrollCourse } from "../Account/reducer";
import { RootState } from "../store";
import {
  Row,
  Col,
  Card,
  Button,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  FormControl,
} from "react-bootstrap";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
  term?: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "CS0000",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  useEffect(() => {
    if (!currentUser) router.replace("/Account/Signin");
  }, [currentUser, router]);

  if (!currentUser) return null;

  const isFaculty = currentUser.role === "FACULTY";
  const enrolledIds = currentUser.enrolledCourses || [];

  // Faculty sees all courses, students/TAs see enrolled only
  const visibleCourses = isFaculty
    ? courses
    : showAll
    ? courses
    : courses.filter((c: Course) => enrolledIds.includes(c._id));

  const toggleEnroll = (courseId: string, isEnrolled: boolean) => {
    if (isEnrolled) dispatch(unenrollCourse(courseId));
    else dispatch(enrollCourse(courseId));
  };

  const handleAddCourse = () => {
    const newCourse = {
      ...course,
      _id: `${Date.now()}`,
    };
    dispatch(addNewCourse(newCourse));

    // Faculty are not enrolled
    setCourse({
      _id: "0",
      name: "New Course",
      number: "CS0000",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  };

  return (
    <div id="wd-dashboard" className="p-4">
      {/* ---------- Header ---------- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>

        {/* Only show toggle for Students/TAs */}
        {!isFaculty && (
          <Button
            variant="primary"
            id="wd-enrollments-toggle"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show My Courses" : "Show All Courses"}
          </Button>
        )}
      </div>
      <hr />

      {/* ---------- Faculty Course Management ---------- */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              className="float-end"
              variant="primary"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add
            </Button>
            <Button
              className="float-end me-2"
              variant="warning"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </Button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            placeholder="Course Description"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      {/* ---------- Course Cards ---------- */}
      <h2 id="wd-dashboard-published">
        {isFaculty
          ? "All Courses"
          : showAll
          ? "All Courses"
          : "My Courses"}{" "}
        ({visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="gy-4 gx-4 my-4">
          {visibleCourses.map((c: Course) => {
            const isEnrolled = enrolledIds.includes(c._id);
            return (
              <Col
                key={c._id}
                className="wd-dashboard-course d-flex justify-content-center"
              >
                <Card
                  className="h-100 shadow-sm"
                  style={{ width: "300px", minHeight: "400px" }}
                >
                  <CardImg
                    src={c.image || "/images/reactjs.jpg"}
                    variant="top"
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                  <CardBody>
                    <CardTitle className="text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="overflow-hidden"
                      style={{ height: "80px" }}
                    >
                      {c.description || c.term}
                    </CardText>

                    {/* Always show Go button */}
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        href={`/Courses/${c._id}/Home`}
                        className="btn btn-outline-dark"
                      >
                        Go
                      </Link>

                      {/* Only Students/TAs see Enroll/Unenroll */}
                      {!isFaculty &&
                        (isEnrolled ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => toggleEnroll(c._id, true)}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => toggleEnroll(c._id, false)}
                          >
                            Enroll
                          </Button>
                        ))}
                    </div>

                    {/* Faculty edit/delete tools */}
                    {isFaculty && (
                      <div className="mt-3 text-end">
                        <Button
                          id="wd-edit-course-click"
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => setCourse(c)}
                        >
                          Edit
                        </Button>
                        <Button
                          id="wd-delete-course-click"
                          variant="danger"
                          size="sm"
                          onClick={() => dispatch(deleteCourse(c._id))}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
