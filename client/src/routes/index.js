// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Team = lazy(() => import("../pages/Settings/Team"));
const Bills = lazy(() => import("../pages/Settings/Bills"));
const ProfileSettings = lazy(() => import("../pages/Settings/ProfileSettings"));
const Category = lazy(() => import("../pages/Admin/Category/categoryPage"));
const UserManage = lazy(() => import("../pages/Admin/UserManage/userManagePage"));
const AllArticle = lazy(() => import("../pages/Article/AllArticle"));
const MyArticle = lazy(() => import("../pages/Article/MyArticle"));
const FavouriteArticle = lazy(() => import("../pages/Article/FavouriteArticle"));
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
        path: "/admin/category",
        component: Category,
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
        path: "/answer/article/:id",
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
        path: "/settings-billing",
        component: Bills,
    },
    {
        path: "/404",
        component: Page404,
    },
];

export default routes;
