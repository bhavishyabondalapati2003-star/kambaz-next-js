import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <Link href="/Account/Signin" id="wd-signin-link">Sign in</Link><br/>
      <Link href="/Account/Signup" id="wd-signup-link">Sign up</Link><br/>
      <Link href="/Account/Profile" id="wd-profile-link">Profile</Link><br/>
    </div>
  );
}
