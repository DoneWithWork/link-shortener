import SideNavBar from "@/components/Sidebar";
import "../globals.css";

export const metadata = {
  title: "Kinde Auth",
  description: "Kinde with NextJS App Router",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SideNavBar>{children}</SideNavBar>;
}
