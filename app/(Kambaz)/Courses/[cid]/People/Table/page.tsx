/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as client from "../../../client";

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const enrolledUsers = await client.findUsersForCourse(cid as string);
      setUsers(enrolledUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="wd-people-table" className="p-3">
      <Table striped hover responsive>
        <thead>
          <tr className="fw-bold">
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId || user.username}</td>
              <td className="wd-section">{user.section || "N/A"}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">
                {user.lastActivity
                  ? new Date(user.lastActivity)
                      .toISOString()
                      .replace("T", " ")
                      .split(".")[0]
                  : "N/A"}
              </td>
              <td className="wd-total-activity">{user.totalActivity || "0"}</td>
            </tr>
          ))}
          
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                No enrolled users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}