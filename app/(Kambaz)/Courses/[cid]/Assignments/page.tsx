/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import {
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaEllipsisV,
  FaAngleDown,
  FaClock,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { RootState } from "../../../store";
import { setAssignments, deleteAssignment } from "./reducer";
import * as client from "../../client";

function GripDots() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center me-3"
      style={{ width: "14px", height: "18px" }}
    >
      {Array.from({ length: 4 }).map((_, row) => (
        <div
          key={row}
          className="d-flex justify-content-between w-100 mb-1"
          style={{ lineHeight: 0 }}
        >
          <div
            className="rounded-circle"
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: "#222",
            }}
          ></div>
          <div
            className="rounded-circle"
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: "#222",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      await client.deleteAssignment(selectedId);
      dispatch(deleteAssignment(selectedId));
      setShowModal(false);
      setSelectedId(null);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter((a: any) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    router.push(`/Courses/${cid}/Assignments/new`);
  };

  return (
    <div className="p-4 bg-white">
      <Row className="align-items-center mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Search for Assignments"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>

        {isFaculty && (
          <Col md={6} className="text-end">
            <Button variant="light" className="border me-2 text-dark">
              <FaPlus /> Group
            </Button>
            <Button variant="danger" onClick={handleAdd}>
              <FaPlus /> Assignment
            </Button>
          </Col>
        )}
      </Row>

      <div
        className="d-flex align-items-center justify-content-between border px-3 py-2"
        style={{ backgroundColor: "#f5f6f7" }}
      >
        <div className="d-flex align-items-center fw-semibold">
          <GripDots />
          <FaAngleDown className="me-2" />
          ASSIGNMENTS
        </div>
        <div className="d-flex align-items-center">
          <span className="border rounded-pill px-3 py-1 small text-muted me-3 bg-light">
            40% of Total
          </span>
          {isFaculty && <FaPlus className="text-secondary me-3" />}
          <FaEllipsisV className="text-secondary" />
        </div>
      </div>

      <ListGroup className="border border-top-0">
        {filteredAssignments.map((a: any) => (
          <ListGroup.Item
            key={a._id}
            className="d-flex justify-content-between align-items-center ps-3 pe-2 py-3 rounded-0 bg-white"
            style={{
              borderLeft: "4px solid green",
              borderRight: "none",
              borderTop: "none",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            <div className="d-flex align-items-start w-100">
              <GripDots />
              <MdOutlineAssignment className="me-3 fs-4 text-success" />
              <div className="flex-grow-1">
                <Link
  href={`/Courses/${cid}/Assignments/${a._id}`}
  className="fw-bold text-decoration-none text-dark d-block"
>
  {a.title || "(Untitled Assignment)"}
</Link>

                <div className="text-muted small mt-1">
                  Multiple Modules &nbsp;|&nbsp;
                  <FaClock className="me-1 text-secondary" />
                  <strong>Available</strong> {new Date(a.available).toDateString()} &nbsp;|&nbsp;
                  <FaCalendarAlt className="me-1 text-secondary" />
                  <strong>Due</strong> {new Date(a.due).toDateString()} &nbsp;|&nbsp;
                  <FaStar className="me-1 text-secondary" />
                  {a.points} pts
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaCheckCircle className="text-success me-3" size={18} />
              {isFaculty && (
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteClick(a._id)}
                />
              )}
              {!isFaculty && <FaEllipsisV className="text-secondary" />}
            </div>
          </ListGroup.Item>
        ))}

        {filteredAssignments.length === 0 && (
          <div className="text-center text-muted py-5">
            No assignments found.
          </div>
        )}
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this assignment? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}