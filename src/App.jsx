import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from './components/post'

import * as ROUTES from "./constants/routes.jsx";

const Dashboard = lazy(() => import("./pages/dashboard.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const SignUp = lazy(() => import("./pages/signup.jsx"));
const Profile = lazy(() => import("./pages/profile.jsx"));
const NotFound = lazy(() => import("./pages/not-found.jsx"));


function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={"Post"} element={<Post/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
