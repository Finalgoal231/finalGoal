// All components mapping with path for internal routes

import { lazy } from "react";
import EditAccount from "../pages/Admin/UserManage/EditAccount";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Team = lazy(() => import("../pages/Settings/Team"));
const Bills = lazy(() => import("../pages/Settings/Bills"));
const ProfileSettings = lazy(() => import("../pages/Settings/ProfileSettings"));
const Cagegory = lazy(() => import("../pages/Admin/Category/categoryPage"));
const UserManage = lazy(() => import("../pages/Admin/UserManage"));
const Seller = lazy(() => import("../pages/Eshop/GoodsManage/sellerPage"));
const Custom = lazy(() => import("../pages/Eshop/Custom/customPage"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/welcome",
    component: Welcome,
  },
  {
    path: "/admin/user",
    component: UserManage,
  },
  {
    path: "/admin/user/edit",
    component: EditAccount,
  },
  {
    path: "/admin/category",
    component: Cagegory,
  },
  {
    path: "/shop/seller",
    component: Seller,
  },
  {
    path: "/shop/goods",
    component: Custom,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
