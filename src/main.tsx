import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client.ts';
import Layout from './layout/layout.tsx';
import {ConfigProvider} from "antd";
import ruRU from "antd/locale/ru_RU";
import {useAuth} from "./authStore.ts";
import LoginPage from "./auth/login-page/LoginPage.tsx";
import ErrorPage from "./page-not-found/ErrorPage.tsx";
import StatisticsPage from "./statistics/statistics.tsx";
import RegistryPage from "./registry/registry.tsx";
import HandbooksPage from "./handbooks/handbooks-page.tsx";
import DocumentTemplatesPage from "./document-templates/document-templates.tsx";
import ProdtPage from "./product__project-page/ProdtPage.tsx";
// import PageForbidden from "./page-forbidden/page-forbidden.tsx";
// import PageNotFound from "./page-not-found/page-not-found-.tsx";

const App = () => {
  // @ts-ignore
  const isAuth = useAuth((state) => state.isAuth,);
  const routes = [];
  const guestRouter = [
    {
      path: '/',
      // element: <LoginPage />,
      element: <RegistryPage />,
      // errorElement: <ErrorPage />,
    },
    {
      path: '*',
      element: <LoginPage />,
    },
  ];
  const authRouter = [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/registry/',
          element: <RegistryPage/>,
        },
        {
          path: '/handbooks/',
          element: <HandbooksPage/>,
        },
        {
          path: '/document-templates',
          element: <DocumentTemplatesPage />,
        },
        {
          path: "/product/:id",
          element: <ProdtPage />,
        },
        {
          path: "forbidden",
          element: <ErrorPage />,
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
        {
          path: '/',
          element: <RegistryPage />,
        },



      ],
    },
  ];
  routes.push(...guestRouter,);
  if (isAuth) {
    routes.shift()
    routes.push(...authRouter,);
  }
  const router = createBrowserRouter(routes,);
  return (
    <RouterProvider router={router} />
  );

};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU} theme={{
      token: {
        fontFamily: "Inter",
        colorPrimary: '#1A56DB'
      },
      components: {
        Table: {
          rowHoverBg: '#f5f5f5',
        },
        Modal: {
          titleFontSize: 18
        },
        Button: {
          contentFontSize: 12,
          fontWeight: 500
        },
        DatePicker: {

        }
      }
    }}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
