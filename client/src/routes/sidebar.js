/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import {
  MdOutlineMail,
  MdOutlineMarkEmailRead,
  MdOutlineCategory,
  MdOutlineAdminPanelSettings,
  MdOutlineArticle,
  MdOutlineComputer,
  MdChatBubbleOutline
} from "react-icons/md";
import {
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineBookOpen,
} from "react-icons/hi";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <MdOutlineAdminPanelSettings className={`${iconClasses} inline`} />, // icon component
    name: "Admin", // name that appear in Sidebar
    submenu: [
      {
        path: "/admin/user",
        icon: <UserIcon className={submenuIconClasses} />,
        name: "User management",
      },
      {
        path: "/admin/category",
        icon: <MdOutlineCategory className={submenuIconClasses} />,
        name: "Category",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <HiOutlineShoppingCart className={`${iconClasses} inline`} />, // icon component
    name: "E-shop", // name that appear in Sidebar
    submenu: [
      {
        path: "/shop/seller",
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: "Add Goods",
      },
      {
        path: "/shop/goods", //url
        icon: <HiOutlineShoppingBag className={submenuIconClasses} />, // icon component
        name: "Goods", // name that appear in Sidebar
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <MdOutlineMail className={`${iconClasses} inline`} />, // icon component
    name: "E-mail", // name that appear in Sidebar
    submenu: [
      {
        path: "/email",
        icon: <MdOutlineMarkEmailRead className={submenuIconClasses} />,
        name: "Email ",
      },
    ],
  },
  {
    path: "/study",
    icon: <HiOutlineBookOpen className={iconClasses} />,
    name: "Study",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <MdOutlineComputer className={`${iconClasses} inline`} />, // icon component
    name: "Incharge", // name that appear in Sidebar
    submenu: [
      {
        path: "/aticle",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "Aticle ",
      },
      {
        path: "/chatting",
        icon: <MdChatBubbleOutline className={submenuIconClasses} />,
        name: "Chatting ",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: "Settings", // name that appear in Sidebar
    submenu: [
      {
        path: "/settings-profile", //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: "Profile", // name that appear in Sidebar
      },
      {
        path: "/settings-billing",
        icon: <WalletIcon className={submenuIconClasses} />,
        name: "Billing",
      },
      {
        path: "/settings-team", // url
        icon: <UsersIcon className={submenuIconClasses} />, // icon component
        name: "Team Members", // name that appear in Sidebar
      },
    ],
  },
];

export default routes;
