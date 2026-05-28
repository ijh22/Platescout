import "./App.css";

import Navigation from "../Navigation/Navigation";
import HomePage from "../../pages/HomePage";
import LoginForm from "../../forms/LoginForm";
import SignupForm from "../../forms/SignupForm";
import PageNotFound from "../../pages/PageNotFound";
import Profile from "../../pages/Profile";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
export default function App() {
    return (
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes> 
      </div>
    );
}