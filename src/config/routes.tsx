import { Navigate, type RouteObject } from "react-router";
import App from "../App";
import CatalogPage from '~App/pages/CatalogPage';
import ReceptPage from "~App/pages/ReceptPage";
import ComingSoonPage from "~App/pages/ComingSoonPage";
import { routes } from "~config/routes.config";
import LoginPage from "~App/pages/LoginPage";
import MealCategoriesPage from "~App/pages/MealCategoriesPage";
import FavoritePage from "~App/pages/FavoritePage";

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        element: <CatalogPage />,
        index: true
      },
      {
        path: routes.recipes.mask,
        element: <CatalogPage />
      },
      {
        path: routes.recipe.mask,
        element: <ReceptPage />
      },
      {
        path: routes.categories.mask,
        element: <MealCategoriesPage />
      },
      {
        path: routes.favorite.mask,
        element: <FavoritePage />
      },
      {
        path: routes.login.mask,
        element: <LoginPage />
      },
      {
        path: routes.registration.mask,
        element: <LoginPage />
      },
      {
        path: routes.products.mask,
        element: <ComingSoonPage />
      },
      {
        path: "*",
        element: <Navigate to={routes.main.mask} replace />,
      },
    ]
  }
];