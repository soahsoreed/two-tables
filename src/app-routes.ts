import PageNotFound from "./page-not-found/page-not-found-";
import PageForbidden from "./page-forbidden/page-forbidden";
import RegistryPage from "./main-page/main-page";

export const appRoutes = [
  {
    path: "/",
    Component: RegistryPage,
  },
  {
    path: "forbidden",
    Component: PageForbidden,
  },
  {
    path: "*",
    Component: PageNotFound,
  },

];
