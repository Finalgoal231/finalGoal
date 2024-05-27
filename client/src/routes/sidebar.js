/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { MdOutlineCategory, MdOutlineAdminPanelSettings, MdOutlineArticle } from "react-icons/md";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const adminRoutes = [
  {
    path: "/",
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
        name: "Users",
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
    icon: <MdOutlineArticle className={`${iconClasses} inline`} />, // icon component
    name: "Article", // name that appear in Sidebar
    submenu: [
      {
        path: "/allArticle",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "AllArticle ",
      },
      {
        path: "/myArticle",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "MyArticle ",
      },
      {
        path: "/favouriteArticle",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "FavouriteAricle ",
      },
      {
        path: "/draft",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "Draft ",
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
        path: "/settings-password",
        icon: <KeyIcon className={submenuIconClasses} />,
        name: "Change password",
      },
      {
        path: "/settings-team", // url
        icon: <UsersIcon className={submenuIconClasses} />, // icon component
        name: "Team Members", // name that appear in Sidebar
      },
    ],
  },
];

const userRoutes = [
  {
    path: "/",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <MdOutlineArticle className={`${iconClasses} inline`} />, // icon component
    name: "Article", // name that appear in Sidebar
    submenu: [
      {
        path: "/allArticle",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "AllArticle ",
      },
      {
        path: "/myArticle",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "MyArticle ",
      },
      {
        path: "/favouriteArticle",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "FavouriteAricle ",
      },
      {
        path: "/draft",
        icon: <MdOutlineArticle className={submenuIconClasses} />,
        name: "Draft ",
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
        path: "/settings-password",
        icon: <KeyIcon className={submenuIconClasses} />,
        name: "Change password",
      },
    ],
  },
];

export { adminRoutes, userRoutes };
