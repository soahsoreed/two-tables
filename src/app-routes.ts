import PageNotFound from "./page-not-found/page-not-found-";
import PageForbidden from "./page-forbidden/page-forbidden";
import RegistryPage from "./registry/registry";
import HandbooksPage from "./handbooks/handbooks-page";
import DocumentTemplatesPage from "./document-templates/document-templates";
import StatisticsPage from "./statistics/statistics";
import ProdtPage from "./product__project-page/ProdtPage.tsx";

export const authRouter = [
  {
    path: "/",
    Component: StatisticsPage,
    showHeader: true,
  },
  // {
  //   path: "/login",
  //   Component: LoginPage,
  //   showHeader: false,
  // },
  //
  {
    path: "/main",
    Component: StatisticsPage,
    showHeader: true,
  },
  {
    path: "/registry",
    Component: RegistryPage,
    showHeader: true,
  },
  {
    path: "/handbooks",
    Component: HandbooksPage,
    showHeader: true,
  },
  {
    path: "/document-templates",
    Component: DocumentTemplatesPage,
    showHeader: true,
  },
  {
    path: "/product/:id",
    Component: ProdtPage,
    showHeader: true,
  },
  {
    path: "forbidden",
    Component: PageForbidden,
    showHeader: false,
  },
  {
    path: "*",
    Component: PageNotFound,
    showHeader: false,
  },
  {
    path: "/",
    Component: StatisticsPage,
    showHeader: true,
  },

];
