/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/page";
import * as client from "../../client";

export default function People() {
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
  }, [cid]);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}