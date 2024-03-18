import { NewLinkForm } from "@/components/NewLinkForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }
  return (
    <div className="container">
      <h1 className="text-4xl font-sans font-semibold">
        Welcome {user?.given_name}
      </h1>
      <p>Things to do</p>
    </div>
  );
}
