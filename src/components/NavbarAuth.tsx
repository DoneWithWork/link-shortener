import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function NavBarAuth() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="nav container">
      <div className=" flex gap-5 flex-row">
        {!(await isAuthenticated()) ? (
          <>
            <LoginLink className="btn btn-ghost sign-in-btn">Sign in</LoginLink>
            <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
          </>
        ) : (
          <div>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
