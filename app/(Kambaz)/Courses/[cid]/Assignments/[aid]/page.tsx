/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Form, Row, Col, Card } from "react-bootstrap";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  // Get assignment data dynamically
  const assignment = db.assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  const title = assignment?.title || "A1";
  const description =
    assignment?.description ||
    `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kambaz application
• Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`;
  const points = assignment?.points || 100;
  const due = assignment?.due || "2024-05-13T23:59";
  const available = assignment?.available || "2024-05-06T00:00";

  return (
    <Card className="p-4 m-4 shadow-sm">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control defaultValue={title} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4">
          <Form.Control as="textarea" rows={8} defaultValue={description} />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={2} className="fw-semibold">
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" defaultValue={points} />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={2} className="fw-semibold">
            Assignment Group
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>PROJECTS</option>
              <option>EXTRA CREDIT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={2} className="fw-semibold">
            Display Grade as
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="Percentage">
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter Grade</option>
              <option>Complete/Incomplete</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={2} className="fw-semibold">
            Submission Type
          </Form.Label>
          <Col sm={10}>
            <Card className="p-3">
              {/* Dropdown only */}
              <Form.Group className="mb-3">
                <Form.Select defaultValue="Online">
                  <option>Online</option>
                  <option>On Paper</option>
                  <option>No Submission</option>
                </Form.Select>
              </Form.Group>

              {/* Always show these options like Canvas */}
              <div className="fw-semibold mb-2">Online Entry Options</div>
              <Form.Check type="checkbox" label="Text Entry" />
              <Form.Check type="checkbox" label="Website URL" defaultChecked />
              <Form.Check type="checkbox" label="Media Recordings" />
              <Form.Check type="checkbox" label="Student Annotation" />
              <Form.Check type="checkbox" label="File Uploads" />
            </Card>
          </Col>
        </Form.Group>

        {/* Assign Section */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="fw-semibold">
            Assign
          </Form.Label>
          <Col sm={10}>
            <Card className="p-3">
              {/* Assign To (dropdown single select) */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Assign to</Form.Label>
                <Form.Select defaultValue="Everyone">
                  <option>Everyone</option>
                  <option>All Students</option>
                  <option>Group 1</option>
                  <option>Group 2</option>
                </Form.Select>
              </Form.Group>

              {/* Due Date */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Due</Form.Label>
                <Form.Control type="datetime-local" defaultValue={due} />
              </Form.Group>

              {/* Availability Dates */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Available from</Form.Label>
                    <Form.Control type="datetime-local" defaultValue={available} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Until</Form.Label>
                    <Form.Control type="datetime-local" />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end">
          <Link
            href={`/Courses/${cid}/Assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Link
            href={`/Courses/${cid}/Assignments`}
            className="btn btn-danger"
          >
            Save
          </Link>
        </div>
      </Form>
    </Card>
  );
}
