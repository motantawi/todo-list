import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import RequireAuth from "@components/RequireAuth";
import Navbar from "@components/Navbar";
import Loading from "@components/Loading";
const Home = lazy(() => import("@pages/Home"));
const Profile = lazy(() => import("@pages/User"));
const Todos = lazy(() => import("@pages/Todos"));
const EditTask = lazy(() => import("@pages/Todos/EditTask"));
const SignIn = lazy(() => import("@pages/SignIn"));
const SignUp = lazy(() => import("@pages/SignUp"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

const App = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/todos"
            element={
              <RequireAuth>
                <Todos />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-task/:taskId"
            element={
              <RequireAuth>
                <EditTask />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
