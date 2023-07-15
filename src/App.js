/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Spin } from "antd";

import AppSidebar from "./layout/AppSidebar";
import AppHeader from "./layout/AppHeader";
import { useIsLoggedIn } from "./stores/useIsLoggedIn";
import { ROOT_ROUTE } from "./constants";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/UnAuth/Login"));

const getRouteObject = (path, element, children = []) => {
  return {
    path,
    element,
    children,
  };
};

const AUTHENTICATED_ROUTES = [
  getRouteObject(ROOT_ROUTE.DASHBOARD, <Dashboard />),
];

const UNAUTHENTICATED_ROUTES = [getRouteObject(ROOT_ROUTE.LOGIN, <Login />)];

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authRoutes = useRoutes(AUTHENTICATED_ROUTES);
  const unAuthRoutes = useRoutes(UNAUTHENTICATED_ROUTES);

  const { isLoggedIn } = useIsLoggedIn();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROOT_ROUTE.LOGIN);
    }
    if ((pathname === ROOT_ROUTE.LOGIN || pathname === "/") && isLoggedIn) {
      navigate(ROOT_ROUTE.DASHBOARD, { replace: true });
    }
  }, [isLoggedIn, pathname]);

  return (
    <div className="main-layout">
      <Suspense fallback={<Spin size="large" />}>
        {isLoggedIn ? (
          <>
            <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="content-area">
              <AppSidebar collapsed={collapsed} />
              <div className="routes-area">{authRoutes}</div>
            </div>
          </>
        ) : (
          unAuthRoutes
        )}
      </Suspense>
    </div>
  );
}

export default App;
