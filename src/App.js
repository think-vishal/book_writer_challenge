import './App.css';
import Main from './businesslogic/main';
import Login from './businesslogic/preloginscreens/Login';
import Signup from './businesslogic/preloginscreens/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoutes, PublicRoutes } from './businesslogic/auth/Authentication';

function App() {
  const APP_ROUTES = [
    { path: "/*", component: <ProtectedRoutes><Main /></ProtectedRoutes> },
    { path: "/login", component: <PublicRoutes><Login /></PublicRoutes> },
    { path: "/signup", component: <PublicRoutes><Signup /></PublicRoutes> },
  ]

  return (
    <>
      <Router>
        <Routes>
          {APP_ROUTES.map((route, index) => {
            return <Route path={route.path} key={"app-route-" + index} element={route.component} />
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
