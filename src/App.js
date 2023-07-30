/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Spin } from "antd";

import AppSidebar from "./layout/AppSidebar";
import AppHeader from "./layout/AppHeader";
import { useIsLoggedIn } from "./stores/useIsLoggedIn";
import { ROOT_ROUTE } from "./constants";
import { QueryClient, QueryClientProvider } from "react-query";

const Login = lazy(() => import("./pages/UnAuth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Drivers = lazy(() => import("./pages/Drivers"));
const DriverDetails = lazy(() => import("./pages/Drivers/DriverDetails"));
const DriversBookings = lazy(() => import("./pages/Bookings/DriversBookings"));
const UsersBookings = lazy(() => import("./pages/Bookings/UsersBookings"));
const Users = lazy(() => import("./pages/Users"));
const UserDetails = lazy(() => import("./pages/Users/UserDetails"));
const Error = lazy(() => import("./pages/Error"));

const getRouteObject = (path, element, children = [], props = {}) => {
  return {
    path,
    element,
    children,
    props,
  };
};

const AUTHENTICATED_ROUTES = [
  getRouteObject(ROOT_ROUTE.DASHBOARD, <Dashboard />),
  getRouteObject(ROOT_ROUTE.DRIVERS, <Drivers />),
  getRouteObject(ROOT_ROUTE.DRIVER_DETAILS, <DriverDetails />),
  getRouteObject(ROOT_ROUTE.DRIVERS_BOOKINGS_LIST, <DriversBookings />),
  getRouteObject(ROOT_ROUTE.USERS_BOOKINGS_LIST, <UsersBookings />),
  getRouteObject(ROOT_ROUTE.USERS, <Users />),
  getRouteObject(ROOT_ROUTE.USER_DETAILS, <UserDetails />),
  getRouteObject(ROOT_ROUTE.ERROR, <Error />),
];

const UNAUTHENTICATED_ROUTES = [getRouteObject(ROOT_ROUTE.LOGIN, <Login />)];

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <div className="main-layout">
        <Suspense
          fallback={
            <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
              <Spin size="large" />
            </div>
          }
        >
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
    </QueryClientProvider>
  );
}

export default App;
