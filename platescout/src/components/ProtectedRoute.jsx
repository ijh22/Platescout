import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

// Assignment 7 — ProtectedRoute.
//
// A "layout route" in React Router. Wrap one or more routes inside it like:
//
//   <Route element={<ProtectedRoute />}>
//     <Route path="/profile" element={<Profile />} />
//   </Route>
//
// Routes nested under it render through the <Outlet /> below.
// If the user isn't logged in (no token in localStorage), we redirect
// to /login BEFORE the nested route ever renders — so they never see
// a flash of protected content.
function ProtectedRoute() {
  // TODO: Decide whether the user is logged in.
  //   - Read  localStorage.getItem("token")  during render (NOT inside useEffect).
  //     useEffect runs AFTER the first render, so the protected page would flash
  //     briefly before redirecting. Reading at render time prevents that.
  //
  //   - If the token is missing, return:
  //       <Navigate to="/login" replace />
  //     - replace = no entry in browser history (back button won't bounce them
  //       between /profile and /login forever).
  //     - Optional: fire  toast.error("Please log in first.")  so the user
  //       knows why they were redirected — but only the FIRST time, not on
  //       every render. (Hint: call it next to the Navigate so it fires once
  //       per render of this component.)
  //
  //   - If the token is present, return  <Outlet />  so the matched child
  //     route (e.g. /profile) gets to render normally.
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
  

}

export default ProtectedRoute;
