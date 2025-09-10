import type { RouteObject } from "react-router";
import App from "../App";
import CatalogPage from 'App/pages/CatalogPage';
import ReceptPage from "App/pages/ReceptPage";
import ComingSoonPage from "App/pages/ComingSoonPage";

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
     children: [
      {
        element: <CatalogPage />,
        index: true
      },
      {
        path: '/recipes',
        element: <CatalogPage />
      },
      {
        path: '/recipes/:id',
        element: <ReceptPage />
      },
      {
        path: '/categories',
        element: <ComingSoonPage />
      },
      {
        path: '/favorite',
        element: <ComingSoonPage />
      },
      {
        path: '/login',
        element: <ComingSoonPage />
      },
      {
        path: '/products',
        element: <ComingSoonPage />
      },
    ]
  }
];