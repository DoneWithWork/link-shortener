import SideNavBar from "@/components/Sidebar";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Dashboard",
  description: "link shortening dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SideNavBar>{children}</SideNavBar>;
}
