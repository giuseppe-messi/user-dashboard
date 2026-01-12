import { lazy, LazyExoticComponent, ComponentType } from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

export const APP_ROUTES = {
  HOME: "/"
} as const;

export interface RouteConfig {
  path: string;
  Component: LazyExoticComponent<ComponentType>;
}

export const routes: readonly RouteConfig[] = [
  {
    path: APP_ROUTES.HOME,
    Component: Home
  },
  {
    path: "*",
    Component: NotFound
  }
] as const;
