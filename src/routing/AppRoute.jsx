import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "../components/layout/Layout";
import Spinner from "../components/ui/Spinner";

import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Profile = lazy(() => import("../pages/auth/Profile"));
const Notfound = lazy(() => import("../pages/NotFound/Notfound"));
const Posts = lazy(() => import("../pages/posts/Posts"));
const PostDetails = lazy(() => import("../pages/posts/PostDetails"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Spinner />}>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Spinner />}>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts/:details",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Spinner />}>
              <PostDetails />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Spinner />}>
              <Profile />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Spinner />}>
              <Register />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Spinner />}>
            <Notfound />
          </Suspense>
        ),
      },
    ],
  },
]);
