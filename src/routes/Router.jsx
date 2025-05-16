import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectDescription from "../pages/ProjectDescription";
import TestDetails from "../pages/admin/admin-tests/TestDetails";
const Home = React.lazy(() => import("../pages/index"));
const Explore = React.lazy(() => import("../pages/Explore"));
const EventDescription = React.lazy(() => import("../pages/EventDescription"));
const MentorContent = React.lazy(() => import("../pages/mentor/Mentor"));
const AdminContent = React.lazy(() => import("../pages/admin/Admin"));
const StudentContent = React.lazy(() => import("../pages/student/Student"));
const NotFound = React.lazy(
  () => import("../layouts/common/components/NotFound")
);

const RouterComponent = () => {
  const userSession = secureLocalStorage.getItem("userSession") || {};
  const roleId = userSession.roleId;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/projects" element={<ProjectDescription />} />
          <Route path="/explore/description" element={<EventDescription />} />
          

          <Route
            path="/explore/event-details/:eventId"
            element={<EventDescription />}
          />

          <Route
            path="/mentor/*"
            element={
              <ProtectedRoute roleId={roleId} allowedRoles={[2]}>
                <MentorContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute roleId={roleId} allowedRoles={[1]}>
                <AdminContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/*"
            element={
              <ProtectedRoute roleId={roleId} allowedRoles={[3]}>
                <StudentContent />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="dark"
        transition={Slide}
      />
    </Suspense>
  );
};

const ProtectedRoute = ({ roleId, allowedRoles, children }) => {
  if (!allowedRoles.includes(roleId)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RouterComponent;
