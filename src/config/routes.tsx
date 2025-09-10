import type { RouteObject } from "react-router";
import App from "../App";
import CatalogPage from 'App/pages/CatalogPage';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
     children: [
      {
        element: <CatalogPage />,
        index: true
      },
    //   {
    //     path: '/recepies/:id',
    //     element: <Recept />
    //   }
    ]
  }
];