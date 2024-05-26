// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Team = lazy(() => import("../pages/Settings/Team"));
const ProfileSettings = lazy(() => import("../pages/Settings/ProfileSettings"));
const Cagegory = lazy(() => import("../pages/Admin/Category"));
const UserManage = lazy(() => import("../pages/Admin/UserManage"));
const Profile = lazy(() => import("../features/profile"));
const ChangePassword = lazy(() => import("../pages/Settings/ChangePassword"));
const EditAccount = lazy(() => import("../pages/Admin/UserManage/EditAccount"));
const AllArticle = lazy(() => import("../pages/Article/AllArticle"));
const MyArticle = lazy(() => import("../pages/Article/MyArticle"));
const FavouriteArticle = lazy(() =>
  import("../pages/Article/FavouriteArticle")
);
const NewArticle = lazy(() => import("../pages/Article/NewArticle"));
const Draft = lazy(() => import("../pages/Article/Draft"));
const AnswerArticle = lazy(() => import("../pages/Article/AnswerArticle"));

const routes = [
  {
    path: "/",
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
    path: "/admin/profile/:id",
    component: Profile,
  },
  {
    path: "/admin/user/edit/:id",
    component: EditAccount,
  },
  {
    path: "/admin/category",
    component: Cagegory,
  },
  {
    path: "/allarticle",
    component: AllArticle,
  },
  {
    path: "/myArticle",
    component: MyArticle,
  },
  {
    path: "/favouriteArticle",
    component: FavouriteArticle,
  },
  {
    path: "/draft",
    component: Draft,
  },
  {
    path: "/newArticle/:id",
    component: NewArticle,
  },
  {
    path: "/answerArticle/:id",
    component: AnswerArticle,
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
    path: "/settings-password",
    component: ChangePassword,
  },
  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
