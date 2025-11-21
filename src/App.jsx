import { Toaster } from "react-hot-toast";
import PostJob from './components/jobs/postjob/PostJob'
import BlogsDetailedPage from "../src/pages/Blogs/BlogsDetailedPage"
import Blogs from "../src/pages/Blogs/Blogs"
import FindJobsPage from './components/jobs/Find Jobs/JobsFindPage'
import SignupForm from './components/Auth/SignupForm'
import Home from "../src/pages/Home/Home"
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./components/Auth/Login"
import LogOut from "./components/Auth/LogOut"
import { useAuth } from "../src/components/Auth/AuthContext"
import About from "./pages/About/About";
import ContactUs from "./pages/Contact/ContactUs";
import ApplyForm from "../src/components/jobs/Find Jobs/ApplyForm";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EmailConfirmationPage from "./components/Auth/EmailConfirmationPage";
import BigJobLoader from "./components/common/loader/BigJobLoader";
const PrivateRoute = ({ user, loading, children }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BigJobLoader></BigJobLoader>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
};
const App = () => {
  const { user,loading } = useAuth();
  console.log(user, "--------app.jsx");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogsDetailedPage />} />
        <Route path="/jobs" element={<FindJobsPage />} />
        <Route path="/jobs/:id" element={<FindJobsPage />} />

        <Route
          path="/apply-form/:jobId"
          element={<PrivateRoute user={user} loading={loading}><ApplyForm /></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute user={user} loading={loading}><ProfilePage /></PrivateRoute>}
        />
        <Route
          path="/post-job"
          element={<PrivateRoute user={user} loading={loading}><PostJob /></PrivateRoute>}
        />
        <Route path="/logout" element={<PrivateRoute user={user} loading={loading}><LogOut /></PrivateRoute>} />

        {/* 👤 Auth Pages */}
        <Route path="/login" element={user ? <Navigate to="/jobs" /> : <Login />} />
        <Route
          path="/signup"
          element={
            user
              ? user.emailVerified
                ? <Navigate to="/jobs" />
                : <Navigate to="/confirm-email" />
              : <SignupForm />
          }
        />
        <Route path="/confirm-email" element={<EmailConfirmationPage />} />

      </Routes>
      {/* // <DashboardStats></DashboardStats> */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
