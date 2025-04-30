import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Suspense } from "react";

import Layout from "../components/Layout";
import CaseList from "../pages/CaseList";
import CaseDetail from "../pages/CaseDetail";
import NotFound from "../pages/NotFound";
import Loading from "../components/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/cases" replace />,
      },
      {
        path: "cases",
        element: (
          <Suspense fallback={<Loading />}>
            <CaseList />
          </Suspense>
        ),
      },
      {
        path: "cases/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <CaseDetail />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
