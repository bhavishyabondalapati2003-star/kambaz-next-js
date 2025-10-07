'use client';

import { useParams } from "next/navigation";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function AssignmentEditor() {
  const { aid } = useParams();

  return (
    <Card className="p-4 m-4 shadow-sm">
      <h4 className="mb-4 fw-semibold text-dark">
        {aid ? `A${aid}: ENV + HTML` : "New Assignment"}
      </h4>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            defaultValue="The assignment is available online. Submit a link to the landing page of your work."
          />
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" defaultValue={100} />
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group className="mb-3">
          <Form.Label>Display Grade As</Form.Label>
          <Form.Select defaultValue="Points">
            <option value="Points">Points</option>
            <option value="Percentage">Percentage</option>
          </Form.Select>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group className="mb-3">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select defaultValue="Website URL">
            <option>Text Entry</option>
            <option>File Upload</option>
            <option>Website URL</option>
            <option>Media Recordings</option>
            <option>Student Annotation</option>
          </Form.Select>
        </Form.Group>

        {/* Optional Fields */}
        <Form.Group className="mb-3">
          <Form.Label>Text Entry</Form.Label>
          <Form.Control as="textarea" placeholder="Enter instructions here" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Website URL</Form.Label>
          <Form.Control type="url" placeholder="https://example.com" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Media Recordings</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check label="Student Annotation" />
          <Form.Check label="File Upload" />
        </Form.Group>

        {/* Assign To */}
        <Form.Group className="mb-3">
          <Form.Label>Assign To</Form.Label>
          <Form.Select defaultValue="Everyone">
            <option>Everyone</option>
            <option>All Students</option>
            <option>Group 1</option>
            <option>Group 2</option>
          </Form.Select>
        </Form.Group>

        {/* Dates */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Available From</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Available Until</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </Card>
  );
}
