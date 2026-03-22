import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {ConfigProvider} from "antd";
import ruRU from "antd/locale/ru_RU";
import { appRoutes } from './app-routes';

const App = () => {
  const router = createBrowserRouter(appRoutes);
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

        },
      },
    }}>
        <App />
    </ConfigProvider>
  </React.StrictMode>,
)
