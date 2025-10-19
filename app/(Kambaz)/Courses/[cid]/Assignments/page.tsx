"use client";

import { use } from "react";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
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
import * as db from "../../../Database"; // ✅ import the real assignments DB

// ✅ keep the GripDots component identical
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

// ✅ Use real data instead of dummyAssignments
export default function Assignments() {
  const { cid } = useParams();
  const [search, setSearch] = useState("");

  // Load all assignments from the JSON DB
  const assignments = db.assignments.filter(
    (a: any) => a.course === cid
  );

  // Filter by search term
  const filtered = assignments.filter((a: any) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    
    <div className="p-4" style={{ backgroundColor: "white" }}>
      {/* 🔍 Search and Buttons */}
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
        <Col md={6} className="text-end">
          <Button variant="light" className="border me-2 text-dark">
            <FaPlus /> Group
          </Button>
          <Button variant="danger">
            <FaPlus /> Assignment
          </Button>
        </Col>
      </Row>

      {/* 📂 Header Section */}
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
    <FaPlus className="text-secondary me-3" />
    <FaEllipsisV className="text-secondary" />
  </div>
</div>


      {/* 📋 Assignment List */}
      <ListGroup className="border border-top-0">
        {filtered.map(({ _id, title }: any) => (
          <ListGroup.Item
            key={_id}
            className="d-flex justify-content-between align-items-center ps-3 pe-2 py-3 rounded-0 bg-white"
            style={{
              borderLeft: "4px solid green",
              borderRight: "none",
              borderTop: "none",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            {/* Left Section */}
            <div className="d-flex align-items-start w-100">
              <GripDots />
              <MdOutlineAssignment className="me-3 fs-4 text-success" />
              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Assignments/${_id}`}
                  className="fw-bold text-decoration-none text-dark d-block"
                >
                  {title}
                </Link>

                {/* keep the same subtext and icons */}
                <div className="text-muted small mt-1">
                  Multiple Modules &nbsp;|&nbsp;
                  <FaClock className="me-1 text-secondary" />
                  <strong>Not available until</strong> May 6 at 12:00am &nbsp;|&nbsp;
                  <FaCalendarAlt className="me-1 text-secondary" />
                  <strong>Due</strong> May 13 at 11:59pm &nbsp;|&nbsp;
                  <FaStar className="me-1 text-secondary" />
                  100 pts
                </div>
              </div>
            </div>

            {/* Right Icons */}
            <div className="d-flex align-items-center">
              <FaCheckCircle className="text-success me-3" size={18} />
              <FaEllipsisV className="text-secondary" />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
