import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { ErrorBoundary } from "./ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";
import { routes } from "./routes";

const App = () => (
  <ErrorBoundary fallback={ErrorPage}>
    <Router>
      <Suspense fallback={<LoadingSpinner size="lg" fullScreen />}>
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  </ErrorBoundary>
);

export default App;
