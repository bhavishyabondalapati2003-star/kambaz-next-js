/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "../../Courses/[cid]/People/Table/page";
import PeopleDetails from "../../Courses/[cid]/People/Details";
import * as client from "../client";
import { FormControl } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]); // Store all users
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const users = await client.findAllUsers();
      setAllUsers(users);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...allUsers];

    // Filter by role
    if (role) {
      filtered = filtered.filter(user => user.role === role);
    }

    // Filter by name
    if (name) {
      const searchLower = name.toLowerCase();
      filtered = filtered.filter(user => 
        user.firstName?.toLowerCase().includes(searchLower) ||
        user.lastName?.toLowerCase().includes(searchLower)
      );
    }

    setUsers(filtered);
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setAllUsers([...allUsers, user]);
    setUsers([...users, user]);
    setSelectedUserId(user._id);
    setShowDetails(true);
  };

  const filterUsersByRole = (role: string) => {
    setRole(role);
  };

  const filterUsersByName = (name: string) => {
    setName(name);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [role, name, allUsers]);

  return (
    <div className="p-4">
      {showDetails && (
        <PeopleDetails
          uid={selectedUserId}
          onClose={() => {
            setShowDetails(false);
            setSelectedUserId(null);
            fetchUsers();
          }}
        />
      )}

      <h3>Users</h3>
      
      <button 
        onClick={createUser} 
        className="float-end btn btn-danger wd-add-people mb-3"
      >
        <FaPlus className="me-2" />
        Users
      </button>
      
      <div className="mb-3 d-flex gap-2">
        <FormControl
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="w-25 wd-filter-by-name"
        />
        
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>

      <PeopleTable 
        users={users} 
        fetchUsers={fetchUsers}
        onUserClick={(userId) => {
          setSelectedUserId(userId);
          setShowDetails(true);
        }}
      />
    </div>
  );
}