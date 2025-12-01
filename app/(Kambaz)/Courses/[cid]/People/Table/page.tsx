/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable({ 
  users = [], 
  fetchUsers,
  onUserClick
}: { 
  users?: any[]; 
  fetchUsers: () => void;
  onUserClick?: (userId: string) => void;
}) {
  const handleUserClick = (userId: string) => {
    if (onUserClick) {
      onUserClick(userId);
    }
  };

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
                <span
                  className="text-decoration-none"
                  onClick={() => handleUserClick(user._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </span>
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
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}