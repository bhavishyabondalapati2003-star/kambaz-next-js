import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="p-3">
      <Link href="Signin" className="text-danger d-block mb-2">Signin</Link>
      <Link href="Signup" className="text-danger d-block mb-2">Signup</Link>
      <Link href="Profile" className="text-danger d-block">Profile</Link>
    </div>
  );
}
