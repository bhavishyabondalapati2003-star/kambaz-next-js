/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import * as client from "../../../client";

type Assignment = {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  due: string;
  available: string;
  until?: string;
};

function toLocalISO(dt: string | Date) {
  const d = typeof dt === "string" ? new Date(dt) : dt;
  const pad = (n: number) => `${n}`.padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const DEFAULT_DESCRIPTION = `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`;

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";
  const editing = aid !== "new";

  const existing = assignments.find((a: any) => a._id === aid && a.course === cid);

  const initial: Assignment = useMemo(() => {
  if (editing && existing) {
    const dueDate = existing.due || new Date();
    const availableDate = existing.available || new Date();
    const untilDate = existing.until || existing.due || new Date();
    
    return {
      _id: existing._id,
      course: existing.course,
      title: existing.title ?? "",
      description: existing.description ?? "",
      points: existing.points ?? 0,
      due: toLocalISO(dueDate),
      available: toLocalISO(availableDate),
      until: toLocalISO(untilDate),
    };
  }

  const now = new Date();
  return {
    _id: uuidv4(),
    course: String(cid),
    title: "",
    description: "",
    points: 100,
    available: toLocalISO(now),
    due: toLocalISO(now),
    until: toLocalISO(now),
  };
}, [editing, existing, cid]);

  const [form, setForm] = useState<Assignment>(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  const onChange =
    (name: keyof Assignment) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val = name === "points" ? Number(e.target.value) : e.target.value;
      setForm((f) => ({ ...f, [name]: val as any }));
    };

  const onSave = async () => {
    if (!isFaculty) return;
    
    const payload = {
      ...form,
      course: String(cid),
    };

    try {
      if (editing) {
        // Update existing assignment
        await client.updateAssignment(payload);
        dispatch(updateAssignment(payload));
      } else {
        // Create new assignment
        const newAssignment = await client.createAssignmentForCourse(String(cid), payload);
        dispatch(addAssignment(newAssignment));
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const onCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  const ro = !isFaculty;
  const disable = !isFaculty;

  return (
    <Card className="p-4 m-4 shadow-sm">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control
            value={form.title}
            onChange={onChange("title")}
            readOnly={ro}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={8}
            value={form.description}
            onChange={onChange("description")}
            readOnly={ro}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="fw-semibold">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={form.points}
              onChange={onChange("points")}
              readOnly={ro}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="fw-semibold">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="ASSIGNMENTS" disabled={disable}>
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>PROJECTS</option>
              <option>EXTRA CREDIT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="fw-semibold">
            Display Grade As
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="Percentage" disabled={disable}>
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter Grade</option>
              <option>Complete/Incomplete</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={3} className="fw-semibold">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <Card className="p-3">
              <Form.Group className="mb-3">
                <Form.Select defaultValue="Online" disabled={disable}>
                  <option>Online</option>
                  <option>On Paper</option>
                  <option>No Submission</option>
                </Form.Select>
              </Form.Group>
              <div className="fw-semibold mb-2">Online Entry Options</div>
              <Form.Check type="checkbox" label="Text Entry" disabled={disable} />
              <Form.Check type="checkbox" label="Website URL" defaultChecked disabled={disable} />
              <Form.Check type="checkbox" label="Media Recordings" disabled={disable} />
              <Form.Check type="checkbox" label="Student Annotation" disabled={disable} />
              <Form.Check type="checkbox" label="File Uploads" disabled={disable} />
            </Card>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="fw-semibold">
            Assign
          </Form.Label>
          <Col sm={9}>
            <Card className="p-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Assign to</Form.Label>
                <Form.Select defaultValue="Everyone" disabled={disable}>
                  <option>Everyone</option>
                  <option>All Students</option>
                  <option>Group 1</option>
                  <option>Group 2</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={form.due}
                  onChange={onChange("due")}
                  readOnly={ro}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Available From</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={form.available}
                      onChange={onChange("available")}
                      readOnly={ro}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={form.until ?? form.due}
                      onChange={onChange("until")}
                      readOnly={ro}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onCancel}>
            Cancel
          </Button>
          {isFaculty ? (
            <Button variant="danger" onClick={onSave}>
              Save
            </Button>
          ) : (
            <Link href={`/Courses/${cid}/Assignments`} className="btn btn-outline-secondary">
              Back
            </Link>
          )}
        </div>
      </Form>
    </Card>
  );
}