import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { ErrorBoundary, FallbackProps } from "./ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";

const Home = lazy(() => import("./pages/Home/Home"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const ErrorPageFallback = ({ onClearError }: FallbackProps) => (
  <ErrorPage onClearError={onClearError} />
);

export const APP_ROUTES = {
  home: "/"
};

function App() {
  return (
    <ErrorBoundary fallback={ErrorPageFallback}>
      <Router>
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <Routes>
            <Route>
              <Route element={<Home />} path={APP_ROUTES.home} />
              <Route element={<NotFound />} path="*" />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
