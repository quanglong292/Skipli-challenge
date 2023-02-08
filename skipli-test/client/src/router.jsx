import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const RenderRoute = (path) => {
  const Component = lazy(() => import(path));
  return <Component />;
};

const router = createBrowserRouter([
  {
    path: "/*",
    element: RenderRoute("./views/NotFound"),
    errorElement: RenderRoute("./views/NotFound"),
  },
  {
    path: "/",
    element: RenderRoute("./views/Login"),
    errorElement: RenderRoute("./views/NotFound"),
  },
  {
    path: "/search",
    element: RenderRoute("./views/SearchGithub"),
    errorElement: RenderRoute("./views/NotFound"),
  },
]);

export default router;
