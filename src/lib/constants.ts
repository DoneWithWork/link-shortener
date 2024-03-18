import { MdDashboardCustomize, MdHome, MdLink, MdQrCode } from "react-icons/md"

 const links = [
    {
        name: "Home",
        link: "/dashboard",
        icon: MdHome,
    },
    {
        name: "Links",
        link: "/dashboard/newlink",
        icon: MdLink,
    },
   
    {
        name: "Custom Link",
        link: "/dashboard/customlinks",
        icon: MdDashboardCustomize
    }
]
export default links