"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as db from "../../Database";
import { setCurrentUser } from "../reducer";
import type { User } from "../reducer"; 



export default function Signin() {
  const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
  
  const users = db.users as unknown as User[];

  const user = users.find(
    (u) =>
      u.username === credentials.username &&
      u.password === credentials.password
  );

  if (!user) return;

  dispatch(setCurrentUser(user));
  router.push("/Dashboard");
};



  return (
    <div id="wd-signin-screen" className="p-4">
      <h3 className="mb-3">Sign In</h3>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-3"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button
        id="wd-signin-btn"
        className="w-100 mb-3"
        onClick={signin}
        variant="primary"
      >
        Sign In
      </Button>

      <div>
        <Link id="wd-signup-link" href="/Account/Signup">
          Signup
        </Link>
      </div>
    </div>
  );
}
